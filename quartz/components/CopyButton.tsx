import { QuartzComponent, QuartzComponentConstructor } from "./types"

const CopyButton: QuartzComponent = () => {
  return (
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
  )
}

CopyButton.beforeDOMLoaded = `
document.addEventListener('click', function(e) {
  if (e.target && e.target.matches('.share-button')) {
    console.log('Share button clicked!')
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      })
    } else {
      console.log('Share not supported')
    }
  }
})
`

export default (() => CopyButton) satisfies QuartzComponentConstructor