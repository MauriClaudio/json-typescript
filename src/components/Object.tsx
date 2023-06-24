import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { ConfigElement, InputProps, JsonStructure, Validity } from "../types/ConfigAll"
import { ComplexList } from "./list/ComplexList"
import { SimpleList } from "./list/SimpleList"
import { InputBoolean } from "./input/InputBoolean"
import { InputNumber } from "./input/InputNumber"
import { InputString } from "./input/InputString"
import { AppDispatch } from "../ProvaRedux/ProvaStore"
import { add, getThunk, upd, validity } from "../ProvaRedux/ProvaValiditySlice"
//import { Conditioner } from "./Conditioner"

export const Object = ({ configElement, setValue, id }: InputProps) => {

    // useEffect(() => {
    //     setJsonElements([])
    //     setStoredValidity([])
    // }, [configElement])

    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])

    const setThisValue = async (js: JsonStructure) => {
        //console.log("to " + configElement.name + " : ", js)
        const newJsonElements: JsonStructure[] = jsonElements.filter((item: JsonStructure) => item.name !== js.name)

        if (js.elements || js.value || js.values) { newJsonElements.push(js) }

        let newJs: JsonStructure

        if (newJsonElements.length === 0) { newJs = { name: configElement.name, id: id } }
        else { newJs = { name: configElement.name, elements: newJsonElements, id: id } }

        setJsonElements(newJsonElements)
        setValue(newJs)
    }


    const [validity, setValidity] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: '' + id, validity: configElement.validity !== undefined ? configElement.validity : true }))
        updValidity()
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: '' + id, validity: true }))
        updValidity()
    }, [jsonElements])

    const updValidity = async () => {
        const prova: any = await dispatch(getThunk())
        const data: validity[] = prova.payload.prova
        const index: number = data.findIndex((item: validity) => item.id === (configElement.name + id))
        setValidity(data[index].validity)
    }

    return (
        <div>
            {configElement.name !== "" ? configElement.name + " : {" : "{"}
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
            <br />
            {configElement.elements?.map((item: ConfigElement) =>
                <div key={item.name} style={{ paddingLeft: "24px" }}>
                    {item.type === "object" ?
                        <Object
                            configElement={item}
                            setValue={setThisValue}
                            id={configElement.name + id}
                        />
                        :
                        // item.type === "list" ?
                        //     item.elements ?
                        //         <ComplexList configElement={item} setValue={setThisValue} id={id} />
                        //         :
                        //         <SimpleList configElement={item} setValue={setThisValue} id={id} />
                        //     :
                        //     item.type === "string" ? <InputString configElement={item} setValue={setThisValue} id={configElement.name + id} /> :
                        //item.type === "number" ? <InputNumber configElement={item} setValue={setThisValue} id={configElement.name + id} /> :
                        item.type === "boolean" ?
                            <InputBoolean
                                configElement={item}
                                setValue={setThisValue}
                                id={configElement.name + id}
                            />
                            :
                            //item.type === "conditionList" ? <Conditioner configElement={item} setValue={setThisValue} id={id} /> :
                            <>{"Type not found"}</>
                    }
                </div>
            )}
            {"}"}
        </div>
    )
}