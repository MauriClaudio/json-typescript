import { useState } from "react";

import axios from "axios";

import { PJson } from "../types/PJson";

type prps = {
    props: PJson
    allName: string[]
    banList: string[]
}

export const ModJson = ({props, allName, banList}: prps) => {
    const [name, setName] = useState<string>(props.name)
    const [type, setType] = useState<string>(props.type)
    const [bool, setBool] = useState<boolean>(props.bool)
    const [colo, setColo] = useState<string>(props.colo)

    const [acceptName, setAcceptName] = useState<boolean>(true)

    const handleReset = () => {
        setName(props.name)
        setType(props.type)
        setBool(props.bool)
        setColo(props.colo)
    }

    const handlePush = async() => {
        await axios.put("http://localhost:8000/PJson/" + props.id, {
            name: name,
            type: type,
            bool: bool,
            colo: colo,
            id: props.id})
    }
    
    const changeName = (value:string) => {
        setName(value)
        const red:HTMLElement = document.getElementById("errorName")!
        
        if(red.childElementCount >= 1)
            red.removeChild(red.lastElementChild!)
        
        if(allName.find(element => element === value && value !== props.name)){
            const div = document.createElement("div")
            const text = document.createTextNode("Valore gia utilizzato")
            div.appendChild(text)
            red.appendChild(div)
            setAcceptName(true)
        }            
        else if(banList.some(banned => value.toLowerCase().includes(banned))){
            const div = document.createElement("div")
            const text = document.createTextNode("Valore bannato")
            div.appendChild(text)
            red.appendChild(div)
            setAcceptName(true)
        }
        else if(value==="") 
            setAcceptName(true)
        else setAcceptName(false)
    }

    return(<form onSubmit={handlePush}>
        id: {props.id} 
        | name: <input value={name} onChange={event => changeName(event.currentTarget.value)}/>
        <p id="errorName" style={{color: "red"}}/>
        | type: 
        <select defaultValue={type} onChange={event => setType(event.currentTarget.value)}>
            <option value="alpha">alpha</option>
            <option value="omega">omega</option>
            <option value="delta">delta</option>
        </select>
        | bool:
        <input type="checkbox" defaultChecked={bool} onChange={event => setBool(event.currentTarget.checked)}/> :
        | colo:
        <input type="radio" name="colo" value="uno" defaultChecked={colo === "uno"} onClick={event => setColo(event.currentTarget.value)}/>
        <input type="radio" name="colo" value="due" defaultChecked={colo === "due"} onClick={event => setColo(event.currentTarget.value)}/>
        <input type="radio" name="colo" value="tre" defaultChecked={colo === "tre"} onClick={event => setColo(event.currentTarget.value)}/>
        <input type="reset" onClick={handleReset}></input>
        <br/>
        <input type="submit" value="Put" disabled={acceptName}/>
    </form>);
}









/*
    number == normale piu cambiare cose con toString e parseInt
    password == normale
    color == string con forma"#000000"
    datetime-local == string con forma "yyyy-mm-ddThh:mm" 
    file = bo non penso si possa fare con un json
        al massimo metto l'url di destinazione
    range = string con forma numerica
    week = date ma con forma "yyyy-Www"
*/