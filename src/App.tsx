import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"

import dbconf from "./data/dbconf.json"
import dbconfAll from "./data/dbconfAll.json"
import dbvalidity1 from "./data/dbvalidity1.json"
import dbvalidity2 from "./data/dbvalidity2.json"

import { ComplexList } from "./components/list/ComplexList"
import { SimpleList } from "./components/list/SimpleList"
import { Object } from "./components/Object"

import { JsonStructure } from "./types/ConfigAll"
import { AppDispatch } from "./ProvaRedux/ProvaStore"
import { getThunk, validity } from "./ProvaRedux/ProvaValiditySlice"

function App() {

    // const handleDbConfChange = (value: string) => {
    //     if (json !== undefined) { setJson(undefined) }
    //
    //     if (value === "dbconf") { return dbconf }
    //     else if (value === "dbvalidity1") { return dbvalidity1 }
    //     else if (value === "dbvalidity2") { return dbvalidity2 }
    //     else return { name: "Error: db not found" }
    // }

    const [json, setJson] = useState<JsonStructure>()

    const setValue = async (js: JsonStructure) => {
        //console.log("to APP : ", js)
        if (js.elements || js.value || js.values) {
            setJson(js)
            //console.log("NEW APP :", js)
        }
        else {
            setJson(undefined)
            console.log("NEW APP :", undefined)
        }
    }

    const [validity, setValidity] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        updValidity()
    }, [json])

    const updValidity = async () => {
        const data: validity[] = await makeGetCall()
        const currentValidity: boolean = data.find((item: validity) => item.validity === false) ? false : true
        setValidity(currentValidity)
    }

    const makeGetCall = async () => {
        const prova: any = await dispatch(getThunk())
        return prova.payload.prova
    }


    const getObject = async () => {
        console.log('redux', await makeGetCall())
        console.log("json", json)
    }

    const handleSubmit = async () => {
        console.log("SUBMIT :", json)
        await axios.post("http://localhost:8000/dbdata ", json)
    }

    const [conf, setConf] = useState<any>(dbvalidity1/*handleDbConfChange(dbconfAll.default)*/)

    return (
        <>
            {/*}
            <select onChange={e => setConf(handleDbConfChange(e.currentTarget.value))}>
                {dbconfAll.AllNames.map((item: string) => <option key={item}>{item}</option>)}
            </select>
            {/**/}
            <br />
            <button onClick={getObject}>GET</button>
            {conf !== "" ?
                conf.mastertype === "list" ?
                    conf.elements ?
                        <ComplexList
                            configElement={conf}
                            setValue={setValue}
                            id={'1'}
                        />
                        :
                        <SimpleList
                            configElement={conf}
                            setValue={setValue}
                            id={'1'}
                        />
                    :
                <Object
                    configElement={conf}
                    setValue={setValue}
                    id={'1'}
                />
                : null
            }
            <br /><br />
            <input type="submit" disabled={!validity} onClick={e => handleSubmit()} />
            <br />
            <a
                href={'data: application/json;charset=utf-8; ,'
                    + encodeURIComponent(JSON.stringify(json, null, 2))}
                download={"dbdataDownload"}
                target="_blank">
                <button>download</button>
            </a>
            {/**/}
        </>
    )
}

export default App

/*
const [configAll, setConfigAll] = useState<ConfigMaster>({ mastertype: "", elements: [] })
const handleGet = async () => {
const { data } = await axios.get("http://localhost:8000/config")
setConfigAll(data)
}
useEffect(() => {
handleGet()
}, [])
*/