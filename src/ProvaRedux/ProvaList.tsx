import { useEffect, useState } from "react"

import { ConfigElement, JsonStructure } from "../types/ConfigAll"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./ProvaStore"
import { add, getThunk, upd, validity } from "./ProvaValiditySlice"
import { ProvaObject } from "./ProvaObject"
import { props } from "./ProvaApp"
import { ProvaListUtils } from "./ProvaListUtils"

export const ProvaList = ({ initialState, setFather, fatherId }: props,) => {

    let n: number = 0
    let baseArray: number[] = []
    while (n < initialState.minListElements!) {
        baseArray.push(n)
        n++
    }

    const [idList, setIdList] = useState<number[]>(baseArray)

    const handleAdd = () => {
        let newIdList: number[] = idList.slice()
        const idCount: number = idList.length ? newIdList[idList.length - 1] : 0
        const newId: number = idCount + 1
        newIdList.push(newId)
        setIdList(newIdList)
        //
        console.log("ADD :", newIdList)
    }

    const handleRemove = (targetId: string) => {
        //let targetId: string = e.currentTarget.name
        const newIdList: number[] = idList.filter((filterId: number) => filterId !== parseInt(targetId))
        setIdList(newIdList)
        //
        console.log("DEL :", newIdList)

        if (fatherId !== undefined) {
            targetId = fatherId + "_" + targetId
        }

        if (jsonElements.find((element: JsonStructure) => element.id === targetId)) {
            const newJsonElements: JsonStructure[] = jsonElements.filter((element: JsonStructure) => element.id !== targetId)

            let newJs: JsonStructure
            if (newJsonElements.length === 0) {
                newJs = { name: initialState.name, id: fatherId }
            }
            else {
                newJs = { name: initialState.name, elements: newJsonElements, id: fatherId }
            }

            setJsonElements(newJsonElements)
            setFather(newJs)
        }
    }


    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])

    const handleJsonElements = (js: JsonStructure) => {
        //console.log('to ' + initialState.name + ':' + fatherId, js)
        const newJsonElements: JsonStructure[] = jsonElements.slice()
        const index: number = newJsonElements.findIndex((item: JsonStructure) => item.id === js.id && item.name === js.name)
        if (index !== -1) {
            newJsonElements.splice(index, 1)
        }
        if (js.elements || js.value || js.values) {
            newJsonElements.push(js)
        }

        let newJs: JsonStructure
        if (newJsonElements.length === 0) {
            newJs = { name: initialState.name, id: fatherId }
        }
        else {
            newJs = { name: initialState.name, elements: newJsonElements, id: fatherId }
        }

        setJsonElements(newJsonElements)
        setFather(newJs)
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
            {idList?.map((item: number) =>
                <div key={item}>
                    {initialState.elements?.map((element: ConfigElement) =>
                        <div key={element.name} style={{ paddingLeft: "10px" }}>
                            {element.type === 'object' ?
                                <ProvaListUtils
                                    setFather={handleJsonElements}
                                    initialState={element}
                                    fatherId={item + initialState.name + fatherId}
                                />
                                :
                                null
                            }
                        </div>
                    )}
                    {item >= initialState.minListElements! ?
                        <button
                            name={item.toString()}
                            onClick={e => handleRemove(e.currentTarget.name)}
                        >
                            REMOVE
                        </button> : null
                    }
                </div>
            )}
            <button onClick={handleAdd}>ADD</button>
            {idList.length !== 0 ? <br /> : null}
            {"]"}
        </>
    )
}