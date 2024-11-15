---
title: Knowledge Garden 🌱
tags:
  - index
  - knowledge-garden
  - daily-log
  - dev-log
---

# Welcome to the Knowledge Garden of Christopher Tavolazzi 🌍

<marquee style="
  color: #ffffff;
  font-size: 1.2em;
  padding: 10px;
  margin: 20px 0;
  border-top: 1px solid rgba(255,255,255,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.2);
">
  🤖 Welcome to my digital chaos! | 🎮 Yes, that Pokémon API really works | 🧠 I bullied an AI into helping me break this static site | 🌱 Growing digital gardens and chaos emeralds | 🚀 Where we're going, we don't need sanitization
</marquee>

Hey there! You've entered a space that's a bit different from your typical blog or portfolio. This is a **living knowledge garden**, a raw, evolving repository of my ideas, projects, and unfiltered thoughts. Here, I'm recording my journey day by day, so you'll see both the breakthroughs and the messy bits.

## About This Garden 🌿

In this digital space, I document my experiences, struggles, insights, and ambitions. This is **not polished, it's real**, and I hope it inspires you to dive into the depths of your own journey as well. As you explore, you'll get an unfiltered look at my day-to-day activities, especially in the fields of **AI, robotics, creative projects, and everything in between**.

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

  @keyframes glow {
    0% { box-shadow: 0 0 15px rgba(255,255,255,0.1); }
    50% { box-shadow: 0 0 25px rgba(255,255,255,0.2); }
    100% { box-shadow: 0 0 15px rgba(255,255,255,0.1); }
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
  ">
    Get Another Pokémon
  </button>
</div>

<script>
  async function loadPokemon() {
    const pokemonInfo = document.getElementById('pokemon-info');
    try {
      const randomId = Math.floor(Math.random() * 150) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();

      // Create elements with enhanced Pokemon card styling
      const nameElement = document.createElement('h2');
      nameElement.textContent = data.name.toUpperCase();
      nameElement.style.margin = '0 0 15px 0';
      nameElement.style.fontSize = '1.5em';
      nameElement.style.fontWeight = 'bold';
      nameElement.style.letterSpacing = '0.05em';
      nameElement.style.textShadow = '0 0 10px rgba(255,255,255,0.3)';

      const imageContainer = document.createElement('div');
      imageContainer.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)';
      imageContainer.style.borderRadius = '10px';
      imageContainer.style.padding = '15px';
      imageContainer.style.margin = '0 -10px 15px -10px';
      imageContainer.style.border = '1px solid rgba(255,255,255,0.2)';
      imageContainer.style.boxShadow = 'inset 0 0 20px rgba(255,255,255,0.1)';
      imageContainer.style.position = 'relative';

      // Single shine effect
      const shineElement = document.createElement('div');
      shineElement.style.position = 'absolute';
      shineElement.style.top = '0';
      shineElement.style.left = '-100%';
      shineElement.style.width = '50%';
      shineElement.style.height = '100%';
      shineElement.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)';
      shineElement.style.animation = 'shine 3s infinite';
      imageContainer.appendChild(shineElement);

      const imgElement = document.createElement('img');
      imgElement.src = data.sprites.front_default;
      imgElement.alt = data.name;
      imgElement.width = 120;
      imgElement.height = 120;
      imgElement.style.display = 'block';
      imgElement.style.margin = '0 auto';
      imgElement.style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.2))';
      imageContainer.appendChild(imgElement);

      const statsContainer = document.createElement('div');
      statsContainer.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
      statsContainer.style.borderRadius = '8px';
      statsContainer.style.padding = '10px';
      statsContainer.style.marginTop = '10px';
      statsContainer.style.border = '1px solid rgba(255,255,255,0.1)';
      statsContainer.style.boxShadow = 'inset 0 0 15px rgba(255,255,255,0.05)';

      const typeElement = document.createElement('p');
      typeElement.textContent = `Type: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
      typeElement.style.margin = '5px 0';
      typeElement.style.fontWeight = 'bold';
      typeElement.style.color = 'rgba(255,255,255,0.9)';

      const heightElement = document.createElement('p');
      heightElement.textContent = `Height: ${data.height / 10} m`;
      heightElement.style.margin = '5px 0';
      heightElement.style.fontSize = '0.9em';
      heightElement.style.color = 'rgba(255,255,255,0.8)';

      const weightElement = document.createElement('p');
      weightElement.textContent = `Weight: ${data.weight / 10} kg`;
      weightElement.style.margin = '5px 0';
      weightElement.style.fontSize = '0.9em';
      weightElement.style.color = 'rgba(255,255,255,0.8)';

      // Clear and append elements
      pokemonInfo.innerHTML = '';
      pokemonInfo.appendChild(nameElement);
      pokemonInfo.appendChild(imageContainer);
      statsContainer.appendChild(typeElement);
      statsContainer.appendChild(heightElement);
      statsContainer.appendChild(weightElement);
      pokemonInfo.appendChild(statsContainer);

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

## What You'll Find Here 🔍

- **Daily Development Logs**: Raw, unfiltered thoughts and progress
- **Project Updates**: Real-time documentation of what I'm building
- **Learning Journey**: Insights and discoveries along the way
- **Random Experiments**: Like the Pokémon generator above!

---

<div align="center">
*Welcome to the unfiltered journey of a knowledge garden in motion.*
</div>
