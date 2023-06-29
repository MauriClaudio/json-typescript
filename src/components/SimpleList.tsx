import { useEffect, useState } from "react"

import { InputProps, JsonStructure } from "../types/ConfigAll"
import { SetPath } from "./SetPath"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./redux/ValidityStore"
import { add, del, getThunk, upd, validity } from "./redux/ValiditySlice"

export const SimpleList = ({ configElement, setValue, id, fileValue }: InputProps) => {

    const baseArray: number[] = []
    for (let i: number = 0; i < configElement.minChoose!; i++) { baseArray.push(i) }

    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])

    const [idList, setIdList] = useState<number[]>(baseArray)

    function handleAdd() {
        let newIdList: number[] = idList.slice()
        const idCount: number = idList.length ? newIdList[idList.length - 1] : 0
        const newId: number = idCount + 1
        newIdList.push(newId)
        setIdList(newIdList)
        const jsonValues: string[] = jsonElements.map((item: JsonStructure) => { return item.value! })
        setValue({ name: configElement.name, id: id, values: jsonValues })
        //console.log("ADD :", newIdList)
    }

    const handleRemove = (targetId: string) => {
        targetId = targetId + configElement.name + id
        dispatch(del(targetId))

        const newIdList: number[] = idList.filter((filterId: number) => filterId !== parseInt(targetId))
        setIdList(newIdList)

        const newJsonElements: JsonStructure[] = jsonElements.filter((element: JsonStructure) => element.id !== targetId)

        let newJs: JsonStructure = { name: configElement.name, id: id }
        if (newJsonElements.length !== 0) {
            const jsonValues: string[] = newJsonElements.map((element: JsonStructure) => { return element.value! })
            newJs = { name: configElement.name, values: jsonValues, id: id }
        }

        setJsonElements(newJsonElements)
        setValue(newJs)
        //console.log("DEL :", newIdList)
    }


    function setThisValue(js: JsonStructure) {
        //console.log('to ' + configElement.name + ' :', js)
        const newJsonElements: JsonStructure[] = jsonElements.filter((element: JsonStructure) => element.id !== js.id)
        newJsonElements.push(js)

        setJsonElements(newJsonElements)

        const jsonValues: string[] = newJsonElements.map((item: JsonStructure) => { return item.value || '' })
        setValue({ name: configElement.name, values: jsonValues, id: id })
    }


    const [validity, setValidity] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: true }))
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


    return (
        <div>
            {idList.map((mapId: number) =>
                <div key={mapId.toString()} style={{ paddingLeft: "10px" }} >
                    <SetPath
                        configElement={
                            {
                                name: mapId + "",
                                type: configElement.datatype!,
                                required: configElement.required || configElement.minListElements ? true : false,
                                properties: configElement.properties
                            }}
                        setValue={setThisValue}
                        id={configElement.name + id}
                    />
                    {mapId < configElement.minChoose! ?
                        null
                        :
                        <button
                            name={mapId.toString()}
                            onClick={e => handleRemove(e.currentTarget.name)}
                        > X </button>
                    }
                </div>
            )}
            <button
                onClick={handleAdd}
                disabled={idList.length >= configElement.maxChoose! ? true : false}
            >ADD</button>
            {idList.length !== 0 ? <br /> : null}
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
        </div >
    )
}