import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree)
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return <article class={classString}>
    <button
      id="copy-page-content"
      style={{
        display: "inline-block",
        padding: "8px 16px",
        fontSize: "1em",
        fontWeight: "bold",
        color: "var(--text)",
        background: "var(--background)",
        border: "1px solid var(--text)",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        marginBottom: "1rem"
      }}
    >
      📋 Copy Page
    </button>
    <script dangerouslySetInnerHTML={{__html: `
      document.getElementById('copy-page-content')?.addEventListener('click', () => {
        const article = document.querySelector('article')
        if (!article) return

        // Clone article to remove the button and scripts
        const contentClone = article.cloneNode(true)

        // Remove elements we don't want to copy
        contentClone.querySelectorAll('script, #copy-page-content, .copy-button, style').forEach(el => el.remove())

        // Clean up the text
        const cleanText = contentClone.textContent
          ?.replace(/\\n{3,}/g, '\\n\\n')    // Remove excess newlines
          .replace(/\\s{2,}/g, ' ')         // Remove excess spaces
          .replace(/@keyframes.*?}/gs, '')  // Remove CSS keyframes
          .replace(/\\{.*?\\}/gs, '')       // Remove CSS blocks
          .replace(/Type:/, '\\n\\nType:')  // Add spacing around Pokemon info
          .replace(/Height:/, '\\nHeight:')
          .replace(/Weight:/, '\\nWeight:')
          .trim() || ''

        // Copy to clipboard
        navigator.clipboard.writeText(cleanText)
          .then(() => {
            const btn = document.getElementById('copy-page-content')
            if (btn) {
              btn.textContent = '✅ Copied!'
              setTimeout(() => {
                btn.textContent = '📋 Copy Page'
              }, 2000)
            }
          })
          .catch(err => {
            console.error('Error copying to clipboard:', err)
          })
      })
    `}} />
    {content}
  </article>
}

export default (() => Content) satisfies QuartzComponentConstructor
