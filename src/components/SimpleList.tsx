import { useEffect, useState } from "react"

import { InputProps, JsonStructure } from "../types/ConfigAll"
import { SetPath } from "./SetPath"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./redux/ValidityStore"
import { add, del, getThunk, upd, validity } from "./redux/ValiditySlice"

export const SimpleList = ({ configElement, setValue, id }: InputProps) => {

    const baseArray: number[] = []
    for (let i: number = 0; i < configElement.minChoose!; i++) { baseArray.push(i) }


    const [idList, setIdList] = useState<number[]>(baseArray)
    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])
    const [validity, setValidity] = useState<boolean>(true)

    function handleAdd() {
        let newIdList: number[] = idList.slice()
        const idCount: number = idList.length ? newIdList[idList.length - 1] : 0
        const newId: number = idCount + 1
        newIdList.push(newId)
        setIdList(newIdList)
        setValue({ name: configElement.name, id: id, elements: jsonElements })
        //console.log("ADD :", newIdList)
    }

    const handleRemove = (targetId: string) => {
        dispatch(del(targetId + configElement.name + id))

        const newIdList: number[] = idList.filter((filterId: number) => filterId !== parseInt(targetId))
        setIdList(newIdList)
        //console.log("DEL :", newIdList)

        //if (jsonElements.find((element: JsonStructure) => element.id === targetId)) {
        const newJsonElements: JsonStructure[] = jsonElements.filter((element: JsonStructure) => element.id !== targetId)

        // let newJs: JsonStructure
        // if (newJsonElements.length === 0) {
        //     newJs = { name: configElement.name, id: id }
        // }
        // else {
        //     const jsonValues: string[] = newJsonElements.map((element: JsonStructure) => { return element.value! })
        //     newJs = { name: configElement.name, values: jsonValues, id: id }
        // }

        // setJsonElements(newJsonElements)
        // setValue(newJs)

        setJsonElements(newJsonElements)
        setValue({ name: configElement.name, elements: newJsonElements, id: id })
        //}
    }


    function setThisValue(js: JsonStructure) {
        const newJsonElements: JsonStructure[] = jsonElements.filter((element: JsonStructure) => element.id !== js.id)
        newJsonElements.push(js)

        setJsonElements(newJsonElements)

        const jsonValues: string[] = newJsonElements.map((item: JsonStructure) => { return item.value! })
        setValue({ name: configElement.name, values: jsonValues, id: id })
    }

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: validity }))
        updValidity()
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
                                type: configElement.datatype ? configElement.datatype : '',
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
                disabled={
                    idList.length >= configElement.maxChoose! ?
                        true : false
                }
            >ADD</button>
            {idList.length !== 0 ? <br /> : null}
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
        </div >
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
