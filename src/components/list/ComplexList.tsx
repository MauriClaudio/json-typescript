import { useState } from "react"
import { ConfigElement, InputProps, JsonStructure } from "../../types/ConfigAll"
import { Object } from "../Object"
import { SimpleList } from "./SimpleList"

export const ComplexList = ({ configElement, setValue, id }: InputProps) => {
    let n: number = 0
    let baseArray: number[] = []
    while (n < configElement.minListElements!) {
        baseArray.push(n)
        n++
    }

    const [array, setArray] = useState<number[]>(baseArray)
    const [json, setJson] = useState<JsonStructure[]>([])

    const handleAdd = () => {
        let n: number[] = array.slice()
        let lenght: number = array.length ? n[array.length - 1] : 0
        n.push(lenght + 1)
        setArray(n)
        console.log("ADD :", n)
    }

    const handleRemove = (e: any) => {
        let name: string = e.currentTarget.name
        const newArray: number[] = array.filter((item: number) => item !== parseInt(name))
        setArray(newArray)
        console.log("DEL :", newArray)
        if (id !== undefined)
            name = id + "_" + name

        if (json.find((item: JsonStructure) => item.id === name)) {
            const newJson: JsonStructure[] = json.filter((item: JsonStructure) => item.id !== name)
            setJson(newJson)
            if (newJson.length === 0) {
                setValue({ name: configElement.name })
            }
            else {
                setValue({ name: configElement.name, elements: newJson, id: id })
            }
        }
    }

    const setThisValue = (js: JsonStructure) => {
        console.log("to " + configElement.name + " : ", js)
        let newJson: JsonStructure[] = json.slice()
        const index: number = newJson.findIndex((item: JsonStructure) => item.id === js.id && item.name === js.name)
        if (index !== -1) {
            newJson.splice(index, 1)
        }
        if (js.elements || js.value || js.values) {
            newJson.push(js)
        }
        setJson(newJson)
        if (newJson.length === 0) {
            setValue({ name: configElement.name, id: id})
        }
        else {
            setValue({ name: configElement.name, elements: newJson, id: id })
        }
    }

    return (
        <>
            {configElement.name + " : ["}
            {array?.map((item: number) =>
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
            {array.length !== 0 ? <br /> : null}
            {"]"}
        </>
    )
}