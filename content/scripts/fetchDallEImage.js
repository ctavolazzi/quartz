module.exports = async function (params) {
  try {
    console.log("Fetching DALL-E image...");

    // First, check if we have a stored key
    let openaiApiKey = localStorage.getItem('openai_api_key');

    // If no key is stored, prompt user to enter it
    if (!openaiApiKey) {
      openaiApiKey = await params.quickAddApi.inputPrompt(
        "Please enter your OpenAI API key (will be stored for future use):"
      );

      if (!openaiApiKey) {
        throw new Error("No API key provided");
      }

      // Store the key for future use
      localStorage.setItem('openai_api_key', openaiApiKey);
      console.log("API key stored successfully");
    }

    // Get the prompt from user and parse flags
    const userInput = await params.quickAddApi.inputPrompt(
      "Enter your DALL-E prompt (-w for wide, -t for tall):"
    );

    if (!userInput) {
      throw new Error("No prompt provided");
    }

    // Parse flags and prompt
    let size = "1024x1024"; // default square
    const flagMatch = userInput.match(/\s-[wt]\b|\s-(wide|tall)\b/);
    const prompt = userInput.replace(/\s-[wt]\b|\s-(wide|tall)\b/, '').trim();

    if (flagMatch) {
      const flag = flagMatch[0].trim();
      switch (flag) {
        case '-w':
        case '-wide':
          size = "1792x1024";
          break;
        case '-t':
        case '-tall':
          size = "1024x1792";
          break;
      }
    }

    console.log(`Generating DALL-E image for prompt: "${prompt}" with size: ${size}`);

    // Get the active file and editor
    const activeFile = params.app.workspace.getActiveFile();
    const activeLeaf = params.app.workspace.activeLeaf;
    const editor = activeLeaf.view.editor;
    const cursor = editor.getCursor();

    if (!activeFile || !editor) {
      throw new Error("No active file or editor found");
    }

    // Call DALL-E API
    console.log("Sending request to DALL-E API...");
    const requestBody = {
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: size,
      quality: "standard",
      response_format: "url",
    };
    console.log("Request body:", requestBody);

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Response status:", response.status);
    const responseData = await response.json();
    console.log("Response data:", responseData);

    if (!response.ok) {
      throw new Error(
        `DALL-E API error: ${response.status}\n${
          responseData.error?.message || JSON.stringify(responseData)
        }`
      );
    }

    if (!responseData.data || !responseData.data[0].url) {
      throw new Error("No image URL returned from DALL-E");
    }

    const imageUrl = responseData.data[0].url;

    // Format the image markdown with attribution
    const imageMarkdown = `
![DALL-E: ${prompt}](${imageUrl})

<small>Generated by DALL-E • Prompt: "${prompt}"</small>

`;

    // Insert at cursor position
    editor.replaceRange(imageMarkdown, cursor);

    // Move cursor to the new line after insertion
    const newPosition = {
      line: cursor.line + imageMarkdown.split('\n').length,
      ch: 0
    };
    editor.setCursor(newPosition);

    console.log("Successfully added DALL-E image at cursor position");

  } catch (error) {
    console.error("Error fetching DALL-E image:", error);
    console.error("Full error:", error.stack);

    // Create a notice using Obsidian's Notice API
    new params.app.Notice(`Error: ${error.message}`);
  }
};