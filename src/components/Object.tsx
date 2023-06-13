import { useState } from "react"

import { ConfigElement, InputProps, JsonStructure, Validity } from "../types/ConfigAll"
import { ComplexList } from "./list/ComplexList"
import { SimpleList } from "./list/SimpleList"
import { InputBoolean } from "./input/InputBoolean"
import { InputNumber } from "./input/InputNumber"
import { InputString } from "./input/InputString"
//import { Conditioner } from "./Conditioner"

export const Object = ({ configElement, setValue, id }: InputProps) => {

    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])
    const [storedValidity, setStoredValidity] = useState<Validity[]>([])

    const setThisValue = (js: JsonStructure, validity?: boolean) => {

        const newJsonElements: JsonStructure[] = jsonElements.filter((item: JsonStructure) => item.name !== js.name)
        if (js.elements || js.value || js.values) {
            newJsonElements.push(js)
        }

        let newJs: JsonStructure
        if (newJsonElements.length === 0) {
            newJs = { name: configElement.name, id: id }
        }
        else {
            newJs = { name: configElement.name, elements: newJsonElements, id: id }
        }

        const newValidity: Validity[] = storedValidity.filter((item: Validity) => item.name !== js.name)
        newValidity.push({ name: js.name, validity: validity })

        setValue(newJs, newValidity.find((item: Validity) => item.validity === false) ? false : true)

        setStoredValidity(newValidity)
        setJsonElements(newJsonElements)
        //console.log("to " + configElement.name + " : ", js, newValidity)
    }

    return (
        <>
            {configElement.name !== "" ? configElement.name + " : {" : "{"}
            {!storedValidity.find((item: Validity) => item.validity === false) ?
                <div style={{ color: "#006600" }}>Valido</div> : <div style={{ color: "#cc0000" }}>Non Valido</div>}
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
                                            //item.type === "conditionList" ? <Conditioner configElement={item} setValue={setThisValue} id={id} /> :
                                            <>{"Type not found"}</>
                    }
                </div>
            )}
            {"}"}
        </>
    )
}