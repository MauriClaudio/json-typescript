import { useState } from "react"

import { ConfigElement, InputProps, JsonStructure } from "../types/ConfigAll"
import { ComplexList } from "./list/ComplexList"
import { SimpleList } from "./list/SimpleList"
import { InputBoolean } from "./input/InputBoolean"
import { InputNumber } from "./input/InputNumber"
import { InputString } from "./input/InputString"
import { Conditioner } from "./Conditioner"

export const Object = ({ configElement, setValue, id }: InputProps) => {

    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])
    //const [storedValidity, setStoredValidity] = useState<boolean>()

    const setThisValue = (js: JsonStructure) => {

        const newJsonElements: JsonStructure[] = jsonElements.filter((item: JsonStructure) => item.name !== js.name)
        if (js.elements || js.value || js.values) {
            newJsonElements.push(js)
        }
        setJsonElements(newJsonElements)

        if (newJsonElements.length === 0) {
            setValue({ name: configElement.name, id: id })
        }
        else {
            setValue({ name: configElement.name, elements: newJsonElements, id: id })
        }
        //
        console.log("to " + configElement.name + " : ", js)
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
                                            item.type === "conditionList" ? <Conditioner configElement={item} setValue={setThisValue} /> :
                                                <>{"Type not found"}</>
                    }
                </div>
            )}
            {"}"}
            {
                //storedValidity ? "Valido" : "Non Valido"
            }
        </>
    )
}