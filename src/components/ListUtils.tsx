import { useEffect, useState } from "react"

import { ConfigElement, InputProps, JsonStructure } from "../types/ConfigAll"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./redux/ValidityStore"
import { add, getThunk, upd, validity } from "./redux/ValiditySlice"
import { SetPath } from "./SetPath"

export const ListUtils = ({ configElement, setValue, id }: InputProps) => {

    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])

    const setThisValue = async (js: JsonStructure) => {
        //console.log("to " + configElement.name + " : ", js)
        const newJsonElements: JsonStructure[] = jsonElements.filter((item: JsonStructure) => item.name !== js.name)

        if (js.elements || js.value || js.values) { newJsonElements.push(js) }

        let newJs: JsonStructure

        if (newJsonElements.length === 0) { newJs = { name: configElement.name, id: configElement.name } }
        else { newJs = { name: configElement.name, elements: newJsonElements, id: configElement.name } }

        setJsonElements(newJsonElements)
        setValue(newJs)
    }


    const [validity, setValidity] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: true }))
        updValidity()
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

    return (
        <div>
            {configElement.name !== "" ? configElement.name + " : {" : "{"}
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
            <br />
            {configElement.elements?.map((item: ConfigElement) =>
                <div key={item.name} style={{ paddingLeft: "24px" }}>
                    <SetPath
                        setValue={setThisValue}
                        configElement={item}
                        id={configElement.name + id}
                    />
                </div>
            )}
            {"}"}
        </div>
    )
}