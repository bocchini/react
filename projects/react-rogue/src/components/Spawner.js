import Loot from "./Loot";
import Monster from "../enimies/Monsters";
import Stairs from "../components/Stairs";

const monsterTable = [
  {
    name: "Ogre",
    color: "#A9A9A9",
    ascii: "☢",
    offset: { x: 2, y: 3 },
    healt: 6
  },
  {
    name: "Kobot",
    color: "green",
    ascii: "☫",
    offset: { x: 6, y: 3 },
    healt: 3
  },
  {
    name: "Slime",
    color: "darkgreen",
    ascii: "☠",
    offset: { x: 3, y: 3 },
    healt: 2
  },
  {
    name: "Dragon",
    color: "red",
    ascii: "☣",
    offset: { x: 2, y: 3 },
    healt: 10
  }
];

const lootTable = [
  {
    name: "Long Sword",
    color: "#A9A9A9",
    ascii: "✟",
    offset: { x: 6, y: 3 }
  },
  {
    name: "Healt Potion",
    color: "#FF0000",
    ascii: "❤",
    offset: { x: 6, y: 3 }
  },
  {
    name: "Gold Coin",
    color: "#FFFF00",
    ascii: "💰",
    offset: { x: 3, y: 3 }
  },
  {
    name: "Light Armor",
    color: "#696969",
    ascii: "⊚",
    offset: { x: 4, y: 3 }
  }
];

class Spawner {
  constructor(world) {
    this.world = world;
  }

  spawn(spawnCount, createEntity) {
    for (let count = 0; count < spawnCount; count++) {
      let entity = createEntity();
      this.world.add(entity);
      this.world.moveToSpace(entity);
    }
  }

  spawnLoot(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Loot(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        lootTable[getRandomInt(lootTable.length)]
      );
    });
  }

  spawnMonsters(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Monster(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        monsterTable[getRandomInt(lootTable.length)]
      );
    });
  }

  spawnStairs() {
    let stairs = new Stairs(
      this.world.width - 10,
      this.world.height - 10,
      this.world.tilesize
    );
    this.world.add(stairs);
    this.world.moveToSpace(stairs);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;
