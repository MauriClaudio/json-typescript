import axios from "axios"
import {AddProva} from "./addProva"
import { useState } from "react"

//type deve cambiare in modo dinamico il valore di default
//sistemare tutta la funzione validity con i bool del caso

export const AddHubProva = () => {
    const [id, setId] = useState<number>(0)
    const [name, setName] = useState<string>("")
    const [type, setType] = useState<string>("1")
    const [bool, setBool] = useState<boolean>(false)
    const [colo, setColo] = useState<string>("")
    
    const [acceptId, setAcceptid] = useState<boolean>(false)
    const [acceptName, setAcceptName] = useState<boolean>(false)

    function handleChange (e:any) {
        const name:string = e.currentTarget.name
        const value:string = e.currentTarget.value
        if(name === "id") setId(parseInt(value))
        else if (name === "name") setName(value)
        else if (name === "type") setType(value)
        else if (name === "bool") setBool(e.currentTarget.checked)
        else if (name === "colo") setColo(value)
    }

    function git (e:any) {
        setBool(e.currentTarget.checked)
    }
    function gity (e:any) {
        setBool(e.currentTarget.value)
    }
    function ad () {
        document.getElementById("sd")?.addEventListener("onChange", git)
        
        document.getElementById("sd")?.addEventListener("onChange", gity)
    }

    const handlePost = async() => {
        await axios.post("http://localhost:8000/PJson", 
        {id: id, name: name, type: type, bool: bool, colo: colo})
    }

    function checkAllCampValidity () {
        return false
    }

    return (<>
        <form id="form" onSubmit={handlePost}>
            <AddProva prop="id" onChange={handleChange}/>
            <AddProva prop="name" onChange={handleChange}/>
            <AddProva prop="type" onChange={handleChange}/>
            <AddProva prop="bool" onChange={handleChange}/>
            <AddProva prop="colo" onChange={handleChange}/>
            <input type="submit" disabled={checkAllCampValidity()}/>
        </form>
    </>)
}

/**.catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser 
              // and an instance of http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        }) */