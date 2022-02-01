import React from "react";

function CardForm({handleChange, formData}) {
    return (
        <div>
            <label>
                Front:
                <textarea name="front" onChange={handleChange} value={formData["front"]}/> 
            </label>
            <label>
                Back:
                <textarea name="back" onChange={handleChange} value={formData["back"]}/> 
            </label>
        </div>
    );
}

export default CardForm;