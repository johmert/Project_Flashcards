import React from "react";

function DeckForm({handleChange, formData}){
    return (
        <div>
            <label>
                Name: 
                <input name="name" type="text" onChange={handleChange} value={formData["name"]}/>
            </label>
            <label>
                Description: 
                <textarea name="description" onChange={handleChange} value={formData["description"]}/>
            </label>
        </div>
    );
}

export default DeckForm;