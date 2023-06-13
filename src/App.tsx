import { useState } from "react"

import dbjsonprova from "./data/dbconfprova.json"
import dbjson1 from "./data/dbconf1.json"
import dbjsonAll from "./data/dbconfAll.json"
import dbjsonnopw from "./data/dbconfnopw.json"
import { ComplexList } from "./components/list/ComplexList"
import { SimpleList } from "./components/list/SimpleList"
import { Object } from "./components/Object"
import { JsonStructure } from "./types/ConfigAll"
import axios from "axios"

function App() {

    const [json, setJson] = useState<JsonStructure>()

    const setValue = (js: JsonStructure) => {
        //console.log("to APP : ", js)
        if (js.elements || js.value || js.values) {
            setJson(js)
            console.log("NEW APP :", js)
        }
        else {
            setJson(undefined)
            console.log("NEW APP :", undefined)
        }
    }

    const handleSubmit = async () => {
        console.log("SUBMIT :", json)
        await axios.post("http://localhost:8000/dbdata ", json)
    }

    const handleDbConfChange = (value: string) => {
        if (json !== undefined) {
            setJson(undefined)
        }
        if (value === "dbconf1") {
            return dbjson1
        }
        else if (value === "dbconfprova") {
            return dbjsonprova
        }
        else if (value === "dbconfnopw") {
            return dbjsonnopw
        }
        else return ""
    }

    const [dbjson, setDbJson] = useState<any>(handleDbConfChange(dbjsonAll.default))

    return (
        <>
            <select onChange={e => setDbJson(handleDbConfChange(e.currentTarget.value))}>
                {dbjsonAll.AllNames.map((item: string) => <option key={item}>{item}</option>)}
            </select>
            <br />
            {dbjson !== "" ?
                dbjson.mastertype === "list" ?
                    dbjson.elements ?
                        <ComplexList
                            configElement={{
                                name: "dbjson", type: "list", minListElements: dbjson.minListElements, elements: dbjson.elements
                            }}
                            setValue={setValue} />
                        :
                        <SimpleList
                            configElement={{
                                name: "dbjson", type: "list", elements: dbjson.elements
                            }}
                            setValue={setValue} />
                    :
                    <Object
                        configElement={{
                            name: "dbjson", type: "object", elements: dbjson.elements
                        }}
                        setValue={setValue}
                    />
                : null
            }
            <br /><br />
            <input type="submit" onClick={e => handleSubmit()} />
            <br />
            <a
                href={'data: application/json;charset=utf-8; ,'
                    + encodeURIComponent(JSON.stringify(json, null, 2))}
                download={"dbdataDownload"}
                target="_blank">
                <button>download</button>
            </a>
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