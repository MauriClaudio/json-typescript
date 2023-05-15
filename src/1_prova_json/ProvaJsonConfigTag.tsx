import { createElement, useEffect, useState } from "react"
import { config } from "./config";
import axios from "axios";

type config = {
  name: string;
  tag: string;
  type: string;
  id: number;
}

type props = {
  name:string;
  item:string;
  handle: (e:any) => void;
  needed?: boolean;
  needHandle?: boolean;
  min?: number;
  options?: string[]
}

export const PJC = ({name, item, handle, needed, needHandle, min, options}:props) => {
  
  const [json, setJson] = useState<config[]>([])
  const get = async() => {
    const {data} = await axios.get("http://localhost:8000/config?name=" + name)
    setJson(data)
  }; useEffect(() => {get()},[])

  return (<>
    {item}: 
    {name === "inputRadio" ? 
      options?.map((ite:string) => <input key={ite} type="radio" value={ite} name={item} onChange={handle}/>) 

      : 
      
    json.map((element:config) => createElement( 
      
        element.tag,
      {
        placeholder: item,
        key: element.id,
        type: element.type,
        onChange: handle,
        min: min? min : null,
      },
      element.tag === "select" ?
        options?.map((item:string) => <option key={item} value={item}>{item}</option>) : null
    ))}
    {needed? createElement("input", {type: "checkbox", disabled: true, checked: needHandle}) : null}
    {needed? createElement("p", {id: "error" + item, style: {color: "red"}}) : null}
  </>)
}




//function ce () { return createElement("h1", {style: {color: "red"}}, "Prova") }


  //return createElement("h1", {style: {color: "red"}}, "Prova")
  //return createElement(ce)

/*
const style = config.style

function We () {
   return createElement(
        config.tag,
        {style},
        config.text
    )
}
export function PJC() {
    return createElement(
        We

    )    
}
*/














/*import React from 'react';

interface ComponentProps {
  baseType: string;
  children?: ComponentProps[];
}

const components = {
  Appe: () => <div>Appe</div>,
  TextField: () => <input type="text" />,
};

const Component = ({ baseType, children }: ComponentProps) => {
  const TagName = components[baseType];
  return (
    <TagName>
      {children?.map((child) => (
        <Component {...child} />
      ))}
    </TagName>
  );
};

const data = {
  UI: {
    baseType: 'Appe',
    children: [
      {
        baseType: 'TextField',
        props: {},
      },
    ],
  },
};

const Appe = () => <Component {...data.UI} />;

export default Appe;

/*
import React, { createElement } from "react"
import { H1 } from "./H1"
import {config} from "./config"

const keyToComponentMap = {
    h1: () => <h1>Prova</h1>
}

type config = {
    component: "h1",
    children: "PROVA"
}

export const renderComponent = ({config}:config) => {
    if(typeof keyToComponentMap[config.component] !== "undefined") {
        return createElement(
            keyToComponentMap[config.component],config.children ? config.children : null
        )
    }
}

function We () {
   

    return createElement(
        "h1",
        {style: {color: "red"}},
        "PROVA JSON CONFIG"
    )
}

export function PJC() {
    return createElement(
        We
    )    
}
*/