import React from "react";

function DeckForm({formData, handleChange}){
    return (
        <div>
            <label>
                Name: 
            </label>
            <input name="name" type="text" onChange={handleChange} value={formData["name"]}/>
            
            <label>
                Description:
            </label> 
            <textarea name="description" onChange={handleChange} value={formData["description"]}/>
            
        </div>
    );
}

export default DeckForm;