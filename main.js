const animals = [
  {
    name: "Georgie",
    mood: "🥰",
    emoji: "🐈",
    hunger: 100,
    picture: "🐈",
    hasHero: false,
  },
  {
    name: "Harambe",
    mood: "🥰",
    emoji: "🦍",
    hunger: 100,
    picture: "🦍",
  },
  {
    name: "Otto",
    mood: "🥰",
    emoji: "🦦",
    hunger: 100,
    habitat: "water",
    picture: "🦦",
  },
  {
    name: "Thux",
    mood: "🥰",
    emoji: "🐧",
    hunger: 100,
    habitat: "ice",
    picture: "🐧",
  },
  {
    name: "Roth",
    mood: "🥰",
    emoji: "🦥",
    hunger: 100,
    picture: "🦥",
  },
  {
    name: "Ned",
    mood: "🥰",
    emoji: "🐙",
    hunger: 100,
    habitat: "water",
    picture: "🐙",
  },
  {
    name: "Kevin",
    mood: "🥰",
    emoji: "🦚",
    hunger: 100,
    picture: "🦚",
  },
  {
    name: "Oslo",
    mood: "🥰",
    emoji: "🦧",
    hunger: 100,
    habitat: "library",
    hasHero: false,
    picture: "🦧",
  },
];

const upgrades = [
  {
    type: "passive",
    price: 2000,
    name: "Mick",
    animal: "Oslo",
  },
  {
    type: "passive",
    price: 2000,
    name: "Jeremy",
    animal: "Georgie",
  },
  {
    type: "heal",
    price: 250,
    name: "Pet",
    healAmount: 25,
  },
  {
    type: "heal",
    price: 500,
    name: "Treat",
    healAmount: 55,
  },
  {
    type: "revive",
    price: 1000,
    name: "Sam",
  },
];

let money = 0;

// Feed a specific animal
function feedAnimal(animalName) {
  // Increase hunger level of an animal and handle fullness
  const foundAnimal = findAnimalByName(animalName);
  // Find an animal object by its name
  increaseAnimalHungerLevel(foundAnimal);
  // Update the information and appearance of all animals
  updateAnimals(foundAnimal);
}

// Increase hunger level of an animal and handle fullness
function increaseAnimalHungerLevel(animal) {
  if (animal.hunger < 100 && animal.hunger > 0) {
    animal.hunger++;
  }

  if (animal.hunger >= 100) {
    animal.hunger = 100;
    console.log(`${animal.name} is not hungry.`);
  }
}

// Find an animal object by its name
function findAnimalByName(animalName) {
  const foundAnimal = animals.find((animal) => animal.name === animalName);
  return foundAnimal;
}

// Update the information and appearance of all animals
function drawAnimals() {
  animals.forEach((animal) => {
    // Update the visual representation and attributes of an animal
    updateAnimals(animal);
  });
}

// Decrease hunger level of all animals periodically
function hungerLevel() {
  animals.forEach((animal) => {
    // animal.hunger -= 5;
    // if (animal.hunger <= 0) {
    //   animal.hunger = 0;
    // }
    animal.hunger = Math.max(animal.hunger - 5, 0);
    // Update the visual representation and attributes of an animal
    updateAnimals(animal);
  });
}

// Update the visual representation and attributes of an animal
function updateAnimals(animal) {
  // Update the mood emoji of an animal based on its hunger level
  updateMood(animal);
  // Update the habitat class of each animal's marquee element
  updateHabitat(animal);
  // Stop marquee animation if animal's hunger is zero
  stopMarquee(animal);
  // Update the visual representation and attributes of an animal
  updateAnimal(animal);
}

// Update the mood emoji of an animal based on its hunger level
function updateMood(animal) {
  if (animal.hunger >= 80) {
    animal.mood = "🥰";
    animal.emoji = animal.picture;
  } else if (animal.hunger >= 60) {
    animal.mood = "🤗";
  } else if (animal.hunger >= 40) {
    animal.mood = "🙃";
  } else if (animal.hunger >= 20) {
    animal.mood = "🤢";
  } else if (animal.hunger > 0) {
    animal.mood = "🤮";
  } else {
    animal.mood = "☠️";
    animal.emoji = "🪦";
  }
}

// Update the habitat class of each animal's marquee element
function updateHabitat(animal) {
  const animalElem = document.getElementById(animal.name);
  const marquee1 = animalElem.querySelector("marquee");

  const habitatClass = animal.habitat ? animal.habitat + "Pin" : "zooPin";
  marquee1.classList.add(habitatClass);
}

// Stop marquee animation if animal's hunger is zero
function stopMarquee(animal) {
  let animalElem = document.getElementById(animal.name);
  let marquee1 = animalElem.querySelector("marquee");
  let marquee2 = animalElem.querySelector("marquee>marquee");

  if (animal.hunger <= 0) {
    marquee1.stop();
    if (marquee2) {
      marquee2.stop();
    }
  }
}

function startMarquee(animal) {
  let animalElem = document.getElementById(animal.name);
  let marquee1 = animalElem.querySelector("marquee");
  let marquee2 = animalElem.querySelector("marquee>marquee");

  marquee1.start();
  if (marquee2) {
    marquee2.start();
  }
}

// Update the visual representation and attributes of an animal
function updateAnimal(animal) {
  let animalElem = document.getElementById(animal.name);
  let animalH5 = animalElem.querySelector("h5");
  let animalH1 = animalElem.querySelector("h1");
  const animalClass = animal.name === "Oslo" ? "font-oslo" : "";
  if (animal.emoji == "🪦") {
    animalH1.innerHTML = `<h1 onclick="buyUpgrade('Sam', '${animal.name}')" class="animal ${animalClass}">${animal.emoji}</h1>`;
  } else {
    animalH1.innerHTML = `<h1 onclick="feedAnimal('${animal.name}')" class="animal ${animalClass}">${animal.emoji}</h1>`;
  }
  animalH5.innerText = `${animal.name} | ${animal.mood} | Hunger: ${animal.hunger}%`;
}

// Calculate income from animals' moods and update money
function getMoney() {
  // Calculate income based on animals' moods
  const income = updateIncome();
  // Update money display and income display on the webpage
  updateMoney(income);
}

// Calculate income based on animals' moods
function updateIncome() {
  let income = 0;
  animals.forEach((animal) => {
    switch (animal.mood) {
      case "🥰":
        income += 50;
        break;
      case "🤗":
        income += 30;
        break;
      case "🙃":
        income += 5;
        break;
      case "🤢":
        income -= 5;
        break;
      case "🤮":
        income -= 30;
        break;
      default:
        income -= 50;
    }
  });

  const incomeElem = document.getElementById("income");
  incomeElem.innerHTML = `<span class="${
    income >= 0 ? "" : "text-danger"
  }">$${income}</span>`;

  return income;
}

// Update money display and income display on the webpage
function updateMoney(income) {
  if (income) {
    money += income;
  }
  const moneyElem = document.getElementById("money");

  moneyElem.innerHTML = `<span class="${
    money >= 0 ? "" : "text-danger"
  }">$${money}</span>`;
}

// Periodically update hunger and income
setInterval(hungerLevel, 4000);
setInterval(getMoney, 4000);

// Initialize the zoo's visual representation
drawAnimals();

// SECTION UPGRADES

function buyUpgrade(upgradeName, animalName) {
  const upgrade = upgrades.find((upgrade) => upgrade.name == upgradeName);
  const enough = verifyIfEnoughMoney(upgrade.price);
  if (!enough) return;
  updateMoney();
  typeOfUpgrade(upgrade, animalName);
}

// SECTION UPGRADES SERVICE

function typeOfUpgrade(upgrade, animalName) {
  if (upgrade.type == "passive") {
    const animal = findAnimalByName(upgrade.animal);
    animal.hasHero = true;
    const hero = document.getElementById(upgrade.name);
    hero.innerHTML = "";
  }
  if (upgrade.type == "heal") {
    const hungriestAnimal = sortAnimals();
    hungriestAnimal.hunger += upgrade.healAmount;
    maxHungerLevel(hungriestAnimal);
    updateAnimal(hungriestAnimal);
  }
  if (upgrade.type == "revive") {
    const deadAnimal = findAnimalByName(animalName);
    deadAnimal.hunger = 100;
    updateAnimal(deadAnimal);
    startMarquee(deadAnimal);
    effects("revive");
  }
}

function effects(effect) {
  const effectsElem = document.getElementById("effects");
  if (effect == "revive") {
    effectsElem.classList.add("healing");
    setTimeout(() => {
      effectsElem.classList.remove("healing");
    }, 1000);
  }
}

function maxHungerLevel(animal) {
  if (animal.hunger > 100) {
    animal.hunger = 100;
  }
}

function verifyIfEnoughMoney(price) {
  if (money >= price) {
    return (money -= price);
  } else {
    window.alert(
      `You don't have enough money. You have $${money}, you need $${price}`
    );
  }
}

function mick() {
  const oslo = findAnimalByName("Oslo");
  if (oslo.hasHero) {
    oslo.hunger++;
    maxHungerLevel(oslo);
  }
}

function jeremy() {
  const georgie = findAnimalByName("Georgie");
  if (georgie.hasHero) {
    georgie.hunger++;
    maxHungerLevel(georgie);
  }
}

function sortAnimals() {
  const animalsSortedByHungriest = animals.sort((a, b) => a.hunger - b.hunger);
  console.log("[HUNGRIEST ANIMALS]", animalsSortedByHungriest);
  return animalsSortedByHungriest[0];
}

setInterval(mick, 1000);
setInterval(jeremy, 1000);
