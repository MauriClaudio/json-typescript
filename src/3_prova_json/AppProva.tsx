import React, { useEffect, useState } from "react"
import axios from "axios"
import jsonconfig from "../config.json"
import { InputProva } from "./InputProva"

const SERVER_ADDRES:string = "http://localhost:8000/" 

type Element = {
    id: number;
    name: string;
    type: string;
    defaultValue?: string;
    unique?: boolean;
    tag: string,
    values?: string[];
}

type Config = {
    mastertype: string;
    elements: Element[];
}

function App () {
    const [config, setConfig] = useState<Config>({mastertype:"object", elements:[]})
    const handleGet = async() => {
        //const {data} = await axios.get(SERVER_ADDRES + "config_all")
        setConfig(jsonconfig)
    };
    useEffect(() => {
        handleGet()
    },[])

    const handlePost = async() => {
        //manca la dinamicita
        const id:any = document.getElementById("input_id")
        const name:any = document.getElementById("input_name")
        await axios.post(SERVER_ADDRES + "PJson", {
            id: parseInt(id.value),
            name: name.value,
        })
    }
    
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    /*function handleAbleSubmit () {
        let i:boolean = false
        config.elements.some((item:Element) => {
            if(document.getElementById("check_" + item.name)){
                const element:any = document.getElementById("check_" + item.name)
                if(!element.checked){
                    i = true
                }
            }
        })
        setIsDisabled(i)
        console.log(isDisabled)
    }*/

    return (<form onSubmit={handlePost}>
        {config.mastertype === "object" && "{"}
        {config.mastertype === "list" && "["}
        <br/>
        {config.elements.map((item:Element) => 
            <InputProva key={item.name} element={item} onChange={() => {}} />
        )}
        {config.mastertype === "object" && "}"}
        {config.mastertype === "list" && "]"}
        <br/>
        <input type="submit" disabled={isDisabled}/>
    </form>)
}

export default App