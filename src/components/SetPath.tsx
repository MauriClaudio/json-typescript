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

export const SetPath = ({ configElement, setValue, id, fileValue, listUtils }: InputProps) => {
    //console.log("id", id)
    const errorSentence: string = "Attenzione: '" + configElement.name + "' contiene campi non idonei, verrano eliminati ("
    return (
        <>
            {configElement.type === 'object' ?
                <>
                    {fileValue !== undefined && (fileValue.value || fileValue.values) ?
                        <div style={{ color: "#cc0000" }}>
                            {errorSentence + "value / values)"}
                        </div> : null}
                    <Object configElement={configElement} setValue={setValue} id={id} fileValue={fileValue} listUtils={listUtils} />
                </>
                :
                configElement.type === 'list' ?
                    configElement.elements ?
                        <>
                            {fileValue !== undefined && (fileValue.value || fileValue.values) ?
                                <div style={{ color: "#cc0000" }}>
                                    {errorSentence + "value / values)"}
                                </div> : null}
                            <ComplexList configElement={configElement} setValue={setValue} id={id} fileValue={fileValue} />
                        </>
                        :
                        <>
                            {configElement.name + " : ["}
                            {configElement.values ?
                                configElement.maxChoose && configElement.maxChoose > 1
                                    || configElement.minChoose && configElement.minChoose > 1 ?
                                    <>
                                        {fileValue !== undefined && (fileValue.value || fileValue.elements) ?
                                            <div style={{ color: "#cc0000" }}>
                                                {errorSentence + "value / elements)"}
                                            </div> : null}
                                        <CheckBoxLIst configElement={configElement} setValue={setValue} id={id} fileValue={fileValue} />
                                    </>
                                    :
                                    configElement.values.length! <= 3 ?
                                        <>
                                            {fileValue !== undefined && (fileValue.value || fileValue.elements) ?
                                                <div style={{ color: "#cc0000" }}>
                                                    {errorSentence + "elements / values)"}
                                                </div> : null}
                                            <RadioList configElement={configElement} setValue={setValue} id={id} fileValue={fileValue} />
                                        </>
                                        :
                                        <>
                                            {fileValue !== undefined && (fileValue.value || fileValue.elements) ?
                                                <div style={{ color: "#cc0000" }}>
                                                    {errorSentence + "elements / values)"}
                                                </div> : null}
                                            <SelectList configElement={configElement} setValue={setValue} id={id} fileValue={fileValue} />
                                        </>
                                :
                                <>
                                    {fileValue !== undefined && (fileValue.value || fileValue.elements) ?
                                        <div style={{ color: "#cc0000" }}>
                                            {errorSentence + "value / elements)"}
                                        </div> : null}
                                    <SimpleList configElement={configElement} setValue={setValue} id={id} fileValue={fileValue} />
                                </>
                            }
                            {"]"}
                        </>
                    :
                    configElement.type === 'string' ?
                        <>
                            {fileValue !== undefined && (fileValue.value || fileValue.elements) ?
                                <div style={{ color: "#cc0000" }}>
                                    {errorSentence + "elements / values)"}
                                </div> : null}
                            <InputString configElement={configElement} setValue={setValue} id={id} fileValue={fileValue} />
                        </>
                        :
                        configElement.type === 'number' ?
                            <>
                                {fileValue !== undefined && (fileValue.value || fileValue.elements) ?
                                    <div style={{ color: "#cc0000" }}>
                                        {errorSentence + "elements / values)"}
                                    </div> : null}
                                <InputNumber configElement={configElement} setValue={setValue} id={id} fileValue={fileValue} />
                            </>
                            :
                            configElement.type === 'boolean' ?
                                <>
                                    {fileValue !== undefined && (fileValue.elements || fileValue.values) ?
                                        <div style={{ color: "#cc0000" }}>
                                            {errorSentence + "elements / values)"}
                                        </div> : null}
                                    <InputBoolean configElement={configElement} setValue={setValue} id={id} fileValue={fileValue} />
                                </>
                                :
                                <>{'Type not found'}</>
            }
        </>
    )
}