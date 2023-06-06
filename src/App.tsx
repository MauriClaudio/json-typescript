import { useState } from "react"

import dbjson from "./data/db.json"
import { ComplexList } from "./components/list/ComplexList"
import { SimpleList } from "./components/list/SimpleList"
import { Object } from "./components/Object"
import { JsonStructure } from "./types/ConfigAll"

function App() {

    const [json, setJson] = useState<JsonStructure[]>([])

    const setValue = (js: JsonStructure) => {
        console.log("to APP : ", js)
        const newJson: JsonStructure[] = json.filter((item: JsonStructure) => item.name !== js.name)
        newJson.push(js)
        setJson(newJson)
        console.log("NEW APP :", newJson)
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
            <input type="submit" onClick={e => console.log("SUBMIT :", json)} />
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