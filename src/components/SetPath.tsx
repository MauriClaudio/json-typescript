import { InputProps } from "../types/ConfigAll"
import { ComplexList } from "./ComplexList"
import { Object } from "./Object"
import { SimpleList } from "./SimpleList"
import { InputBoolean } from "./child/input/InputBoolean"
import { InputNumber } from "./child/input/InputNumber"
import { InputString } from "./child/input/InputString"
import { CheckBoxLIst } from "./child/list/CheckBoxList"
import { RadioList } from "./child/list/RadioList"
import { SelectList } from "./child/list/SelectList"

export const SetPath = ({ configElement, setValue, id }: InputProps) => {
    return (
        <>
            {configElement.type === 'object' ?
                <Object configElement={configElement} setValue={setValue} id={id} />
                :
                configElement.type === 'list' ?
                    configElement.elements ?
                        <ComplexList configElement={configElement} setValue={setValue} id={id} />
                        :
                        <>
                            {configElement.name + " : ["}
                            {configElement.values ?
                                configElement.maxChoose && configElement.maxChoose > 1
                                    || configElement.minChoose && configElement.minChoose > 1 ?
                                    <CheckBoxLIst configElement={configElement} setValue={setValue} id={id} />
                                    :
                                    configElement.values.length! <= 3 ?
                                        <RadioList configElement={configElement} setValue={setValue} id={id} />
                                        :
                                        <SelectList configElement={configElement} setValue={setValue} id={id} />
                                :
                                <SimpleList configElement={configElement} setValue={setValue} id={id} />
                            }
                            {"]"}
                        </>
                    :
                    configElement.type === 'string' ?
                        <InputString configElement={configElement} setValue={setValue} id={id} />
                        :
                    configElement.type === 'number' ?
                        <InputNumber configElement={configElement} setValue={setValue} id={id} />
                        :
                    configElement.type === 'boolean' ?
                        <InputBoolean configElement={configElement} setValue={setValue} id={id} />
                        :
                        <>{'Type not found'}</>
            }
        </>
    )
}