import Entity from "../entity/Entity";

class Monster extends Entity {
  action(verb, world) {
    if (verb === "bump") {
      //atack
      world.addToHistory(`Player attacks ${this.attributes.name} !`);
      this.attributes.healt = this.attributes.healt - 1;

      if (this.attributes.healt <= 0) {
        world.addToHistory(`${this.attributes.name} dies!`);
        world.remove(this);
      } else {
        world.addToHistory(
          `${this.attributes.name}'s healt = ${this.attributes.healt}`
        );
        world.player.attributes.healt = world.player.attributes.healt - 1;
        if (world.player.attributes.healt <= 0) {
          world.addToHistory(`You have died`);
        } else {
          world.addToHistory(`You have ${world.player.attributes.healt} healt`);
        }
      }
    }
  }
}

export default Monster;
