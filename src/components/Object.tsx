import { useState } from "react"

import { ConfigElement, InputProps, JsonStructure } from "../types/ConfigAll"
import { ComplexList } from "./list/ComplexList"
import { SimpleList } from "./list/SimpleList"
import { InputBoolean } from "./input/InputBoolean"
import { InputNumber } from "./input/InputNumber"
import { InputString } from "./input/InputString"

export const Object = ({ configElement, setValue, id }: InputProps) => {

    const [json, setJson] = useState<JsonStructure[]>([])

    const setThisValue = (js: JsonStructure) => {
        console.log("to " + configElement.name + " : ", js)
        const newJson: JsonStructure[] = json.filter((item: JsonStructure) => item.name !== js.name)
        newJson.push(js)
        setJson(newJson)
        setValue({ name: configElement.name, elements: newJson, id: id })
    }

    return (
        <>
            {configElement.name !== "" ? configElement.name + " : {" : "{"}
            <br />
            {configElement.elements?.map((item: ConfigElement) =>
                <div key={item.name} style={{ paddingLeft: "24px" }}>
                    {
                        item.type === "object" ?
                            <Object configElement={item} setValue={setThisValue} id={id} />
                            :
                            item.type === "list" ?
                                item.elements ?
                                    <ComplexList configElement={item} setValue={setThisValue} id={id} />
                                    :
                                    <SimpleList configElement={item} setValue={setThisValue} id={id} />
                                :
                                item.type === "string" ? <InputString configElement={item} setValue={setThisValue} /> :
                                    item.type === "number" ? <InputNumber configElement={item} setValue={setThisValue} /> :
                                        item.type === "boolean" ? <InputBoolean configElement={item} setValue={setThisValue} /> :
                                            <>{"Type not found"}</>
                    }
                </div>
            )}
            {"}"}
        </>
    )
}