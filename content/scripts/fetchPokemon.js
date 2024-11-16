// fetchPokemon.js

module.exports = async function (tp) {
  try {
    console.log('Fetching the list of all Pokémon...');
    // Step 1: Fetch the list of all Pokémon to determine the total count
    const listResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    if (!listResponse.ok) {
      throw new Error(`HTTP error! status: ${listResponse.status}`);
    }
    const listData = await listResponse.json();
    const totalPokemon = listData.count;
    console.log(`Total Pokémon available: ${totalPokemon}`);

    // Step 2: Generate a random Pokémon ID
    const randomId = Math.floor(Math.random() * totalPokemon) + 1;
    console.log(`Random Pokémon ID generated: ${randomId}`);

    // Step 3: Fetch data for the random Pokémon
    console.log(`Fetching data for Pokémon ID: ${randomId}`);
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    if (!pokemonResponse.ok) {
      throw new Error(`HTTP error! status: ${pokemonResponse.status}`);
    }
    const pokemonData = await pokemonResponse.json();
    console.log(`Data fetched for Pokémon: ${pokemonData.name}`);

    // Step 4: Extract desired data
    const name = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    const id = pokemonData.id;
    const types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ');
    const abilities = pokemonData.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
    const stats = pokemonData.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`).join(', ');
    const sprite = pokemonData.sprites.front_default || '';

    // Step 5: Format the Pokémon data into Markdown
    const pokemonInfo = `
## 🐾 **Today's Pokémon: ${name} (#${id})**

![${name} Sprite](${sprite})

- **Type(s):** ${types}
- **Abilities:** ${abilities}
- **Stats:** ${stats}

> "Gotta catch 'em all!" — *Pokémon Trainer*
    `;

    console.log('Pokémon information formatted successfully.');
    return pokemonInfo;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return '🐾 Could not fetch Pokémon data at this time.';
  }
};
