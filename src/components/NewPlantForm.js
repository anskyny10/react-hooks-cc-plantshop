import React, { useState } from "react";

function NewPlantForm( { addPlant } ) {

  const [form, setForm] = useState({
    name: "",
    image: "",
    price: 0
  });

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
     .then(res => {
        if(res.ok){
          return res.json()
        } else {
          throw Error('post went wrong')
        }
      })
     .then(data => {
        addPlant(data)
        setForm({
          name: "", 
          image: "", 
          price: 0 
        });
     })
     .catch(err => console.error('couldnt reach server'))
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" onChange={handleInputChange} />
        <input type="text" name="image" placeholder="Image URL" onChange={handleInputChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" onChange={handleInputChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
