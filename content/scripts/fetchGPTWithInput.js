module.exports = async function (params) {
  try {
    console.log("Fetching GPT insights with user input...");

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

    // Now prompt for the GPT input
    const userInput = await params.quickAddApi.inputPrompt(
      "What would you like GPT to focus on?"
    );

    if (!userInput) {
      console.log("No input provided. Exiting.");
      return;
    }

    console.log("User Input:", userInput);

    // OpenAI API Key and Model Configuration
    const model = "gpt-4o-mini";

    // Paths to Additional Files
    const dailyNoteTemplatePath = "static/templates/Daily Note Template.md";
    const aboutMePath = "static/about_me.txt";

    // Function to safely read file content
    async function getFileContent(path) {
      const file = params.app.vault.getAbstractFileByPath(path);
      if (!file) {
        throw new Error(`File not found: ${path}`);
      }
      return await params.app.vault.read(file);
    }

    // Read file content for context
    const dailyNoteTemplateContent = await getFileContent(
      dailyNoteTemplatePath
    );
    const aboutMeContent = await getFileContent(aboutMePath);

    // Get the active file and its full path
    const activeFile = params.app.workspace.getActiveFile();
    if (!activeFile) {
      throw new Error("No active file found.");
    }

    // Log all path information
    console.log("Active File Object:", activeFile);
    console.log("File Path:", activeFile.path);
    console.log("File Name:", activeFile.name);
    console.log("Base Path:", params.app.vault.adapter.basePath);
    console.log("Full Path:", `${params.app.vault.adapter.basePath}/${activeFile.path}`);

    const currentFileContent = await params.app.vault.read(activeFile);

    // Get the vault path and combine with file path
    const vaultPath = params.app.vault.adapter.basePath;
    const fullFilePath = `${vaultPath}/${activeFile.path}`;

    console.log("Complete File Path:", fullFilePath);

    const prompt = `
You are an assistant helping with brief responses. Format your response using these Markdown rules:

1. Use [[double brackets]] for key concepts and proper names
2. Use **bold** sparingly for emphasis
3. Keep responses concise and direct
4. Use external links when relevant: [title](url)

Current File: ${fullFilePath}
Content:
${currentFileContent}

User Input: "${userInput}"

Provide a brief, focused response using the formatting guidelines above.
`;

    console.log("GPT Prompt:", prompt);

    // Call the OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenAI API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const gptThought = data.choices[0].message.content.trim();

    // Token counts
    const promptTokens = data.usage.prompt_tokens;
    const completionTokens = data.usage.completion_tokens;
    const totalTokens = data.usage.total_tokens;

    console.log(
      `Token Usage: Prompt - ${promptTokens}, Completion - ${completionTokens}, Total - ${totalTokens}`
    );

    // Enhanced formatting for the response
    const formattedThought = `
> [!ai]+ \`${new Date().toLocaleString()}\`
> 💭 **Prompt**: "${userInput}"

${gptThought}

\`\`\`stats
📊 Token Usage:
• Prompt: ${promptTokens}
• Completion: ${completionTokens}
• Total: ${totalTokens}
\`\`\`
---
`;

    console.log("GPT Insight fetched successfully:", formattedThought);

    // Append the formatted thought
    const sectionHeading = "## 🤖 GPT Thoughts";
    const currentContent = await params.app.vault.read(activeFile);
    const updatedContent = currentContent.includes(sectionHeading)
      ? currentContent.replace(
          sectionHeading,
          `${sectionHeading}\n\n${formattedThought}`
        )
      : `${currentContent}\n\n${sectionHeading}\n\n${formattedThought}`;

    await params.app.vault.modify(activeFile, updatedContent);

    console.log("GPT Thought successfully added under the specified section.");
  } catch (error) {
    console.error("Error fetching GPT insights:", error);
    new Notice("Error fetching GPT insights. Check console for details.");
  }
};
