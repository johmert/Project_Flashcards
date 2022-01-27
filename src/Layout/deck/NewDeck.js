import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function NewDeck({addDeck}) {
    const [formData, setFormData] = useState({});
    const history = useHistory();

    function handleChange({target}){
        setFormData({...formData, [target.name]: target.value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        addDeck(formData.name, formData.description);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" onChange={handleChange}/>
                </label>
                <label>
                    Description:
                    <textarea name="description" onChange={handleChange}/>
                </label>
                <button onClick={() => history.push("/")}>Cancel</button>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default NewDeck;