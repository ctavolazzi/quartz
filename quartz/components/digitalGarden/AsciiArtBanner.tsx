import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "./styles/asciiArtBanner.scss"

interface AsciiArtBannerOptions {
  text?: string
  animationSpeed?: number
}

const defaultOptions: AsciiArtBannerOptions = {
  text: "Digital Garden",
  animationSpeed: 8,
}

export default ((opts?: Partial<AsciiArtBannerOptions>) => {
  const AsciiArtBanner: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const options = { ...defaultOptions, ...opts }

    return (
      <div className={`${displayClass ?? ""} ascii-art-banner`}>
        <pre className="ascii-art" id="ascii-animation">
{`     _    _      _                            _
    | |  | |    | |                          | |
    | |  | | ___| | ___ ___  _ __ ___   ___  | |
    | |/\\| |/ _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ | |
    \\  /\\  /  __/ | (_| (_) | | | | | |  __/ |_|
     \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___| (_)

      ____  _       _ _        _    _____              _
     |  _ \\(_)     (_) |      | |  / ____|            | |
     | |_) |_  __ _ _| |_ __ _| | | |  __  __ _ _ __ __| | ___ _ __
     |  _ <| |/ _\` | | __/ _\` | | | | |_ |/ _\` | '__/ _\` |/ _ \\ '_ \\
     | |_) | | (_| | | || (_| | | | |__| | (_| | | | (_| |  __/ | | |
     |____/|_|\\__, |_|\\__\\__,_|_|  \\_____|\\___|_|  \\__,_|\\___|_| |_|
               __/ |
              |___/`}
        </pre>
        <div className="progress-container">
          <div className="progress-bar" id="knowledge-progress"></div>
        </div>
      </div>
    )
  }

  // Define the script to be executed after DOM is loaded as a string
  const script = `
    // Animate the progress bar
    const progressBar = document.getElementById("knowledge-progress");
    if (progressBar) {
      setTimeout(() => {
        progressBar.style.width = "85%";
      }, 300);
    }
  `

  AsciiArtBanner.css = style
  AsciiArtBanner.afterDOMLoaded = script

  return AsciiArtBanner
}) satisfies QuartzComponentConstructor