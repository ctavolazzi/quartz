// // fetchGPTThoughts.js

// module.exports = async function (tp, userInput) {
//   try {
//     console.log('Fetching GPT insights with user input...');

//     // Replace with your actual OpenAI API key
//     const openaiApiKey = 'OPENAI_API_KEY';
//     const model = 'gpt-4o-mini';

//     // Paths to files (if needed)
//     const dailyNoteTemplatePath = 'static/templates/Daily Note Template.md';
//     const aboutMePath = 'static/about_me.txt';

//     // Get yesterday's note path using Obsidian's file system
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     const yesterdayFormatted = yesterday.toISOString().split('T')[0];

//     // Build paths - remove the extra 'content/' prefix since it's already in the base path
//     const relativePath = `Daily-Notes/${yesterdayFormatted}.md`;
//     const vaultPath = app.vault.adapter.basePath;
//     const fullPath = `${vaultPath}/Daily-Notes/${yesterdayFormatted}.md`;

//     console.log('Path Debug:');
//     console.log('- Yesterday Date:', yesterdayFormatted);
//     console.log('- Relative Path:', relativePath);
//     console.log('- Vault Base Path:', vaultPath);
//     console.log('- Full Path:', fullPath);

//     // Try to get the file and log the result
//     const yesterdayFile = app.vault.getAbstractFileByPath(relativePath);
//     console.log('- File Found:', yesterdayFile ? 'Yes' : 'No');

//     // Function to safely read file content
//     async function getFileContent(path) {
//       const file = app.vault.getAbstractFileByPath(path);
//       if (!file) {
//         throw new Error(`File not found: ${path}`);
//       }
//       return await app.vault.read(file);
//     }

//     // Read file content (optional for context)
//     const dailyNoteTemplateContent = await getFileContent(dailyNoteTemplatePath);
//     const aboutMeContent = await getFileContent(aboutMePath);

//     // Get yesterday's note content
//     let yesterdayContent = '';
//
//     if (yesterdayFile) {
//       try {
//         yesterdayContent = await app.vault.read(yesterdayFile);
//         console.log('- Yesterday\'s note content loaded successfully');
//       } catch (error) {
//         console.log('- Error reading yesterday\'s note:', error);
//         yesterdayContent = "No previous day's note available.";
//       }
//     } else {
//       console.log('- No yesterday note found');
//       yesterdayContent = "No previous day's note available.";
//     }

//     // Update the prompt to include yesterday's content
//     const prompt = `
// You are an assistant helping the user by providing insightful thoughts about their note.
// Use the following information to provide customized insights:

// 1. Daily Note Template:
// ${dailyNoteTemplateContent}

// 2. About Me:
// ${aboutMeContent}

// 3. Yesterday's Note:
// ${yesterdayContent}

// 4. User Input:
// ${userInput}

// Provide one thoughtful insight related to personal productivity, creativity, or growth, taking into account any patterns or continuity from yesterday's note.
//     `;

//     // console.log('GPT Prompt:', prompt);

//     // Call the OpenAI API
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${openaiApiKey}`,
//       },
//       body: JSON.stringify({
//         model: model,
//         messages: [{ role: 'user', content: prompt }],
//         max_tokens: 500,
//         temperature: 0.7,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     const gptThought = data.choices[0].message.content.trim();

//     // Token counts
//     const promptTokens = data.usage.prompt_tokens;
//     const completionTokens = data.usage.completion_tokens;
//     const totalTokens = data.usage.total_tokens;

//     console.log(
//       `Token Usage: Prompt - ${promptTokens}, Completion - ${completionTokens}, Total - ${totalTokens}`
//     );

//     // Enhanced formatting for the response
//     const formattedThought = `
// > [!ai]+ \`${new Date().toLocaleString()}\`
// > 💭 **Prompt**: "${userInput}"

// ${gptThought}

// \`\`\`stats
// 📊 Token Usage:
// • Prompt: ${promptTokens}
// • Completion: ${completionTokens}
// • Total: ${totalTokens}
// \`\`\`
// ---
// `;

//     console.log("GPT insight fetched successfully:", formattedThought);
//     return formattedThought;  // Just return the formatted thought instead of trying to modify the file

//   } catch (error) {
//     console.error("Error fetching GPT insights:", error);
//     return '🤖 Could not fetch GPT insights at this time.';
//   }
// };

module.exports = async function (tp, userInput) {
  try {
    console.log('Fetching GPT insights with user input:', userInput);

    // First, check if we have a stored key
    let openaiApiKey = localStorage.getItem('openai_api_key');

    // If no key is stored, prompt user to enter it
    if (!openaiApiKey) {
      openaiApiKey = await tp.system.prompt(
        "Please enter your OpenAI API key (will be stored for future use):"
      );

      if (!openaiApiKey) {
        throw new Error("No API key provided");
      }

      // Store the key for future use
      localStorage.setItem('openai_api_key', openaiApiKey);
      console.log("API key stored successfully");
    }

    // Paths to files (if needed)
    const dailyNoteTemplatePath = 'static/templates/Daily Note Template.md';
    const aboutMePath = 'static/about_me.txt';

    // Get yesterday's note path using Obsidian's file system
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayFormatted = yesterday.toISOString().split('T')[0];

    // Build paths - remove the extra 'content/' prefix since it's already in the base path
    const relativePath = `Daily-Notes/${yesterdayFormatted}.md`;
    const vaultPath = app.vault.adapter.basePath;
    const fullPath = `${vaultPath}/Daily-Notes/${yesterdayFormatted}.md`;

    console.log('Path Debug:');
    console.log('- Yesterday Date:', yesterdayFormatted);
    console.log('- Relative Path:', relativePath);
    console.log('- Vault Base Path:', vaultPath);
    console.log('- Full Path:', fullPath);

    // Try to get the file and log the result
    const yesterdayFile = app.vault.getAbstractFileByPath(relativePath);
    console.log('- File Found:', yesterdayFile ? 'Yes' : 'No');

    // Function to safely read file content
    async function getFileContent(path) {
      const file = app.vault.getAbstractFileByPath(path);
      if (!file) {
        throw new Error(`File not found: ${path}`);
      }
      return await app.vault.read(file);
    }

    // Read file content (optional for context)
    const dailyNoteTemplateContent = await getFileContent(dailyNoteTemplatePath);
    const aboutMeContent = await getFileContent(aboutMePath);

    // Get yesterday's note content
    let yesterdayContent = '';

    if (yesterdayFile) {
      try {
        yesterdayContent = await app.vault.read(yesterdayFile);
        console.log('- Yesterday\'s note content loaded successfully');
      } catch (error) {
        console.log('- Error reading yesterday\'s note:', error);
        yesterdayContent = "No previous day's note available.";
      }
    } else {
      console.log('- No yesterday note found');
      yesterdayContent = "No previous day's note available.";
    }

    // Update the prompt to include yesterday's content
    const prompt = `
You are an assistant helping the user by providing insightful thoughts about their note.
Use the following information to provide customized insights:

1. Daily Note Template:
${dailyNoteTemplateContent}

2. About Me:
${aboutMeContent}

3. Yesterday's Note:
${yesterdayContent}

4. User Input:
${userInput}

Provide one thoughtful insight related to personal productivity, creativity, or growth, taking into account any patterns or continuity from yesterday's note.
    `;

    // console.log('GPT Prompt:', prompt);

    // Call the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
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
> 💭 **Prompt**: "${userInput || 'No prompt provided'}"

${gptThought}

\`\`\`stats
📊 Token Usage:
• Prompt: ${promptTokens}
• Completion: ${completionTokens}
• Total: ${totalTokens}
\`\`\`
---
`;

    console.log("GPT insight fetched successfully:", formattedThought);
    return formattedThought;  // Just return the formatted thought instead of trying to modify the file

  } catch (error) {
    console.error("Error fetching GPT insights:", error);
    return '🤖 Could not fetch GPT insights at this time.';
  }
};

