import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { ConfigElement, InputProps, JsonStructure } from "../types/ConfigAll"
import { add, del, getThunk, upd, validity } from "./redux/ValiditySlice"
import { AppDispatch } from "./redux/ValidityStore"
import { Object } from "./Object"

export const ComplexList = ({ configElement, setValue, id }: InputProps,) => {

    const baseArray: number[] = []
    for (let i: number = 0; i < configElement.minListElements!; i++) { baseArray.push(i) }

    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])

    const [idList, setIdList] = useState<number[]>(baseArray)

    const handleAdd = () => {
        let newIdList: number[] = idList.slice()
        const lastId: number = idList.length ? newIdList[idList.length - 1] : 0
        const newId: number = lastId + 1
        newIdList.push(newId)
        setIdList(newIdList)
        setValue({ name: configElement.name, id: id, elements: jsonElements })
        //console.log("ADD :", newIdList)
    }


    const handleRemove = async (targetId: string) => {
        const data: any = await dispatch(getThunk())
        deleteAllChildren(targetId + configElement.name + id, data.payload.validity)

        const newIdList: number[] = idList.filter((filterId: number) => filterId !== parseInt(targetId))
        setIdList(newIdList)

        const newJsonElements: JsonStructure[] = jsonElements.filter((element: JsonStructure) => element.id !== targetId)

        let newJs: JsonStructure = { name: configElement.name, elements: newJsonElements, id: id }
        if (newJsonElements.length === 0) { newJs = { name: configElement.name, id: id } }

        setJsonElements(newJsonElements)
        setValue(newJs)
        //console.log("DEL :", newIdList)
    }

    const setThisValue = (js: JsonStructure) => {
        //console.log('to ' + configElement.name + ':' + id, js)
        const newJsonElements: JsonStructure[] = jsonElements.slice()
        const index: number = newJsonElements.findIndex((item: JsonStructure) => item.id === js.id && item.name === js.name)

        if (index !== -1) { newJsonElements.splice(index, 1) }

        if (js.elements || js.value || js.values) { newJsonElements.push(js) }

        let newJs: JsonStructure = { name: configElement.name, elements: newJsonElements, id: id }
        if (newJsonElements.length === 0) { newJs = { name: configElement.name, id: id } }

        setJsonElements(newJsonElements)
        setValue(newJs)
    }


    const [validity, setValidity] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: id, validity: true }))
        updValidity()
    }, [jsonElements, idList])

    const updValidity = async () => {
        const prova: any = await dispatch(getThunk())
        const data: validity[] = prova.payload.validity
        const index: number = data.findIndex((item: validity) => item.id === (configElement.name + id))
        setValidity(data[index].validity)
    }

    const deleteAllChildren = (id: string, data: validity[]) => {
        //console.log("id toDelete :",id)
        const toDelete: validity | undefined = data.find((item: validity) => item.id === id)
        if (toDelete) {
            data.forEach((element: validity) => {
                if (element.fatherId === id) {
                    deleteAllChildren(element.id, data)
                }
            })
            dispatch(del(toDelete.id))
        }
    }


    return (
        <>
            {configElement.name + ' : ['}
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
            {idList?.map((item: number) =>
                <div key={item}>
                    {configElement.elements?.map((element: ConfigElement) =>
                        <div key={element.name} style={{ paddingLeft: "10px" }} >
                            <Object
                                setValue={setThisValue}
                                configElement={{ name: item + '', type: '', elements: configElement.elements }}
                                id={configElement.name + id}
                                listUtils={item + ''}
                            />
                            {configElement.minListElements && item < configElement.minListElements ?
                                null
                                :
                                <button
                                    name={item + ''}
                                    onClick={e => handleRemove(e.currentTarget.name)}
                                >REMOVE</button>
                            }
                        </div>
                    )}
                </div>
            )}
            <button onClick={handleAdd}>ADD</button>
            {idList.length !== 0 ? <div>{']'}</div> : ']'}
        </>
    )
}