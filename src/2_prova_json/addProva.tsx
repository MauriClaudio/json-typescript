import axios from "axios"
import { createElement, useEffect } from "react";
import { useState } from "react"
import { PJson } from "../types/PJson";

const SERVER_ADDRESS:string = "http://localhost:8000/"

type config = {
    id:number;
    tag: string;
    min?: string;
    radiovalue?: string;
    text?: string;
    type?: string;
    required?: boolean;
    options?: string[];
    radios?: string[];
    restricted?: {
        setBool: () => void
        unique?: boolean
    }
}

type props = {
    prop:string;
    onChange: (e:any) => void;
}

export const AddProva = ({prop, onChange}:props) => {
    const [config, setConfig] = useState<config[]>([])
    const [pjson, setPjson] = useState<string[]>([])
    const [acceptId, setAcceptid] = useState<any>(false)    

    const handleGet = async() => {
        const callConfig = await axios.get(SERVER_ADDRESS + "config_" + prop + "2")
        const callPjson = await axios.get(SERVER_ADDRESS + "PJson?" + prop)
        setConfig(callConfig.data)
        setPjson(callPjson.data)
        console.log(pjson)
    }; useEffect(() => {handleGet()},[])

    function render (item:config) {

        const sa:string = "tag"
        const s:any = item
        const si:any = s[sa]
        console.log(si)

        function onch (e:any) {
            onChange(e)
            if(item.restricted?.unique){
                //confronto con pjson
            }
            
        }

        const we = createElement(
            item.radios? "div": item.tag,
            {
                name: prop,
                type: item.type? item.type : null,
                required: item.required? item.required : null,
                onChange:   item.radios? null : 
                            item.restricted? onch : onChange,
                min: item.min? item.min : null
            },
            item.options? 
                item.options.map((element:string) =>
                <option key={element} value={element}>{element}</option>) 
            : item.radios? 
                item.radios.map((element) => <div key={element}> 
                <input type="radio" required={item.required === true} name={prop} value={element} onChange={onChange}/>{element}</div>) 
            : null
        ); return we
    }

    return (<>{config.map((item:config) => <div key={item.id}>
            {prop}:{render(item)}
    </div>)}</>)

    /*
    const [json, setJson] = useState<config[]>([])
    const handleGet = async(path:string) => {
        const {data} = await axios.get(SERVER_ADDRESS + path)
        setJson(data)
    }; useEffect(() => {handleGet("configCustomId")}, [])
    
    const handleGetto = async(path:string) => {
        const {data} = await axios.get(SERVER_ADDRESS + path)
        setJson1(data)
    }; useEffect(() => {handleGetto("PJson")}, [])

    
    const [json1, setJson1] = useState<config[]>([])
    
    function render (item:config) {
        let tag:any
        let type:any
        let red:any 

        if(item.type === "number" || item.type === "text") {
            tag = "input"
            type = item.type

        }

        if(item.restreins){
        }

        if(item.unique){
            red = (e:any) => {
                if(json1.find(element => element.id.toString() === e.currentTarget.value)){
                    console.log("fuck")
            }
            }
        }
        return createElement(
            tag? tag : "div", {
                id: item.name,
                type: type? type : null,
                onChange: red? red : null,
                min: item.restreins?.min? item.restreins?.min : null
            },)
    }

    
    */
}