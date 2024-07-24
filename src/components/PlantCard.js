import React, { useState } from "react";

function PlantCard( { plant, deletePlant, updatePrice }) {

  const [inStock, setInStock] = useState(true);
  const [newPrice, setNewPrice] = useState("")

  const handleToggle = () => {
    setInStock(!inStock);
  }

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value)
  }

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    handlePriceUpdate();
    setNewPrice("")
  }

  const handlePriceUpdate = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`,
      {method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: parseFloat(newPrice) })
      }
    )
    .then(res => {
      if(res.ok) {
        return res.json()
        } else {
        throw Error('patch went wrong')
      }
    })
    .then(data => {
      updatePrice(data)
    })
    .catch(err => console.error('couldnt reach server'))
  }

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`,
      {method: "DELETE"
      })
    .then(res => {
      if(res.ok){
        deletePlant(plant.id)
      } else {
        throw Error('delete went wrong')
      }
    })
    .catch(err => console.error('couldnt reach server'))
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <form onSubmit={handlePriceSubmit}>
        <input type="number" name="new-price" placeholder="Enter new price..." value={newPrice} onChange={handlePriceChange} />
        <button type="submit">Update Price</button>
      </form>
      {inStock ? (
        <button className="primary" onClick={handleToggle}>In Stock</button>
      ) : (
        <button onClick={handleToggle}>Out of Stock</button>
      )}
      {<button className="delete" onClick={handleDelete}>X</button>}
    </li>
  );
}

export default PlantCard;