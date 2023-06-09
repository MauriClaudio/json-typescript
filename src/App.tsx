import { useState } from "react"

import dbjson from "./data/dbconf.json"
import { ComplexList } from "./components/list/ComplexList"
import { SimpleList } from "./components/list/SimpleList"
import { Object } from "./components/Object"
import { JsonStructure } from "./types/ConfigAll"
import axios from "axios"

function App() {

    const [json, setJson] = useState<JsonStructure>()

    const setValue = (js: JsonStructure) => {
        console.log("to APP : ", js)
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

    return (
        <>
            {dbjson.mastertype === "list" ?
                dbjson.elements ?
                    <ComplexList
                        configElement={{
                            name: "dbjson", type: "list", minListElements: 1, elements: dbjson.elements
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
            }
            <br /><br />
            <input type="submit" onClick={e =>
                handleSubmit()
            } />
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