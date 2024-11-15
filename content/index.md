---
title: Dashboard 🕹️
tags:
  - index
  - dashboard
  - api-demo
---
Welcome to the Dashboard! This is a simple demonstration of loading and rendering data dynamically on page load.

## Pokémon of the Day 🎲
<div id="pokemon-info">Loading Pokémon...</div>

<script>
  // Load and display Pokémon data
  (async function loadPokemon() {
    const pokemonInfo = document.getElementById('pokemon-info');
    try {
      const randomId = Math.floor(Math.random() * 150) + 1; // Random Pokémon ID from 1 to 150
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();

      // Render the Pokémon details once data is fully loaded
      pokemonInfo.innerHTML = `
        <strong>${data.name.toUpperCase()}</strong><br>
        <img src="${data.sprites.front_default}" alt="${data.name}" /><br>
        Type: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}
      `;
    } catch (error) {
      pokemonInfo.innerText = 'Failed to load Pokémon. Please try again later.';
      console.error('Error fetching Pokémon data:', error);
    }
  })();
</script>

---

<div align="center">
*This page is a simple API demo with synchronous data loading.*
</div>
