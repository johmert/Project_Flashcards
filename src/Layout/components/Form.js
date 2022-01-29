import React from "react";

function Form({keys, index, handleChange, formData}) {
    return (
        <div id={keys[index]}>
            <label htmlFor={keys[index]}>
                {keys[index].charAt(0).toUpperCase() + keys[index].slice(1)}
            </label>
            {
                keys[index] === "name" ?
                <input name="name" type="text" onChange={handleChange} value={formData[keys[index]]}/> :
                <textarea name={keys[index]} onChange={handleChange} value={formData[keys[index]]}/> 
            }
        </div>
    );
}

export default Form;