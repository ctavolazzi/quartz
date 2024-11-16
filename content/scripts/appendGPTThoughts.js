// appendGPTThoughts.js

module.exports = async function (tp) {
  try {
    console.log('Fetching GPT insights for the current note...');

    // --------------------- Configuration ---------------------

    // OpenAI API Key - Replace 'YOUR_OPENAI_API_KEY' with your actual key
    const openaiApiKey = 'OPENAI_API_KEY'; // <-- Replace with your OpenAI API key

    // Section where GPT's thoughts will be appended
    const gptSectionHeader = '## 🤖 GPT Thoughts';

    // OpenAI Model
    const model = 'gpt-3.5-turbo'; // Use 'gpt-3.5-turbo' or 'gpt-4' if available

    // ----------------------------------------------------------

    // Ensure API key is provided
    if (openaiApiKey === 'YOUR_OPENAI_API_KEY' || !openaiApiKey) {
      new Notice('Please set your OpenAI API key in appendGPTThoughts.js');
      return '🔒 OpenAI API key not set.';
    }

    // Get the active file
    const currentFile = app.workspace.getActiveFile();

    if (!currentFile) {
      new Notice('No active file found.');
      return '📁 No active file to append GPT thoughts.';
    }

    // Read the content of the current note
    let content = await app.vault.read(currentFile);

    // Define the prompt for GPT
    const prompt = `
You are an assistant helping the user by providing insightful thoughts about their note. Pay special attention to the section titled "${gptSectionHeader}" and append your thoughts there with a timestamp.

Here is the content of the note:

${content}

Provide one thoughtful insight related to the content above, focusing on areas that can help improve productivity or personal growth.
    `;

    // Call OpenAI API using fetch
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: `You are an assistant helping the user by providing insightful thoughts about their note. Pay special attention to the section titled "${gptSectionHeader}" and append your thoughts there with a timestamp.`,
          },
          {
            role: 'user',
            content: `Here is the content of the note:\n\n${content}\n\nProvide one thoughtful insight related to the content above, focusing on areas that can help improve productivity or personal growth.`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const gptThought = data.choices[0].message.content.trim();

    // Prepare the formatted response with timestamp
    const timestamp = new Date().toLocaleString();
    const formattedThought = `\n**[${timestamp}]** ${gptThought}\n`;

    console.log('GPT insight fetched successfully:', formattedThought);

    // Return the formatted GPT thought to be appended by the template
    return formattedThought;
  } catch (error) {
    console.error('Error fetching GPT insights:', error);
    new Notice('🤖 Could not fetch GPT insights at this time.');
    return '🤖 Could not fetch GPT insights at this time.';
  }
};
