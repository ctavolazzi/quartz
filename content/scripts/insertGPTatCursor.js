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

      localStorage.setItem('openai_api_key', openaiApiKey);
      console.log("API key stored successfully");
    }

    // Get user input
    const userInput = await params.quickAddApi.inputPrompt(
      "What would you like GPT to focus on?"
    );

    if (!userInput) {
      console.log("No input provided. Exiting.");
      return;
    }

    // Get the active file and editor
    const activeFile = params.app.workspace.getActiveFile();
    const activeLeaf = params.app.workspace.activeLeaf;
    const editor = activeLeaf.view.editor;

    if (!activeFile || !editor) {
      throw new Error("No active file or editor found.");
    }

    // Get cursor position and context with safety checks
    const cursor = editor.getCursor();
    const totalLines = editor.lineCount();
    const currentContent = await params.app.vault.read(activeFile);

    // Context range definitions
    const immediateContext = 5;  // Very close to cursor
    const broaderContext = 15;   // Wider view

    // Helper function to safely get line content
    const safeGetLine = (lineNum) => {
        if (lineNum < 0 || lineNum >= totalLines) return null;
        const line = editor.getLine(lineNum);
        return line || null;
    };

    // Helper function to get a range of lines
    const getLines = (start, end) => {
        const lines = [];
        for (let i = Math.max(0, start); i < Math.min(totalLines, end); i++) {
            const line = safeGetLine(i);
            if (line !== null) lines.push(line);
        }
        return lines;
    };

    // Get different context ranges
    const contextRanges = {
        immediate: {
            before: getLines(cursor.line - immediateContext, cursor.line),
            after: getLines(cursor.line + 1, cursor.line + immediateContext + 1)
        },
        broader: {
            before: getLines(cursor.line - broaderContext, cursor.line - immediateContext),
            after: getLines(cursor.line + immediateContext + 1, cursor.line + broaderContext + 1)
        }
    };

    // Get cursor line
    const cursorLine = safeGetLine(cursor.line) || "";
    const cursorPosition = cursor.ch;

    // Create position context with more detail
    let positionContext = [];
    positionContext.push(`Cursor position: Line ${cursor.line + 1} of ${totalLines}`);
    positionContext.push(`Character position in line: ${cursorPosition + 1}`);

    if (cursor.line === 0) {
        positionContext.push("Location: START of document");
    } else if (cursor.line === totalLines - 1) {
        positionContext.push("Location: END of document");
    } else {
        const percentThrough = Math.round((cursor.line / totalLines) * 100);
        positionContext.push(`Location: ${percentThrough}% through document`);
    }

    // Format the current line with cursor position indicator
    const cursorLineFormatted =
        cursorLine.slice(0, cursorPosition) +
        "▌" + // cursor indicator
        cursorLine.slice(cursorPosition);

    const prompt = `
You are a helpful assistant. The user wants a response to their input. Provide ONLY the response, with no additional context, prefixes, or explanations.

Full File Content:
${currentContent}

Cursor Context:
${positionContext.join('\n')}

Immediate Surroundings (5 lines):
--- Lines immediately before cursor ---
${contextRanges.immediate.before.join('\n') || '[Start of document]'}

--- Current line (▌ shows cursor position) ---
${cursorLineFormatted}

--- Lines immediately after cursor ---
${contextRanges.immediate.after.join('\n') || '[End of document]'}

Broader Context (15 lines):
--- Lines further above ---
${contextRanges.broader.before.join('\n') || '[No additional context above]'}

--- Lines further below ---
${contextRanges.broader.after.join('\n') || '[No additional context below]'}

User Input: "${userInput}"

Remember: Provide ONLY the direct response, with no additional context, prefixes, or explanations.
Current timestamp: ${Date.now()}
`;

    console.log("Sending request to OpenAI...");

    // Call the OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500,
        temperature: 0.9,
        presence_penalty: 0.6,
        frequency_penalty: 0.6
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `OpenAI API error: ${response.status} ${response.statusText}\n${JSON.stringify(errorData, null, 2)}`
      );
    }

    const data = await response.json();
    // Remove any leading/trailing quotes and whitespace
    const gptThought = data.choices[0].message.content.trim().replace(/^["']|["']$/g, '');

    // Insert the AI response plus a newline at cursor position
    editor.replaceRange(gptThought + '\n', cursor);

    // Move cursor to the start of the new line
    const newPosition = {
      line: cursor.line + 1,
      ch: 0
    };
    editor.setCursor(newPosition);

    console.log("GPT response inserted at cursor position");
    new Notice("GPT response inserted at cursor position");

  } catch (error) {
    console.error("Error fetching GPT insights:", error);
    console.error("Full error:", error.stack);
    new Notice("Error fetching GPT insights. Check console for details.");
  }
};