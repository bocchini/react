import React, { useRef, useEffect, useState } from "react";

import InputManager from "../inputs/InputManager";
import World from "../world/World";
import Spawner from "../components/Spawner";

const ReactRogue = ({ width, height, tilesize }) => {
  const canvasRef = useRef();

  // const [player, setPlayer] = useState(new Player(1, 2, tilesize));
  const [world, setWorld] = useState(new World(width, height, tilesize));
  let inputManager = new InputManager();

  const handleInput = (action, data) => {
    console.log(`handle input: ${action} : ${JSON.stringify(data)}`);
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    newWorld.moveToSpace(world.player);
    setWorld(newWorld);
  };

  useEffect(() => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(10);
    spawner.spawnMonsters(6);
    setWorld(newWorld);
  }, []);

  useEffect(() => {
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  });

  //World
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width * tilesize, height * tilesize);
    world.draw(ctx);
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width * tilesize}
        height={height * tilesize}
        style={{ border: "1px solid black", background: "#D3D3D3" }}
      ></canvas>
      <ul>
        {world.player.inventory.map((item, index) => (
          <li key={index}>{item.attributes.name} </li>
        ))}
      </ul>

      <ul>
        {world.history.map((item, index) => (
          <li key={index}>{item} </li>
        ))}
      </ul>
    </>
  );
};

export default ReactRogue;
