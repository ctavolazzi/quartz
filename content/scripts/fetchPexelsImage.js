module.exports = async function (params) {
  try {
    console.log("Fetching random Pexels image...");

    // First, check if we have a stored key
    let pexelsApiKey = localStorage.getItem('pexels_api_key');

    // If no key is stored, prompt user to enter it
    if (!pexelsApiKey) {
      pexelsApiKey = await params.quickAddApi.inputPrompt(
        "Please enter your Pexels API key (will be stored for future use):"
      );

      if (!pexelsApiKey) {
        throw new Error("No API key provided");
      }

      // Store the key for future use
      localStorage.setItem('pexels_api_key', pexelsApiKey);
      console.log("API key stored successfully");
    }

    // Get the active file
    const activeFile = params.app.workspace.getActiveFile();
    if (!activeFile) {
      throw new Error("No active file");
    }

    // Get random page number and fetch multiple photos
    const randomPage = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=80&page=${randomPage}`, {
      headers: {
        'Authorization': pexelsApiKey
      }
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Get a random photo from the results
    const randomIndex = Math.floor(Math.random() * data.photos.length);
    const photo = data.photos[randomIndex];

    if (!photo) {
      throw new Error("No photo returned from Pexels API");
    }

    // Format the image markdown with attribution
    const imageMarkdown = `
![${photo.alt || 'Pexels Image'}](${photo.src.large})

<small>Photo by [${photo.photographer}](${photo.photographer_url}) on [Pexels](${photo.url})</small>

---
`;

    // Get current content and add image at the top
    const currentContent = await params.app.vault.read(activeFile);
    const updatedContent = `${imageMarkdown}${currentContent}`;

    // Update the file
    await params.app.vault.modify(activeFile, updatedContent);

    console.log("Successfully added Pexels image to the top of the file");

    // Show success message
    new Notice("Added Pexels image to the top of the file");

  } catch (error) {
    console.error("Error fetching Pexels image:", error);
    new Notice("Error fetching Pexels image. Check console for details.");
  }
};