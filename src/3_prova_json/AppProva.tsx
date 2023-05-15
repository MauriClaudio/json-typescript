import React, { useEffect, useState } from "react"
import axios from "axios"

import { InputProva } from "./InputProva"

const SERVER_ADDRES:string = "http://localhost:8000/" 

type ConfigAll = { id: number; name: string; type: string; defaultValue: string; }

type AllValue = {
    name: string;
    value: string;
}

function App () {
    const [configAll, setConfigAll] = useState<ConfigAll[]>([])
    const handleGet = async() => {
        const {data} = await axios.get(SERVER_ADDRES + "config_all")
        setConfigAll(data)
    }; useEffect(() => {handleGet()},[])


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
    function handleAbleSubmit () {
        let i:boolean = false
        configAll.some((item:ConfigAll) => {
            if(document.getElementById("check_" + item.name)){
                const element:any = document.getElementById("check_" + item.name)
                if(!element.checked){
                    i = true
                }
            }
        })
        setIsDisabled(i)
        console.log(isDisabled)
    }

    return (<form onSubmit={handlePost}>
        {configAll.map((item:ConfigAll) => 
            <InputProva key={item.name} configAll={item} link={SERVER_ADDRES} onChange={handleAbleSubmit}/>
        )}
        <input type="submit" disabled={isDisabled}/>
    </form>)
}

export default App