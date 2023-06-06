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

    const handleAdd = () => {
        let n: number[] = array.slice()
        let lenght: number = array.length ? n[array.length - 1] : 0
        n.push(lenght + 1)
        setArray(n)
        console.log("ADD :", n)
    }
    const handleRemove = (e: any) => {
        const newArray: number[] = array.filter((item: number) => item !== parseInt(e.currentTarget.name))
        setArray(newArray)
        console.log("DEL :", newArray)

        if (json.find((item: JsonStructure) => item.id === e.currentTarget.name)) {
            const newJson: JsonStructure[] = json.filter((item: JsonStructure) => item.id !== e.currentTarget.name)
            setJson(newJson)
            setValue({ name: configElement.name, elements: newJson, id: id })
        }
    }

    const [json, setJson] = useState<JsonStructure[]>([])

    const setThisValue = (js: JsonStructure) => {
        console.log("to " + configElement.name + " : ", js)
        let newJson: JsonStructure[] = []
        if (json.find((item: JsonStructure) => item.id === js.id && item.name === js.name)) {
            newJson = json.map((item: JsonStructure) => {
                if (item.id === js.id && item.name === js.name) {
                    return js
                }
                return item
            })
        }
        else {
            newJson = json.slice()
            newJson.push(js)
        }
        setJson(newJson)
        setValue({ name: configElement.name, elements: newJson, id: id })
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
                                    <ComplexList configElement={element} setValue={setThisValue} id={id === undefined ? item+"" : id+"_"+item} />
                                    :
                                    <SimpleList configElement={element} setValue={setThisValue} id={id === undefined ? item+"" : id+"_"+item} />
                                :
                                <Object configElement={element} setValue={setThisValue} id={id === undefined ? item+"" : id+"_"+item} />
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