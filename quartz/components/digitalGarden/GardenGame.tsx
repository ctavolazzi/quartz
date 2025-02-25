import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "./styles/gardenGame.scss"

interface GardenGameOptions {
  gridSize?: number
  title?: string
}

const defaultOptions: GardenGameOptions = {
  gridSize: 5,
  title: "Mini-Game: Garden Growth"
}

export default ((opts?: Partial<GardenGameOptions>) => {
  const GardenGame: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const options = { ...defaultOptions, ...opts }

    return (
      <div className={`${displayClass ?? ""} garden-game-container`}>
        <h3 className="garden-game-title">{options.title}</h3>
        <div className="game-instructions">
          <p>Click on empty spots to plant seeds and watch them grow!</p>
        </div>
        <div className="game-grid" id="game-grid">
          {/* Grid will be populated by JavaScript */}
        </div>
        <div className="game-controls garden-game-controls">
          <button id="reset-game" className="garden-game-button">Reset Garden</button>
          <span id="score" className="garden-game-score">Seeds planted: 0</span>
        </div>
      </div>
    )
  }

  // Define the script to be executed after DOM is loaded
  const script = `
    // Garden Game Logic
    (function() {
      const gridSize = ${defaultOptions.gridSize ?? 5};
      const gameGrid = document.getElementById('game-grid');
      const resetButton = document.getElementById('reset-game');
      const scoreDisplay = document.getElementById('score');

      let seedsPlanted = 0;

      // Initialize game
      function initGame() {
        if (!gameGrid) return;

        // Clear existing grid
        gameGrid.innerHTML = '';
        seedsPlanted = 0;
        updateScore();

        // Create grid cells
        for (let i = 0; i < gridSize * gridSize; i++) {
          const cell = document.createElement('div');
          cell.className = 'game-cell';
          cell.dataset.state = 'empty';

          cell.addEventListener('click', () => {
            if (cell.dataset.state === 'empty') {
              plantSeed(cell);
            }
          });

          gameGrid.appendChild(cell);
        }
      }

      // Plant a seed in a cell
      function plantSeed(cell) {
        cell.dataset.state = 'seed';
        cell.innerHTML = '🌱';
        seedsPlanted++;
        updateScore();

        // Grow the seed over time
        setTimeout(() => {
          if (cell.dataset.state === 'seed') {
            cell.dataset.state = 'sprout';
            cell.innerHTML = '🌿';
          }
        }, 2000);

        setTimeout(() => {
          if (cell.dataset.state === 'sprout') {
            cell.dataset.state = 'plant';
            cell.innerHTML = '🌻';
          }
        }, 5000);
      }

      // Update the score display
      function updateScore() {
        if (scoreDisplay) {
          scoreDisplay.textContent = \`Seeds planted: \${seedsPlanted}\`;
        }
      }

      // Reset the game
      if (resetButton) {
        resetButton.addEventListener('click', initGame);
      }

      // Initialize on load
      initGame();
    })();
  `;

  GardenGame.css = style
  GardenGame.afterDOMLoaded = script

  return GardenGame
}) satisfies QuartzComponentConstructor