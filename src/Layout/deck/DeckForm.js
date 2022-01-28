import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function DeckForm({mode, addDeck}) {
    const [formData, setFormData] = useState({});
    const history = useHistory();

    function handleChange({target}){
        setFormData({...formData, [target.name]: target.value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        addDeck(formData.name, formData.description);
    }
    if(mode === "edit"){
        return <h1>deck edit page!</h1>
    } else if (mode === "add"){
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
    return <p>Something has gone wrong!</p>
}

export default DeckForm;