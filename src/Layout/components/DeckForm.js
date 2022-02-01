import React from "react";

function DeckForm({formData, handleChange}){
    return (
        <div>
            <label>
                Name: 
                <input name={formData["name"]} type="text" onChange={handleChange} value={formData["name"]}/>
            </label>
            <label>
                Description: 
                <textarea name="description" onChange={handleChange} value={formData["description"]}/>
            </label>
        </div>
    );
}

export default DeckForm;