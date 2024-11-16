import { QuartzComponent, QuartzComponentConstructor } from "./types"

const CopyButton: QuartzComponent = () => {
  return (
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
      📤 Share
    </button>
  )
}

CopyButton.beforeDOMLoaded = `
document.addEventListener('click', async function(e) {
  if (e.target && e.target.matches('.copy-button')) {
    console.log('Share button clicked!')

    const article = document.querySelector('article')
    if (article && navigator.share) {
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
})
`

export default (() => CopyButton) satisfies QuartzComponentConstructor