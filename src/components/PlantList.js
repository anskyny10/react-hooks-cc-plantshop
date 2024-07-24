import React from "react";
import PlantCard from "./PlantCard";

function PlantList( { plants, deletePlant, updatePrice } ) {
  return (
    <ul className="cards">{plants.map(plant => <PlantCard key={plant.id} plant={plant} deletePlant={deletePlant} updatePrice={updatePrice}/>)/* render PlantCards components in here */}</ul>
  );
}

export default PlantList;
