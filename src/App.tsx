import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"

import dbconf from "./data/dbconf.json"
import dbconfAll from "./data/dbconfAll.json"
import dbSwitchProva1 from "./data/dbSwitchProva1.json"
import dbSwitchProva2 from "./data/dbSwitchProva2.json"

import { JsonStructure } from "./types/ConfigAll"
import { AppDispatch } from "./components/redux/ValidityStore"
import { getThunk, reset, validity } from "./components/redux/ValiditySlice"
import { SetPath } from "./components/SetPath"

function App() {

    const setJsonConfituration = (value: string) => {
        if (value === "dbconf") { return dbconf }
        else if (value === "dbprova1") { return dbSwitchProva1 }
        else if (value === "dbprova2") { return dbSwitchProva2 }
        else return { name: "Error: db not found" }
    }

    const [json, setJson] = useState<JsonStructure>()

    const [conf, setConf] = useState<any>(setJsonConfituration(dbconfAll.default))

    const [validity, setValidity] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        setJson({ name: conf.name, elements: [], id: '' })
    }, [conf])

    useEffect(() => {
        updValidity()
        console.log('json :', json)
    }, [json])

    const updValidity = async () => {
        const data: validity[] = await makeGetCall()
        const currentValidity: boolean = data.find((item: validity) => item.validity === false) ? false : true
        setValidity(currentValidity)
    }

    const makeGetCall = async () => {
        const prova: any = await dispatch(getThunk())
        return prova.payload.validity
    }

    const getObject = async () => {
        console.log('redux', await makeGetCall())
        console.log("json", json)
    }

    const handleSubmit = async () => {
        console.log("SUBMIT :", json)
        await axios.post("http://localhost:8000/dbdata ", json)
    }

    const handleConfChange = (value: string) => {
        dispatch(reset())
        setConf(setJsonConfituration(value))
    }

    return (
        <>
            <select onChange={e => handleConfChange(e.currentTarget.value)}>
                {dbconfAll.AllNames.map((item: string) => <option key={item}>{item}</option>)}
            </select>
            <div key={conf.id}>
                <button onClick={getObject}>GET</button>
                <br /><br />
                <SetPath
                    configElement={conf}
                    setValue={setJson}
                    id={''}
                />
                <br /><br />
                <input type="submit" disabled={!validity} onClick={e => handleSubmit()} />
                <br />
                <a
                    href={'data: application/json;charset=utf-8; ,' + encodeURIComponent(JSON.stringify(json, null, 2))}
                    download="dbdataDownload"
                    target="_blank">
                    <button>download</button>
                </a>
            </div>
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