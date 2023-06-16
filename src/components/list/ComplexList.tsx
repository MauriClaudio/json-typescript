import { useEffect, useState } from "react"
import { ConfigElement, InputProps, JsonStructure, Validity } from "../../types/ConfigAll"
import { Object } from "../Object"
import { SimpleList } from "./SimpleList"

export const ComplexList = ({ configElement, setValue, id }: InputProps) => {

    let n: number = 0
    let baseArray: number[] = []
    while (n < configElement.minListElements!) {
        baseArray.push(n)
        n++
    }

    const [idList, setIdList] = useState<number[]>(baseArray)
    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])
    const [storedValidity, setStoredValidity] = useState<Validity[]>([])

    /**
    useEffect(() => {
        //const initialValidity: Validity[] = [{name: "0", validity: false}]

        let nji :number = -1
        const initialValidity: Validity[] = configElement.elements?.map((item: ConfigElement) => {
            nji++
            //console.log("dddffd", item.name + false + nji)
            return {
                name: nji + "",
                validity: document.getElementById("objfalse0") !== null ? false : true
            }
        })!
        setStoredValidity(initialValidity)
        //
        console.log("initial validity", initialValidity)
    }, [])
    /**/

    const handleAdd = () => {
        let newIdList: number[] = idList.slice()
        const idCount: number = idList.length ? newIdList[idList.length - 1] : 0
        const newId: number = idCount + 1
        newIdList.push(newId)
        setIdList(newIdList)
        //
        console.log("ADD :", newIdList)
    }

    const handleRemove = (e: any) => {
        let targetId: string = e.currentTarget.name
        const newIdList: number[] = idList.filter((filterId: number) => filterId !== parseInt(targetId))
        setIdList(newIdList)
        //
        console.log("DEL :", newIdList)

        if (id !== undefined) {
            targetId = id + "_" + targetId
        }

        if (jsonElements.find((element: JsonStructure) => element.id === targetId)) {
            const newJsonElements: JsonStructure[] = jsonElements.filter((element: JsonStructure) => element.id !== targetId)

            let newJs: JsonStructure
            if (newJsonElements.length === 0) {
                newJs = { name: configElement.name, id: id }
            }
            else {
                newJs = { name: configElement.name, elements: newJsonElements, id: id }
            }

            const newValidity: Validity[] = storedValidity.filter((item: Validity) => item.name !== targetId)
            console.log("dfghj", newValidity)
            setValue(newJs, newValidity.find((item: Validity) => item.validity === false) ? false : true)

            setStoredValidity(newValidity)
            setJsonElements(newJsonElements)
        }
    }

    const setThisValue = (js: JsonStructure, validity?: boolean) => {
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
            newJs = { name: configElement.name, id: id }
        }
        else {
            newJs = { name: configElement.name, elements: newJsonElements, id: id }
        }

        const newValidity: Validity[] = storedValidity.filter((item: Validity) => item.name !== "" + js.id)
        newValidity.push({ name: "" + js.id, validity: validity })

        setValue(newJs, newValidity.find((item: Validity) => item.validity === false) ? false : true)

        setStoredValidity(newValidity)
        setJsonElements(newJsonElements)

        //console.log("to " + configElement.name + " : ", js)
    }

    return (
        <>
            {configElement.name + " : ["}
            {!storedValidity.find((item: Validity) => item.validity === false) ?
                <div style={{ color: "#006600" }}>Valido</div> : <div style={{ color: "#cc0000" }}>Non Valido</div>}
            {idList?.map((item: number) =>
                <div key={item}>
                    {configElement.elements?.map((element: ConfigElement) =>
                        <div style={{ paddingLeft: "24px" }} key={item + element.name}>
                            {element.type === "list" ?
                                element.elements ?
                                    <ComplexList configElement={element} setValue={setThisValue} id={id === undefined ? item + "" : id + "_" + item} />
                                    :
                                    <SimpleList configElement={element} setValue={setThisValue} id={id === undefined ? item + "" : id + "_" + item} />
                                :
                                <Object configElement={element} setValue={setThisValue} id={id === undefined ? item + "" : id + "_" + item} />
                            }
                        </div>
                    )}
                    {item < configElement.minListElements! ?
                        null
                        :
                        <div>
                            <button name={item.toString()} onClick={handleRemove}>REMOVE</button>
                        </div>
                    }
                </div>
            )}
            <button onClick={handleAdd}>ADD</button>
            {idList.length !== 0 ? <br /> : null}
            {"]"}
        </>
    )
}