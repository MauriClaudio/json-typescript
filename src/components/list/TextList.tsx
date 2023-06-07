import { useState } from "react"
import { InputProps, JsonStructure } from "../../types/ConfigAll"

export const SimpleTextList = ({ configElement, setValue, id }: InputProps) => {
    const [number, setNumber] = useState<number[]>([])
    const [json, setJson] = useState<JsonStructure[]>([])

    function handleAdd() {
        let n: number[] = number.slice()
        let lenght: number = number.length ? n[number.length - 1] : 0
        n.push(lenght + 1)
        setNumber(n)
        console.log("ADD :", n)
    }

    function handleRemove(e: any) {
        let n: number[] = number.filter((item: number) => item !== parseInt(e.currentTarget.name))
        setNumber(n)
        console.log("DEL :", n)

        if (json.find((item: JsonStructure) => item.id === e.currentTarget.name)) {
            const newJson: JsonStructure[] = json.filter((item: JsonStructure) => item.id !== e.currentTarget.name)
            setJson(newJson)
            if (newJson.length === 0) {
                setValue({ name: configElement.name, id: id })
            }
            else  {
                setValue({ name: configElement.name, elements: newJson, id: id })                
            }
        }
    }

    const setThisValue = (js: JsonStructure) => {
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
        const values: string[] = newJson.map((item: JsonStructure) => { return item.value! })
        setValue({ name: configElement.name, values: values, id: id })
    }

    return (
        <>
            {number.map((n: number) =>
                <div key={n.toString()}>
                    <input type={configElement.datatype}
                        onChange={e => setThisValue({
                            name: configElement.name,
                            value: e.currentTarget.value,
                            id: n + ""
                        })} />
                    <button name={n.toString()} onClick={handleRemove} >X</button>
                </div>
            )}
            <button onClick={handleAdd} disabled={
                number.length >= configElement.maxChoose! ?
                    true : false}>
                ADD</button>
            {number.length !== 0 ? <br /> : null}
        </>
    )
}