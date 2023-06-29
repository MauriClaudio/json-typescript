import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { ConfigElement, InputProps, JsonStructure } from "../types/ConfigAll"
import { add, del, getThunk, upd, validity } from "./redux/ValiditySlice"
import { AppDispatch } from "./redux/ValidityStore"
import { addValue, getThunkValue, value } from "./redux/ValueSlice"
import { SetPath } from "./SetPath"
import { ErrorFile } from "./ErrorFile"

export const ComplexList = ({ configElement, setValue, id, fileValue }: InputProps,) => {

    const errorList: JsonStructure[] = []
    const baseArray: number[] = []
    const lenght: number = (fileValue?.elements?.length!) > configElement.minListElements! ? fileValue?.elements?.length! : configElement.minListElements!
    for (let i: number = 0; i < lenght!; i++) {
        if (fileValue?.elements![i]) {
            if (isNaN(parseInt(fileValue.elements![i].name))) {
                errorList.push(fileValue.elements[i])
                const lastId: number = baseArray.length ? baseArray[baseArray.length - 1] : 0
                const newId: number = lastId + 1
                baseArray.push(newId)
            }
            else {
                baseArray.push(parseInt(fileValue.elements![i].name))
            }
        }
        else {
            const lastId: number = baseArray.length ? baseArray[baseArray.length - 1] : 0
            const newId: number = lastId + 1
            baseArray.push(newId)
        }
    }


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

        let newJs: JsonStructure = { name: configElement.name, id: id, elements: newJsonElements }
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

        let newJs: JsonStructure = { name: configElement.name, id: id, elements: newJsonElements }
        if (newJsonElements.length === 0) { newJs = { name: configElement.name, id: id } }

        setJsonElements(newJsonElements)
        setValue(newJs)
    }


    const [validity, setValidity] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: validity }))
        if (fileValue !== undefined) {
            dispatch(addValue({ id: configElement.name + id, fatherId: id, value: { name: configElement.name, id: id } }))
            updLocalValue()
        }
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

    const updLocalValue = async () => {
        const prova: any = await dispatch(getThunkValue())
        const data: value[] = prova.payload.value
        const index: number = data.findIndex((item: value) => item.id === (configElement.name + id))
        setJsonElements(data[index].value.elements!)
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
                            <SetPath
                                setValue={setThisValue}
                                configElement={{ name: item + '', type: 'object', elements: configElement.elements }}
                                id={configElement.name + id}
                                listUtils={item + ''}
                                fileValue={fileValue?.elements?.find((element: JsonStructure) => item + '' === element.name)}
                            />
                            {configElement.minListElements && idList.length <= configElement.minListElements ?
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
            {errorList?.map((item: JsonStructure) =>
                <div key={item.name} style={{ paddingLeft: "24px" }}>
                    <ErrorFile
                        setValue={setThisValue}
                        id={configElement.name + id}
                        fileValue={item}
                    />
                </div>
            )}
            <button onClick={handleAdd}>ADD</button>
            {idList.length !== 0 ? <div>{']'}</div> : ']'}
        </>
    )
}