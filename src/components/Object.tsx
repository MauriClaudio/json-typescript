import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { ConfigElement, InputProps, JsonStructure } from "../types/ConfigAll"
import { AppDispatch } from "./redux/ValidityStore"
import { add, getThunk, upd, validity } from "./redux/ValiditySlice"
import { SetPath } from "./SetPath"
import { ErrorFile } from "./ErrorFile"
import { addValue, getThunkValue, value } from "./redux/ValueSlice"

export const Object = ({ configElement, setValue, id, listUtils, fileValue }: InputProps) => {

    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])

    const setThisValue = async (js: JsonStructure) => {
        console.log("to " + configElement.name + " :", js)
        const newJsonElements: JsonStructure[] = jsonElements.filter((item: JsonStructure) => item.name !== js.name)

        if (js.elements || js.value || js.values) { newJsonElements.push(js) }

        let newJs: JsonStructure = { name: configElement.name, id: listUtils !== undefined ? listUtils : id, elements: newJsonElements }
        if (newJsonElements.length === 0) { newJs = { name: configElement.name, id: listUtils !== undefined ? listUtils : id } }

        setJsonElements(newJsonElements)
        setValue(newJs)
    }


    const [validity, setValidity] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: true }))
        if (fileValue !== undefined) {
            dispatch(addValue({ id: configElement.name + id, fatherId: id, value: { name: configElement.name, id: id } }))
            updLocalValue()
        }
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: id, validity: true }))
        updValidity()
    }, [jsonElements])

    const updValidity = async () => {
        const prova: any = await dispatch(getThunk())
        const data: validity[] = prova.payload.validity
        const index: number = data.findIndex((item: validity) => item.id === (configElement.name + id))
        setValidity(data[index].validity)
    }


    const updLocalValue = async () => {
        const prova: any = await dispatch(getThunkValue())
        const data: value[] = prova.payload.value
        const index: number = data.findIndex((item: value) => item.id === (configElement.name + id))
        setJsonElements(data[index].value.elements!)
    }

    const errorList: JsonStructure[] = []
    if (fileValue !== undefined) {
        if (fileValue.elements) {
            for (let i = 0; i <= fileValue.elements.length - 1; i++) {
                if (!configElement.elements?.find((item: ConfigElement) => item.name === fileValue.elements![i].name)) {
                    errorList.push(fileValue.elements[i])
                }
            }
        }
    }

    return (
        <div>
            {configElement.name + " : {"}
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
            <br />
            {configElement.elements?.map((item: ConfigElement) =>
                <div key={item.name} style={{ paddingLeft: "24px" }}>
                    <SetPath
                        configElement={item}
                        setValue={setThisValue}
                        id={configElement.name + id}
                        fileValue={fileValue?.elements?.find((element: JsonStructure) => item.name === element.name)}
                    />
                </div>
            )}
            {errorList?.map((item: JsonStructure) =>
                <div key={item.name} style={{ paddingLeft: "24px" }}>
                    <ErrorFile
                        setValue={setThisValue}
                        id={configElement.name + id}
                        fileValue={item}
                    />
                </div>
            )}
            {"}"}
        </div>
    )
}