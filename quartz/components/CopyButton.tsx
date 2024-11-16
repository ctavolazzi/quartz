import { QuartzComponent, QuartzComponentConstructor } from "./types"

const CopyButton: QuartzComponent = () => {
  return (
    <div>
      <textarea
        id="content-to-copy"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          height: 0,
          width: 0,
          opacity: 0
        }}
        readOnly
      />
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
    </div>
  )
}

CopyButton.beforeDOMLoaded = `
// When page loads, populate the textarea with content
window.addEventListener('load', function() {
  const article = document.querySelector('article')
  const textarea = document.getElementById('content-to-copy')
  if (article && textarea) {
    textarea.value = article.textContent || ''
  }
})

// Handle copy button click
document.addEventListener('click', function(e) {
  if (e.target && e.target.matches('.copy-button')) {
    const textarea = document.getElementById('content-to-copy')
    if (textarea) {
      textarea.select()
      try {
        document.execCommand('copy')
        console.log('Content copied!')
      } catch(err) {
        console.log('Copy failed:', err)
      }
    }
  }
})
`

export default (() => CopyButton) satisfies QuartzComponentConstructor