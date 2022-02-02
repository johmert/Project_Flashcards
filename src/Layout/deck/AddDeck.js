import React from "react";

function AddDeck({handleChange}){
    return (
        <div>
            <label>
                Name: 
            </label>
            <input name="name" type="text" onChange={handleChange}/>
            
            <label>
                Description:
            </label> 
            <textarea name="description" onChange={handleChange}/>
            
        </div>
    );
}

export default AddDeck;