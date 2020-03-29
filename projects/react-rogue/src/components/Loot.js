import Entity from "./../entity/Entity";

class Loot extends Entity {
  actiom(verb, world) {
    if (verb === "bump") {
      console.log("Loot");
      world.player.add(this);
      world.remove(this);
    }
    if (verb === "drop") {
      console.log("drop", this);
    }
  }
}

export default Loot;
