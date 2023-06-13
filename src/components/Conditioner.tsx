import { useState } from "react";
import { ConfigElement, InputProps, JsonStructure, States } from "../types/ConfigAll";
import { SimpleList } from "./list/SimpleList";

export const Conditioner = ({ configElement, setValue, id }: InputProps) => {

    const [rurelValue, setRurelValue] = useState<string>()
    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])

    const setThisValue = (js: JsonStructure) => {
        const rurelName: string = configElement.elements?.find((element: ConfigElement) => !element.states)?.name!
        console.log("rurelName", rurelName)
        if (rurelName === js.name) {
            setRurelValue(js.value!)
            console.log("rurelValue", rurelValue)
        }
        
        const newJsonElements: JsonStructure[] = jsonElements.filter((item: JsonStructure) => item.name !== js.name)
        if (js.elements || js.value || js.values) {
            newJsonElements.push(js)
        }
        setJsonElements(newJsonElements)

        if (newJsonElements.length === 0) {
            setValue({ name: configElement.name, id: id })
        }
        else {
            setValue({ name: configElement.name, elements: newJsonElements, id: id })
        }
        //
        console.log("to " + configElement.name + " : ", js)

    }

    return (
        <>
            {configElement.elements?.map((item: ConfigElement) =>
                <div key={item.name}>
                    {
                        item.states ?
                            //passaggio elements base on value
                            item.states.find((itemm: States) => itemm.condition === rurelValue) ?
                                <SimpleList
                                    configElement={{
                                        name: item.name,
                                        type: "list",
                                        required: item.required,
                                        values: item.states.find((itemm: States) =>
                                            itemm.condition === rurelValue)?.values
                                    }}
                                    setValue={setThisValue} />
                                :
                                <SimpleList
                                    configElement={{
                                        name: item.name,
                                        type: "list",
                                        required: item.required,
                                        values: item.states.find((itemm: States) =>
                                            itemm.default)?.values
                                    }}
                                    setValue={setThisValue} />
                            :
                            //passaggio elements + change value
                            <SimpleList configElement={item} setValue={setThisValue} />
                    }
                </div>
            )}
        </>
    )
}