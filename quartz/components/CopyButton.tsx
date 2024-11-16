import { QuartzComponent, QuartzComponentConstructor } from "./types"

const CopyButton: QuartzComponent = () => {
  return (
    <>
      <input id="copy-text-input" style={{ width: "1px", opacity: 0 }} />
      <button
        className="copy-button"
        style={{
          display: "block",
          margin: "1rem 0",
          padding: "0.5rem 1rem",
          fontSize: "1em",
          color: "var(--text)",
          background: "var(--background)",
          border: "1px solid var(--text)",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        📋 Copy Text
      </button>
    </>
  )
}

// Add the script directly to the page
CopyButton.beforeDOMLoaded = `
document.addEventListener('click', function(e) {
  if (e.target && e.target.matches('.copy-button')) {
    console.log('YES! The copy button was clicked! 🎉')

    const article = document.querySelector('article')
    const copyInput = document.getElementById('copy-text-input')

    if (article && copyInput) {
      copyInput.value = article.textContent || ''
      copyInput.select()
      document.execCommand('copy')

      e.target.textContent = '✅ Copied!'
      setTimeout(() => {
        e.target.textContent = '📋 Copy Text'
      }, 2000)
    }
  }
})
`

export default (() => CopyButton) satisfies QuartzComponentConstructor