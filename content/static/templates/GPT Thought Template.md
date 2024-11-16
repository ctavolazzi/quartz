<%* 
const userInput = await quickAddApi.inputPrompt("What would you like GPT to focus on?");
const gptThought = await tp.user.fetchGPTThoughts(tp, userInput);
tR += gptThought;
%>
