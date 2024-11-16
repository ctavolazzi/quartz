import { QuartzComponent, QuartzComponentConstructor } from "./types"

const CopyButton: QuartzComponent = () => {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        className="share-button"
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
        📤 Share
      </button>
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
        📋 Copy
      </button>
    </div>
  )
}

CopyButton.beforeDOMLoaded = `
document.addEventListener('click', async function(e) {
  const article = document.querySelector('article')
  if (!article) return

  // Handle Share button
  if (e.target && e.target.matches('.share-button')) {
    console.log('Share button clicked!')
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: article.textContent,
          url: window.location.href
        })
        console.log('Shared successfully!')
      } catch(err) {
        console.log('Share failed:', err)
      }
    } else {
      console.log('Web Share not supported')
    }
  }

  // Handle Copy button
  if (e.target && e.target.matches('.copy-button')) {
    console.log('Copy button clicked!')
    try {
      await navigator.clipboard.writeText(article.textContent || '')
      e.target.textContent = '✅ Copied!'
      setTimeout(() => {
        e.target.textContent = '📋 Copy'
      }, 2000)
    } catch(err) {
      console.log('Copy failed:', err)
    }
  }
})
`

export default (() => CopyButton) satisfies QuartzComponentConstructor