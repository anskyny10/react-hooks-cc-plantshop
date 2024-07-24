import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => {
        if(res.ok){
          return res.json()
        } else {
          throw Error('get went wrong')
        }
      })
      .then(data => setPlants(data))
      .catch(err => console.error('couldnt reach server'))
    }, []);

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant])
  };
  
  const updateSearch = (newSearch) => {
    setSearch(newSearch)
  };

  const filteredPlants = plants.filter(plant => {
    if(plant.name.toLowerCase().includes(search.toLowerCase())) {
      return true;
      } else {
      return false;
    }
  });

  return (
    <main>
      <NewPlantForm addPlant={addPlant}/>
      <Search updateSearch={updateSearch}/>
      <PlantList plants={filteredPlants}/>
    </main>
  );
}

export default PlantPage;
