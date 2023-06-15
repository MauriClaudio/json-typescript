import { InputProps, JsonStructure } from "../../types/ConfigAll"
import { SimpleRadioList } from "./RadioList"
import { SimpleSelectList } from "./SelectList"
import { SimpleInputList } from "./InputList"
import { SimpleCheckBoxLIst } from "./CheckBoxList"

export const SimpleList = ({ configElement, setValue, id }: InputProps) => {

    const setThisValue = (js: JsonStructure, validity?: boolean) => {
        //console.log(configElement.name + " = ", js)
        setValue(js, validity)
    }

    return (
        <>
            {configElement.name + " : ["}
            {configElement.values ?
                configElement.maxChoose && configElement.maxChoose > 1 
                ||configElement.minChoose && configElement.minChoose > 1 ?
                    <SimpleCheckBoxLIst configElement={configElement} setValue={setThisValue} id={id}/>
                    :
                    configElement.values.length! <= 3 ?
                        <SimpleRadioList configElement={configElement} setValue={setThisValue} id={id}/>
                        :
                        <SimpleSelectList configElement={configElement} setValue={setThisValue} id={id}/>
                :
                <SimpleInputList configElement={configElement} setValue={setThisValue} id={id}/>
            }
            {"]"}
        </>
    )
}