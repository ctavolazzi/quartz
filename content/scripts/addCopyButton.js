// Add a floating copy button to each page
function addCopyButton() {
  // Create the button
  const button = document.createElement('button');
  button.innerHTML = '📋 Copy for LLM';
  button.className = 'copy-llm-button';

  // Style the button
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    background: #2196F3;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 1000;
    transition: all 0.3s ease;
  `;

  // Add hover effect
  button.onmouseover = () => button.style.transform = 'scale(1.05)';
  button.onmouseout = () => button.style.transform = 'scale(1)';

  // Add click handler
  button.onclick = () => {
    // Get the main content
    const article = document.querySelector('article');
    if (!article) return;

    // Clone article to remove the button itself from copied content
    const contentClone = article.cloneNode(true);
    const copyButton = contentClone.querySelector('.copy-llm-button');
    if (copyButton) copyButton.remove();

    // Clean up the text
    const cleanText = contentClone.textContent
      ?.replace(/\n{3,}/g, '\n\n') // Remove excess newlines
      .trim() || '';

    // Copy to clipboard
    navigator.clipboard.writeText(cleanText)
      .then(() => {
        button.innerHTML = '✅ Copied!';
        setTimeout(() => {
          button.innerHTML = '📋 Copy for LLM';
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        button.innerHTML = '❌ Error!';
      });
  };

  // Add button to page
  document.body.appendChild(button);
}

// Add button when page loads
document.addEventListener('DOMContentLoaded', addCopyButton);