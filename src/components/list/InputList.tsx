import { useState } from "react"

import { InputProps, JsonStructure } from "../../types/ConfigAll"
import { InputString } from "../input/InputString"
import { InputNumber } from "../input/InputNumber"

export const SimpleInputList = ({ configElement, setValue, id }: InputProps) => {

    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])
    const [idList, setIdList] = useState<number[]>([])


    function handleAdd() {
        let newIdList: number[] = idList.slice()
        const idCount: number = idList.length ? newIdList[idList.length - 1] : 0
        const newId: number = idCount + 1
        newIdList.push(newId)
        setIdList(newIdList)
        //
        console.log("ADD :", newIdList)
    }


    function handleRemove(e: any) {
        const targetId: string = e.currentTarget.name
        let newIdList: number[] = idList.filter((filterId: number) => filterId !== parseInt(targetId))
        setIdList(newIdList)
        //
        console.log("DEL :", newIdList)

        if (jsonElements.find((element: JsonStructure) => element.id === targetId)) {
            let newJsonElements: JsonStructure[] = jsonElements.filter((element: JsonStructure) => element.id !== targetId)
            setJsonElements(newJsonElements)

            if (newJsonElements.length === 0) {
                setValue({ name: configElement.name, id: id })
            }
            else {
                const jsonValues: string[] = newJsonElements.map((element: JsonStructure) => { return element.value! })
                setValue({ name: configElement.name, values: jsonValues, id: id })
                //handleValidity(jsonValues, e.currentTarget.name)
            }
        }
    }


    function setThisValue (js: JsonStructure) {
        let newJsonElements: JsonStructure[] = jsonElements.filter((element: JsonStructure) => element.id !== js.id)
        newJsonElements.push(js)
        setJsonElements(newJsonElements)

        const jsonValues: string[] = newJsonElements.map((item: JsonStructure) => { return item.value! })
        setValue({ name: configElement.name, values: jsonValues, id: id })
        //handleValidity(values, js.id!)
    }


    return (
        <>
            {idList.map((mapId: number) =>
                <div key={mapId.toString()}>
                    {
                        configElement.datatype === "text" ?
                            <InputString
                                configElement={
                                    {
                                        name: "",
                                        type: configElement.datatype,
                                        properties: configElement.properties
                                    }}
                                setValue={setThisValue}
                                id={mapId.toString()}
                            />
                            :
                            configElement.datatype === "number" ?
                                <InputNumber
                                    configElement={
                                        {
                                            name: "",
                                            type: configElement.datatype,
                                            properties: configElement.properties
                                        }}
                                    setValue={setThisValue}
                                    id={mapId.toString()}
                                />
                                :
                                <>{"Type not found"}</>
                    }
                    <button
                        name={mapId.toString()}
                        onClick={handleRemove}
                    > X </button>
                </div>
            )}
            <button
                onClick={handleAdd}
                disabled={
                    idList.length >= configElement.maxChoose! ?
                        true : false
                }
            >ADD</button>
            {idList.length !== 0 ? <br /> : null}
            {
                //storedValidity ? "Valido" : "Non Valido"
            }
        </>
    )
}


/** *
type koko = {
    validity: boolean
    id: string
}
/** */


/** *
const [storedValidity, setStoredValidity] = useState<boolean>(
    !(
        configElement.required
        ||
        (configElement.minChoose ? configElement.minChoose > 0 : false)
    )
)
/** */

    //const [storedArrayValidity, setStoredArrayValidity] = useState<koko[]>([])







/**
const handleValidity = (values: string[], id: string) => {

    let currentValidty: boolean = true
    if (configElement.minChoose) {
        if (values.length < configElement.minChoose) {
            currentValidty = false
        }
    }
    if (configElement.required) {
        if (values.length < 1) {
            currentValidty = false
        }
    }
    setStoredValidity(currentValidty)
}
/**/
