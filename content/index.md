---
title: Dashboard 🕹️
tags:
  - index
  - dashboard
  - test
  - api-demo
---
Welcome to the Dashboard! This page demonstrates dynamic functionality using inline JavaScript. Each time you visit, you’ll see a random Pokémon of the Day, and other dynamic content.

## Pokémon of the Day 🎲
<div id="pokemon-info">Loading Pokémon...</div>

## Weather 🌤️
<p id="weather-info">Coming soon!</p>

## Daily Quote 💬
<div id="quote">"Believe you can and you're halfway there."</div>

## Page Visits 🔢
<p id="visit-count">You have visited this page 0 times.</p>

<script>
  // Pokémon of the Day - Calls the PokéAPI for a random Pokémon
  (function() {
    const pokemonInfo = document.getElementById('pokemon-info');
    if (pokemonInfo) {
      const randomId = Math.floor(Math.random() * 150) + 1; // Get a random Pokémon from 1 to 150
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then(response => response.json())
        .then(data => {
          pokemonInfo.innerHTML = `
            <strong>${data.name.toUpperCase()}</strong><br>
            <img src="${data.sprites.front_default}" alt="${data.name}" /><br>
            Type: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}
          `;
        })
        .catch(error => {
          pokemonInfo.innerText = 'Failed to load Pokémon. Please try again later.';
          console.error('Error fetching Pokémon data:', error);
        });
    }
  })();

  // Daily Quote - Just for variety (this can be made dynamic later)
  (function() {
    const quotes = [
      "Believe in yourself!",
      "Every day is a new adventure.",
      "Stay curious, stay inspired.",
      "Create with passion and purpose.",
      "Embrace challenges as learning opportunities."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').innerText = randomQuote;
  })();

  // Page Visit Counter - Uses localStorage to track visits
  (function() {
    const visitCountEl = document.getElementById('visit-count');
    if (visitCountEl) {
      let visitCount = localStorage.getItem('visitCount') || 0;
      visitCount++;
      localStorage.setItem('visitCount', visitCount);
      visitCountEl.innerText = `You have visited this page ${visitCount} times.`;
    }
  })();
</script>
