import { useEffect, useState } from "react"

import { ConfigElement, JsonStructure } from "../types/ConfigAll"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./ProvaStore"
import { add, getThunk, upd, validity } from "./ProvaValiditySlice"
import { ProvaInput } from "./ProvaInput"
import { props } from "./ProvaApp"

export const ProvaObject = ({ initialState, setFather, fatherId }: props,) => {

    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])

    const handleJsonElements = (js: JsonStructure) => {
        //console.log('to ' + initialState.name + ':' + fatherId, js)
        const newJsonElements: JsonStructure[] = jsonElements.filter((item: JsonStructure) => item.name !== js.name)
        
        if (js.elements || js.value || js.values) { newJsonElements.push(js) }

        let newJs: JsonStructure

        if (newJsonElements.length === 0) { newJs = { name: initialState.name, id: fatherId } }
        else { newJs = { name: initialState.name, elements: newJsonElements, id: fatherId } }

        setJsonElements(newJsonElements)
        setFather({ name: initialState.name, id: fatherId, elements: newJsonElements })
    }


    const [validity, setValidity] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: initialState.name + fatherId, fatherId: fatherId, validity: initialState.validity !== undefined ? initialState.validity : true }))
        updValidity()
    }, [])

    useEffect(() => {
        dispatch(upd({ id: initialState.name + fatherId, fatherId: fatherId, validity: true }))
        updValidity()
    }, [jsonElements])

    const updValidity = async () => {
        const prova: any = await dispatch(getThunk())
        const data: validity[] = prova.payload.prova
        const index: number = data.findIndex((item: validity) => item.id === (initialState.name + fatherId))
        setValidity(data[index].validity)
    }

    return (
        <>
            {initialState.name + ':' + fatherId}
            <input checked={validity} readOnly type="checkbox" />
            {initialState.elements?.map((item: ConfigElement) =>
                <div key={item.name} style={{ paddingLeft: "10px" }}>
                    {item.type === 'object' ?
                        <ProvaObject
                            setFather={handleJsonElements}
                            initialState={item}
                            fatherId={initialState.name + fatherId}
                        />
                        :
                        <ProvaInput
                            setFather={handleJsonElements}
                            initialState={item}
                            fatherId={initialState.name + fatherId}
                        />}
                </div>
            )}
        </>
    )
}