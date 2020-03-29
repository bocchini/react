import Entity from "../entity/Entity";

class Player extends Entity {
  inventory = [];

  attributes = {
    name: "Player",
    ascii: "☻",
    healt: 10,
    color: "#00008B"
  };

  move(dx, dy) {
    if (this.attributes.healt <= 0) return;
    this.x += dx;
    this.y += dy;
  }

  add(item) {
    this.inventory.push(item);
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
