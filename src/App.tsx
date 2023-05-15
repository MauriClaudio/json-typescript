import { useEffect, useState } from 'react';

import axios from 'axios';

import { PJson } from './types/PJson';
import { ModJson } from './components/ModJson';
import { JsonList } from './components/JsonList';
import { AddJson } from './components/AddJson';
import { AddProva } from './2_prova_json/addProva';
import { AddHubProva } from './2_prova_json/addhubprova';

function App() {
  /**GET to json
   * useState supera type Promise
   * ([]) toglie undefined
   * useEffect toglie ripetizione
   */
  const banList:string[] = [" ", "word1", "word2", "word3", "word3"] 

  const [json, setJson] = useState<PJson[]>([])
  const [allname, setAllname] = useState<string[]>([])
  const [allid, setAllid] = useState<number[]>([0])
  const handleGet = async() => {
    const {data} = await axios.get("http://localhost:8000/PJson") 
    setJson(data)
  }; useEffect(() => {handleGet()},[])

  const setAll = () => {
    json.some(element => {
      setAllid(previous => [...previous, element.id])
      setAllname(previous => [...previous, element.name])
    })
  }

  /**Switch List / Mod / Add
   * basandosi si toMod
   * any cosi toMod puo undefined
   */
  const [toMod, setToMod] = useState<any>()
  const handleMod = (id:string) => {
    setAll()
    setToMod(json.find((i:PJson) => i.id === parseInt(id)))
  }
  const handleBack = () => {
    setToMod(undefined)
  }
  const handleAdd = () => {
    setAll()
    setToMod(null)
  }
  /**DELETE
   * handleGet aggiorna la pagina
   */
  const handleDelete = async(id:string) => {
    await axios.delete("http://localhost:8000/PJson/" + id)
    handleGet()
  }

  return (<>
    {toMod === undefined ? 
      <>
        {json.map((item:PJson)=><div key={item.id}>
          <JsonList props={item}/>
          <button id={item.id.toString()} onClick={event => handleMod(event.currentTarget.id)}>Mod</button>
          <button id={item.id.toString()} onClick={event => handleDelete(event.currentTarget.id)}>Delete</button>
        </div>)}
        <button onClick={handleAdd}>Add</button> 
      </>
    :
      <>
        {toMod === null ? 
          <AddJson allId={allid} allName={allname} banList={banList}/> : <ModJson props={toMod} allName={allname} banList={banList}/>
        }
        <button onClick={handleBack}>Back</button>
      </>
    }
  </>)
}

export default App;

/***
 * 
          <AddHubProva/> : <ModJson props={toMod} allName={allname} banList={banList}/>
 * 
 * 
 * 
 *
 * {toMod === undefined ? 
      <>
        {json.map((item:PJson)=><div key={item.id}>
          <JsonList props={item}/>
          <button id={item.id.toString()} onClick={event => handleMod(event.currentTarget.id)}>Mod</button>
          <button id={item.id.toString()} onClick={event => handleDelete(event.currentTarget.id)}>Delete</button>
        </div>)}
        <button onClick={handleAdd}>Add</button> 
      </>
    :
      <>
        {toMod === null ? 
          <AddJson allId={allid} allName={allname} banList={banList}/> : <ModJson props={toMod} allName={allname} banList={banList}/>
        }
        <button onClick={handleBack}>Back</button>
      </>
    } */