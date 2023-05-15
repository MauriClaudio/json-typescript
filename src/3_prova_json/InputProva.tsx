import React, { createElement, useEffect, useState } from "react"
import axios from "axios"
import { PJson } from "../types/PJson";

type Element = { 
    id: number;
    name: string;
    type: string;
    defaultValue?: string;
    unique?: boolean;
    tag: string,
    values?: string[]; 
}

type props = { 
    element: Element
    //link: string
    onChange: () => void
}

type config = {
    tag: string
    type?: string
    unique?: boolean
    children?: [{
        id: number
        tag: string
        value: string
    }]
}

export const InputProva = ({element, onChange}:props) => {
    //const [isValid, setIsValid] = useState<boolean>(element.unique ? true : false);
    //const [config, setConfig] = useState<config>({tag:"div"})
    //const [pjson, setPjson] = useState<PJson[]>([])
    /*const handleGetConfig = async() => {
        const {data} = await axios.get(link + "config_" + configAll.name)
        setConfig(data)
    };*/
    //useEffect(() => {handleGetConfig()},[])
    /*const handleGetPjson = async() => {
        const {data} = await axios.get(link + "PJson")
        setPjson(data)
    };*/
    //useEffect(() => {handleGetPjson()},[])

    /*var [checked, setChecked] = useState<boolean>(false)
    function checkUnique (e:any) {
        setChecked(true)
        pjson.some((item:PJson) => {
            const itemAny:any = item
            const valueToConfront:any = itemAny[configAll.name]
            if(valueToConfront.toString() === e.currentTarget.value
                || e.currentTarget.value === ""){
                setChecked(false)
            }
        })
        console.log(checked + configAll.name)
        onChange()
    }*/

    return( 
    <>
        {element.name}:
        {element.tag === 'input' && <input title="ciao"/>}
        {element.tag === 'select' &&
            <select title="ciao2" name="cars" id="cars">
                {element.values?.map((text: string) => <option value={text}>{text}</option>)}
            </select>
        }
        <br/>
    </>)
    
    
    
    
    /*createElement(
        "div",
        {},
        configAll.name + " : ",
        createElement(
            config.tag,
            {
                id: "input_" + configAll.name,
                type: config.type? config.type : null,
                onChange: config.unique? checkUnique : null,
            },
        ),
        config.unique? createElement(
            "input", 
            {
                id: "check_" + configAll.name, 
                type: "checkbox", 
                disabled: true, 
                checked: checked,
            },
        ) : null,
    )*/
}