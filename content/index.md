---
title: Dashboard 🕹️
tags:
  - index
  - dashboard
  - api-demo
---
Welcome to your Knowledge Garden! This page dynamically loads data using inline JavaScript and serves as a resource for exploration by humans and, soon, AI agents.

<a id="daily-note-link" href="#" style="
  display: inline-block;
  padding: 12px 24px;
  font-size: 1.2em;
  font-weight: normal;
  text-align: center;
  color: #ffffff;  /* White text */
  background: none;  /* Transparent background */
  border: 1px solid #ffffff;  /* Thin white border */
  border-radius: 4px;
  text-decoration: none;
  margin-top: 20px;
  margin-bottom: 30px;
">
  Daily Note 🗓
</a>

## Random Pokémon 🎲
<div id="pokemon-info" style="margin-top: 20px;">Loading Pokémon...</div>
<button id="refresh-button" style="
  display: inline-block;
  padding: 8px 16px;
  font-size: 1em;
  font-weight: bold;
  color: #ffffff;
  background: none;
  border: 1px solid #ffffff;
  border-radius: 4px;
  margin-top: 15px;
  cursor: pointer;
">
  Get Another Pokémon
</button>

<script>
  // Load and display Pokémon data without using innerHTML
  async function loadPokemon() {
    const pokemonInfo = document.getElementById('pokemon-info');
    try {
      const randomId = Math.floor(Math.random() * 150) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();

      // Create elements to display Pokémon info
      const nameElement = document.createElement('h2');
      nameElement.textContent = data.name.toUpperCase();

      const imgElement = document.createElement('img');
      imgElement.src = data.sprites.front_default;
      imgElement.alt = data.name;
      imgElement.width = 150;
      imgElement.height = 150;

      const typeElement = document.createElement('p');
      typeElement.textContent = `Type: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;

      const heightElement = document.createElement('p');
      heightElement.textContent = `Height: ${data.height / 10} m`;  // Converted to meters

      const weightElement = document.createElement('p');
      weightElement.textContent = `Weight: ${data.weight / 10} kg`;  // Converted to kilograms

      // Clear any existing content and append new elements
      pokemonInfo.innerHTML = '';  // Clear loading text
      pokemonInfo.appendChild(nameElement);
      pokemonInfo.appendChild(imgElement);
      pokemonInfo.appendChild(typeElement);
      pokemonInfo.appendChild(heightElement);
      pokemonInfo.appendChild(weightElement);

    } catch (error) {
      pokemonInfo.textContent = 'Failed to load Pokémon. Please try again later.';
      console.error('Error fetching Pokémon data:', error);
    }
  }

  // Initialize the first Pokémon on page load
  loadPokemon();

  // Add event listener to refresh button
  document.getElementById('refresh-button').addEventListener('click', loadPokemon);

  // Set Daily Note link to today's date
  (function setDailyNoteLink() {
    const link = document.getElementById('daily-note-link');
    if (link) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      link.href = `/Daily-Notes/${yyyy}-${mm}-${dd}`;
      link.innerText = `Daily Note 🗓`;
    }
  })();
</script>

---

<div align="center">
*This dashboard is a simple demonstration of dynamic data loading and display.*
</div>
