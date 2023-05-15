import axios from "axios"
import { useEffect, useState } from "react"
import { PJC } from "../1_prova_json/ProvaJsonConfigTag"
import { AddProva } from "../2_prova_json/addProva"

type props = {
    allId: number[]
    allName: string[]
    banList: string[]
}

export const AddJson = ({allId, allName, banList}: props) => {
    const [id, setId] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [type, setType] = useState<string>("alpha")
    const [bool, setBool] = useState<boolean>(false)
    const [colo, setColo] = useState<string>("")

    const [acceptId, setAcceptid] = useState<boolean>(false)
    const [acceptName, setAcceptName] = useState<boolean>(false)
    
    const changeAll = (errorID:string, value:string, array:any[]) => {
        const red:HTMLElement = document.getElementById(errorID)!
        
        if(red.childElementCount >= 1)
            red.removeChild(red.lastElementChild!)

        if(array.find(element => element.toString() === value)){
            const div = document.createElement("div")
            const text = document.createTextNode("Valore gia utilizzato")
            div.appendChild(text)
            red.appendChild(div)
            return false
        }
        if(banList.some(banned => value.toLowerCase().includes(banned))){
            const div = document.createElement("div")
            const text = document.createTextNode("Valore bannato")
            div.appendChild(text)
            red.appendChild(div)
            return false
        }
        return true 
    }
    
    const handlePost = async() => {
        await axios.post("http://localhost:8000/PJson", {
            name: name,
            type: type,
            bool: bool,
            colo: colo,
            id: parseInt(id)})
    }

    const changeName = (e:any) => {
        const value:string = e.currentTarget.value
        setName(value)
        if(value !== "")
            setAcceptName(changeAll("errorUserName", value, allName))
        else setAcceptName(false)
    }
    // toString e parseInt cosi 01 = 1

    const changeId = (e:any) => {
        const valueInt:number = parseInt(e.currentTarget.value)
        const value:string = valueInt.toString()
        setId(value)
        if(valueInt >= 1)
            setAcceptid(changeAll("errorCustomID", value, allId))
        else setAcceptid(false)
    }

    return (<form id="form" onSubmit={handlePost}>
        <PJC item="CustomID" name="inputNumber" handle={changeId} needed needHandle={acceptId} min={1} /> 
        <PJC item="UserName" name="inputText" handle={changeName} needed needHandle={acceptName}/>
        <PJC item="Type" name="select" handle={e => setType(e.currentTarget.value)} options={["alpha", "omega", "delta"]}/>
        <PJC item="Bool" name="inputCheckBox" handle={event => setBool(event.currentTarget.checked)}/>
        <PJC item="Colo" name="inputRadio" handle={e => setColo(e.currentTarget.value)} options={["uno", "due", "tre"]}/>
            <input type="checkbox" disabled checked={colo !== ""}/>
        <br/>
        <input type="submit" disabled={!acceptId || !acceptName || colo === ""} value="Post"/>
    </form>)
}

/*
        | colo:
            <input type="radio" name="colo" value="uno" onClick={e => setColo(e.currentTarget.value)}/>
            <input type="radio" name="colo" value="due" onClick={e => setColo(e.currentTarget.value)}/>
            <input type="radio" name="colo" value="tre" onClick={e => setColo(e.currentTarget.value)}/> 
        Type: <select onChange={e => setType(e.currentTarget.value)}>
            <option value="alpha">alpha</option>
            <option value="omega">omega</option>
            <option value="delta">delta</option>
        </select>
    /*const changeId = (value:number) => {
        setId(value.toString())
        if(value >= 1)
            setAcceptid(changeAll("errorId", value.toString(), allId))
        else setAcceptid(true)
    }
 Custom ID: <input placeholder="ID" type="number" min="1" onChange={event => changeId(parseInt(event.currentTarget.value))}/>
            <input type="checkbox" disabled checked={!acceptId}/>
        <p id="errorId" style={{color: "red"}}/>
        
        const changeName = (value:string) => {
        setName(value)
        if(value !== "")
            setAcceptName(changeAll("errorName", value, allName))
        else setAcceptName(true)
    }*/