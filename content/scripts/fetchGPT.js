module.exports = async function (tp) {
  try {
    console.log('Fetching GPT insights for the current note...');
    const openaiApiKey = 'OPENAI_API_KEY'; // Replace with your OpenAI API key
    const model = 'gpt-4o-mini';

    // Define the prompt for GPT
    const prompt = `
You are an assistant helping the user by providing insightful thoughts about their note. Provide one thoughtful insight related to personal productivity, creativity, or growth.
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
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const gptThought = data.choices[0].message.content.trim();

    // Format GPT thought into Markdown
    const formattedThought = `
## 🤖 **GPT Thought**

**[${new Date().toLocaleString()}]** ${gptThought}
    `;

    console.log('GPT insight fetched successfully:', formattedThought);
    return formattedThought;
  } catch (error) {
    console.error('Error fetching GPT insights:', error);
    return '🤖 Could not fetch GPT insights at this time.';
  }
};
