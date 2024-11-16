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
      📋 Copy Text
    </button>
  )
}

CopyButton.beforeDOMLoaded = `
document.addEventListener('click', function(e) {
  if (e.target && e.target.matches('.copy-button')) {
    console.log('Button clicked! Attempting to copy...')

    const article = document.querySelector('article')
    if (article && article.textContent) {
      navigator.clipboard.writeText(article.textContent)
        .then(() => {
          console.log('Text copied!')
          e.target.textContent = '✅ Copied!'
          setTimeout(() => {
            e.target.textContent = '📋 Copy Text'
          }, 2000)
        })
        .catch(err => {
          console.error('Failed to copy:', err)
        })
    }
  }
})
`

export default (() => CopyButton) satisfies QuartzComponentConstructor