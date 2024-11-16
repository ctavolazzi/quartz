---
title: Home 🌱
tags:
  - index
  - knowledge-garden
  - daily-log
  - dev-log
---
<marquee style="
  color: #ffffff;
  font-size: 1.2em;
  padding: 10px;
  margin: 20px 0;
  border-top: 1px solid rgba(255,255,255,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.2);
">
  🤖 You're here! 🧠 Please explore the garden! 🌱 We're growing knowledge one entry at a time 🚀
</marquee>
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
## Table of Contents 📚
See all files here:
[[TOC]]


Hey there! You've entered a space that's a bit different from your typical blog or portfolio. This is a **living knowledge garden**, a raw, evolving repository of my ideas, projects, and unfiltered thoughts. Here, I'm recording my journey day by day, so you'll see both the breakthroughs and the messy bits.

## About This Garden 🌿

In this digital space, I document my experiences, struggles, insights, and ambitions. This is **not polished, it's real**, and I hope it inspires you to dive into the depths of your own journey as well. As you explore, you'll get an unfiltered look at my day-to-day activities, especially in the fields of **AI, robotics, creative projects, and everything in between**.

## API Integration Demo 🔌

This section demonstrates something interesting: real-time API calls in what's supposed to be a static environment. Through some creative problem-solving (and persistent debugging with Claude), we've managed to bypass Quartz's usual sanitization to enable dynamic content loading.

### Live Pokémon API Demo 🎲
> **Tech Note**: This shouldn't technically work in a static site with sanitized JavaScript, but here we are! The Pokémon data is being fetched and rendered in real-time from the PokeAPI.

<style>
  @keyframes shine {
    0% { left: -100%; }
    20% { left: 100%; }
    100% { left: 100%; }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
</style>

<div style="
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
">
  <div id="pokemon-info" style="
    margin-bottom: 15px;
    background: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2), inset 0 0 30px rgba(255,255,255,0.05);
    border: 2px solid rgba(255,255,255,0.3);
    position: relative;
    overflow: hidden;
    animation: float 6s ease-in-out infinite;
  ">Loading Pokémon...</div>

  <button id="refresh-button" style="
    display: inline-block;
    padding: 8px 16px;
    font-size: 1em;
    font-weight: bold;
    color: #ffffff;
    background: none;
    border: 1px solid #ffffff;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  ">
    Get Another Pokémon
  </button>
</div>

<script>
  // At the top of the script, add window scope checks
  if (typeof window.pokeColors === 'undefined') {
    window.pokeColors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
  }

  if (typeof window.dailyNoteLinkSet === 'undefined') {
    window.dailyNoteLinkSet = false;
  }

  if (typeof window.pokemonSet === 'undefined') {
    window.pokemonSet = false;
  }

  if (typeof window.linkIntervalId === 'undefined') {
    window.linkIntervalId = null;
  }

  if (typeof window.pokemonIntervalId === 'undefined') {
    window.pokemonIntervalId = null;
  }

  // Keep the rest of the code exactly as it was in the working version
  function initPokemon() {
    async function loadPokemon() {
      const pokemonInfo = document.getElementById('pokemon-info');
      try {
        const randomId = Math.floor(Math.random() * 150) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();

        const primaryType = data.types[0].type.name;
        const typeColor = window.pokeColors[primaryType] || '#71717A';

        // Update main card background with type color
        pokemonInfo.style.background = `linear-gradient(145deg, ${typeColor}33 0%, ${typeColor}11 100%)`;
        pokemonInfo.style.boxShadow = `0 4px 15px rgba(0,0,0,0.2), inset 0 0 30px ${typeColor}22`;
        pokemonInfo.style.border = `2px solid ${typeColor}44`;

        const nameElement = document.createElement('h2');
        nameElement.textContent = data.name.toUpperCase();
        nameElement.style.margin = '0 0 15px 0';
        nameElement.style.fontSize = '1.5em';
        nameElement.style.fontWeight = 'bold';
        nameElement.style.letterSpacing = '0.05em';
        nameElement.style.textShadow = `0 0 10px ${typeColor}88`;
        nameElement.style.color = '#FFFFFF';

        const imageContainer = document.createElement('div');
        imageContainer.style.background = `linear-gradient(145deg, ${typeColor}22, ${typeColor}44)`;
        imageContainer.style.borderRadius = '10px';
        imageContainer.style.padding = '15px';
        imageContainer.style.margin = '0 -10px 15px -10px';
        imageContainer.style.border = `1px solid ${typeColor}66`;
        imageContainer.style.boxShadow = `inset 0 0 20px ${typeColor}33`;
        imageContainer.style.position = 'relative';
        imageContainer.style.backdropFilter = 'blur(5px)';

        const shineElement = document.createElement('div');
        shineElement.style.position = 'absolute';
        shineElement.style.top = '0';
        shineElement.style.left = '-100%';
        shineElement.style.width = '50%';
        shineElement.style.height = '100%';
        shineElement.style.background = `linear-gradient(90deg, transparent, ${typeColor}22, transparent)`;
        shineElement.style.animation = 'shine 3s infinite';
        imageContainer.appendChild(shineElement);

        const imgElement = document.createElement('img');
        imgElement.src = data.sprites.front_default;
        imgElement.alt = data.name;
        imgElement.width = 120;
        imgElement.height = 120;
        imgElement.style.display = 'block';
        imgElement.style.margin = '0 auto';
        imgElement.style.filter = `drop-shadow(0 0 8px ${typeColor}77)`;
        imageContainer.appendChild(imgElement);

        const statsContainer = document.createElement('div');
        statsContainer.style.background = `linear-gradient(135deg, ${typeColor}22, ${typeColor}33)`;
        statsContainer.style.borderRadius = '8px';
        statsContainer.style.padding = '10px';
        statsContainer.style.marginTop = '10px';
        statsContainer.style.border = `1px solid ${typeColor}44`;
        statsContainer.style.boxShadow = `inset 0 0 15px ${typeColor}22`;

        const typeElement = document.createElement('p');
        typeElement.textContent = `Type: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
        typeElement.style.margin = '5px 0';
        typeElement.style.fontWeight = 'bold';
        typeElement.style.color = `rgba(255,255,255,0.95)`;
        typeElement.style.textShadow = `0 0 5px ${typeColor}88`;

        const heightElement = document.createElement('p');
        heightElement.textContent = `Height: ${data.height / 10} m`;
        heightElement.style.margin = '5px 0';
        heightElement.style.fontSize = '0.9em';
        heightElement.style.color = 'rgba(255,255,255,0.9)';

        const weightElement = document.createElement('p');
        weightElement.textContent = `Weight: ${data.weight / 10} kg`;
        weightElement.style.margin = '5px 0';
        weightElement.style.fontSize = '0.9em';
        weightElement.style.color = 'rgba(255,255,255,0.9)';

        // Clear and append elements
        pokemonInfo.innerHTML = '';
        pokemonInfo.appendChild(nameElement);
        pokemonInfo.appendChild(imageContainer);
        statsContainer.appendChild(typeElement);
        statsContainer.appendChild(heightElement);
        statsContainer.appendChild(weightElement);
        pokemonInfo.appendChild(statsContainer);

        // Update button styling to match type
        const button = document.getElementById('refresh-button');
        button.style.borderColor = `${typeColor}88`;
        button.style.textShadow = `0 0 5px ${typeColor}88`;
        button.style.transition = 'all 0.2s ease-in-out';
        button.onmouseover = () => {
          button.style.background = `${typeColor}22`;
          button.style.transform = 'translateY(-2px)';
        };
        button.onmouseout = () => {
          button.style.background = 'none';
          button.style.transform = 'translateY(0)';
        };

      } catch (error) {
        pokemonInfo.textContent = 'Failed to load Pokémon. Please try again later.';
        console.error('Error fetching Pokémon data:', error);
      }
    }

    // Initialize the first Pokémon on page load
    loadPokemon();

    // Add event listener to refresh button
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
      refreshButton.addEventListener('click', loadPokemon);
    }
  }

  // Initial call
  initPokemon();

  // Daily note code
  function setDailyNoteLink() {
    console.log('Attempting to set daily note link...');
    const link = document.getElementById('daily-note-link');
    if (link) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      link.href = `/Daily-Notes/${yyyy}-${mm}-${dd}`;
      link.innerText = `Daily Note 🗓`;
      window.dailyNoteLinkSet = true;
      console.log('Daily note link set successfully');
    } else {
      console.log('Link element not found');
    }
  }

  // Define a variable to track if link has been set
  let dailyNoteLinkSet = false;

  // Define function to start interval
  function startLinkInterval() {
    console.log('Starting new interval check');
    let newIntervalId = setInterval(() => {
      console.log('Interval check - dailyNoteLinkSet:', window.dailyNoteLinkSet);
      if (!window.dailyNoteLinkSet) {
        setDailyNoteLink();
      } else {
        console.log('Clearing interval');
        clearInterval(newIntervalId);
      }
    }, 100);
    return newIntervalId;
  }

  // Call it immediately
  setDailyNoteLink();
  let intervalId = startLinkInterval();

  // Call it on popstate (browser back/forward)
  window.addEventListener('popstate', function() {
    console.log('Navigation occurred, resetting flag');
    window.dailyNoteLinkSet = false;  // Reset window version
    dailyNoteLinkSet = false;         // Reset local version
    setDailyNoteLink();              // Actually reset the link
    intervalId = startLinkInterval();
  });

  // Add these to the existing code:
  let pokemonSet = false;

  function setPokemon() {
    console.log('Attempting to set Pokemon...');
    const pokemonInfo = document.getElementById('pokemon-info');
    if (pokemonInfo) {
      initPokemon();
      pokemonSet = true;
      console.log('Pokemon set successfully');
    }
  }

  function startPokemonInterval() {
    console.log('Starting new Pokemon interval check');
    let newIntervalId = setInterval(() => {
      console.log('Interval check - pokemonSet:', pokemonSet);
      if (!pokemonSet) {
        setPokemon();
      } else {
        console.log('Clearing Pokemon interval');
        clearInterval(newIntervalId);
      }
    }, 100);
    return newIntervalId;
  }

  // Initial setup
  setPokemon();
  let pokemonIntervalId = startPokemonInterval();

  // Add this handler
  window.addEventListener('popstate', function() {
    pokemonSet = false;
    pokemonIntervalId = startPokemonInterval();
  });
</script>

### What You'll Find Here 🔍

- **Daily Development Logs**: Raw, unfiltered thoughts and progress
- **Project Updates**: Real-time documentation of what I'm building
- **Learning Journey**: Insights and discoveries along the way
- **Random Experiments**: Like the Pokémon generator above!

## Why not try clicking on the Daily Note link to see what I'm up to today?

---

<div align="center">
*Welcome to the unfiltered journey of a knowledge garden in motion.*
</div>
