---
title: Dashboard 🕹️
tags:
  - index
  - dashboard
  - api-demo
---
Welcome to your Dashboard! This page dynamically loads data using inline JavaScript.

## Pokémon of the Day 🎲
<div id="pokemon-info">Loading Pokémon...</div>

## Daily Note 📅
<a id="daily-note-link" href="#">Today’s Daily Note</a>

<script>
  // Static-friendly JavaScript for Pokémon data
  (async function loadPokemon() {
    const pokemonInfo = document.getElementById('pokemon-info');
    try {
      // Fetch a random Pokémon from PokéAPI
      const randomId = Math.floor(Math.random() * 150) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();

      // Render Pokémon information statically after fetch
      pokemonInfo.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}" width="150" height="150" />
        <p><strong>Type:</strong> ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
      `;
    } catch (error) {
      pokemonInfo.innerHTML = '<p>Failed to load Pokémon. Please try again later.</p>';
      console.error('Error fetching Pokémon data:', error);
    }
  })();

  // Static Daily Note link generation
  (function setDailyNoteLink() {
    const link = document.getElementById('daily-note-link');
    if (link) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      link.href = `/Daily-Notes/${yyyy}-${mm}-${dd}`;
      link.innerText = `Daily Note for ${yyyy}-${mm}-${dd}`;
    }
  })();
</script>

---

<div align="center">
*This dashboard is a simple demonstration of dynamic data loading and display.*
</div>
