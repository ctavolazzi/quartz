import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "./styles/highlights.scss"

interface HighlightsOptions {
  title?: string
  defaultItems?: string[]
}

const defaultOptions: HighlightsOptions = {
  title: "Today's Highlights",
  defaultItems: [
    "Complete the project proposal",
    "Research new productivity methods",
    "Add new notes to digital garden"
  ]
}

export default ((opts?: Partial<HighlightsOptions>) => {
  const Highlights: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const options = { ...defaultOptions, ...opts }

    return (
      <div className={`${displayClass ?? ""} highlights-section`}>
        <h3 className="highlights-title">{options.title}</h3>
        <div className="highlight-items" id="highlight-items">
          {/* Items will be populated by JavaScript based on the default options or localstorage */}
        </div>
        <button id="add-highlight" className="highlight-button">+ Add Highlight</button>
      </div>
    )
  }

  // Define the script to be executed after DOM is loaded
  const script = `
    // Highlights Component Logic
    (function() {
      // Get DOM elements
      const highlightItems = document.getElementById('highlight-items');
      const addButton = document.getElementById('add-highlight');

      // Get default items
      const defaultItems = ${JSON.stringify(defaultOptions.defaultItems ?? [])};

      // Load items from local storage or use defaults
      function loadItems() {
        if (!highlightItems) return;

        // Try to get from localStorage
        let items = [];
        try {
          const savedItems = localStorage.getItem('digitalGardenHighlights');
          items = savedItems ? JSON.parse(savedItems) : defaultItems;
        } catch (e) {
          console.warn('Error loading highlights from localStorage:', e);
          items = defaultItems;
        }

        // Clear existing items
        highlightItems.innerHTML = '';

        // Add each item
        items.forEach((text, index) => {
          addHighlightToDOM(text, index);
        });

        // Save items
        saveItems();
      }

      // Add a new highlight item to the DOM
      function addHighlightToDOM(text, index) {
        if (!highlightItems) return;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'highlight-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = \`highlight\${index}\`;
        checkbox.addEventListener('change', saveItems);

        const label = document.createElement('label');
        label.htmlFor = \`highlight\${index}\`;
        label.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-highlight';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', () => {
          itemDiv.remove();
          saveItems();
        });

        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(label);
        itemDiv.appendChild(deleteBtn);

        highlightItems.appendChild(itemDiv);
      }

      // Add a new highlight when the add button is clicked
      function addNewHighlight() {
        const text = prompt('Enter a new highlight:');
        if (text && text.trim() !== '') {
          const items = getItemsFromDOM();
          addHighlightToDOM(text, items.length);
          saveItems();
        }
      }

      // Get the current items from the DOM
      function getItemsFromDOM() {
        if (!highlightItems) return [];

        const items = [];
        const labels = highlightItems.querySelectorAll('label');
        labels.forEach(label => {
          items.push(label.textContent);
        });

        return items;
      }

      // Save items to localStorage
      function saveItems() {
        const items = getItemsFromDOM();
        try {
          localStorage.setItem('digitalGardenHighlights', JSON.stringify(items));
        } catch (e) {
          console.warn('Error saving highlights to localStorage:', e);
        }
      }

      // Add event listener to the add button
      if (addButton) {
        addButton.addEventListener('click', addNewHighlight);
      }

      // Initialize
      loadItems();
    })();
  `;

  Highlights.css = style
  Highlights.afterDOMLoaded = script

  return Highlights
}) satisfies QuartzComponentConstructor