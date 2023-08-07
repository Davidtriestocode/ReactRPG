// Monsters.js
import React from 'react';
import Goblin from './img/Goblin.jpg';
import Bandit from './img/Bandit.jpg';
import Minotaur from './img/Minotaur.jpg';

const monsters = [
  {
    name: "Goblin",
    health: 10,
    strength: 3,
    endurance: 3,
    agility: 3,
    experience: 50,
    image: Goblin // Use the imported image variable directly
  },
  {
    name: "Bandit",
    health: 25,
    strength: 5,
    endurance: 5,
    agility: 5,
    experience: 100,
    image: Bandit // Use the imported image variable directly
  },
  {
    name: "Minotaur",
    health: 50,
    strength: 12,
    endurance: 12,
    agility: 12,
    experience: 200,
    image: Minotaur // Use the imported image variable directly
  }
];

// Function to spawn X number of random monsters in X locations
const spawnMonsters = (numberOfMonsters, locations) => {
  const spawnedMonsters = [];

  for (let i = 0; i < numberOfMonsters; i++) {
    const randomMonsterIndex = Math.floor(Math.random() * monsters.length);
    const randomLocationIndex = Math.floor(Math.random() * locations.length);

    const randomMonster = { ...monsters[randomMonsterIndex], location: locations[randomLocationIndex] };
    spawnedMonsters.push(randomMonster);
  }

  return spawnedMonsters;
};

// Export the getMonsterStats function
 const getMonsterStats = (monsterName) => {
  const monster = monsters.find((m) => m.name === monsterName);
  if (monster) {
    return {
      health: monster.health,
      attack: monster.attack,
      // Add other monster stats here
    };
  } else {
    throw new Error(`Monster with name ${monsterName} not found.`);
  }
};


export { monsters, spawnMonsters, getMonsterStats };
