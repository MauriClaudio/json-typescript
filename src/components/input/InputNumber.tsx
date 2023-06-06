import { InputProps } from "../../types/ConfigAll"

export const InputNumber = ({ configElement, setValue }: InputProps) => {

    return (
        <>
            {configElement.name + " : "} <input type="number"
                onChange={e => setValue({
                    name: configElement.name,
                    value: e.currentTarget.value
                })}
            /*onBeforeInput={(e) => {
                if (configElement.properties?.maxLength)
                    if (e.currentTarget.value.length >= configElement.properties?.maxLength)
                        e.preventDefault()
            }}*/
            />
        </>
    )
}