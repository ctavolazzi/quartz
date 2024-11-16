module.exports = async function (params) {
  try {
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

      localStorage.setItem('pexels_api_key', pexelsApiKey);
      console.log("API key stored successfully");
    }

    // Get search term from user
    const searchTerm = await params.quickAddApi.inputPrompt(
      "Enter search term for image (or leave empty for random):"
    );

    // Get the active file and editor
    const activeFile = params.app.workspace.getActiveFile();
    const activeLeaf = params.app.workspace.activeLeaf;
    const editor = activeLeaf.view.editor;

    if (!activeFile || !editor) {
      throw new Error("No active file or editor found.");
    }

    const cursor = editor.getCursor();

    // Default image to use if no results found
    const defaultImage = {
      src: {
        large: "https://images.pexels.com/photos/3888585/pexels-photo-3888585.jpeg"
      },
      photographer: "Mitchell Luo",
      photographer_url: "https://www.pexels.com/@mitchel-luo",
      url: "https://www.pexels.com/photo/silhouette-of-mountains-3888585/",
      alt: "Default Landscape"
    };

    let photo;

    if (searchTerm) {
      console.log(`Searching Pexels for: ${searchTerm}`);

      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&orientation=landscape&size=large&per_page=80&page=${Math.floor(Math.random() * 15) + 1}`, {
        headers: {
          'Authorization': pexelsApiKey
        }
      });

      if (!response.ok) {
        throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`Found ${data.photos.length} photos`);

      if (data.photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.photos.length);
        photo = data.photos[randomIndex];
        console.log(`Selected photo ID: ${photo.id}`);
      } else {
        console.log("No photos found, using default image");
        photo = defaultImage;
      }
    } else {
      console.log("Fetching random curated photo");
      const response = await fetch(
        `https://api.pexels.com/v1/curated?per_page=80&page=${Math.floor(Math.random() * 100) + 1}`, {
        headers: {
          'Authorization': pexelsApiKey
        }
      });

      if (!response.ok) {
        throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.photos.length);
        photo = data.photos[randomIndex];
      } else {
        console.log("No photos found, using default image");
        photo = defaultImage;
      }
    }

    console.log("Preparing to insert image into document...");

    // Format the image markdown with attribution
    const imageMarkdown = `
![${photo.alt || 'Pexels Image'}](${photo.src.large})

<small>Photo by [${photo.photographer}](${photo.photographer_url}) on [Pexels](${photo.url})</small>

`;

    // Insert at cursor position
    editor.replaceRange(imageMarkdown, cursor);

    // Move cursor to the new line after insertion
    const newPosition = {
      line: cursor.line + imageMarkdown.split('\n').length,
      ch: 0
    };
    editor.setCursor(newPosition);

    console.log("Successfully added Pexels image at cursor position");
    new Notice(`Added ${searchTerm ? 'searched' : 'random'} Pexels image at cursor position`);

  } catch (error) {
    console.error("Error fetching Pexels image:", error);
    console.error("Full error:", error.stack);  // Added full stack trace
    new Notice("Error fetching Pexels image. Check console for details.");
  }
};