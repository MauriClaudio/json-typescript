import { useState } from "react"
import { InputProps } from "../../types/ConfigAll"

export const InputNumber = ({ configElement, setValue, id }: InputProps) => {

    const [storedValidity, setStoredValidity] = useState<boolean>(!configElement.required)

    const handleOnChange = (e: any) => {
        const value: string = e.currentTarget.value

        let currentValidity: boolean = true

        if (configElement.required && value === "") {
            currentValidity = false
        }
        else if (!configElement.required && value === "") {
            currentValidity = true
        }
        else if (configElement.properties) {
            if (
                configElement.properties?.onlyPositive && parseInt(value) < 0
                || configElement.properties?.minLength && value.length < configElement.properties.minLength
            ) {
                currentValidity = false
            }
        }

        console.log("input : ", {
            name: configElement.name,
            value: e.currentTarget.value,
            id: id
        }, currentValidity)

        setValue({
            name: configElement.name,
            value: e.currentTarget.value,
            id: id
        }, currentValidity)
        setStoredValidity(currentValidity)
    }

    return (
        <>
            {configElement.name === "" ? null : configElement.name + " : "}
            <input
                id={configElement.name + storedValidity + id}
                type="number"
                onChange={handleOnChange}
                onBeforeInput={(e) => {
                    if (configElement.properties?.maxLength)
                        if (e.currentTarget.value.length >= configElement.properties?.maxLength)
                            e.preventDefault()
                }}
            />
            {storedValidity ? <div style={{ color: "#006600" }}>Valido</div> : <div style={{ color: "#cc0000" }}>Non Valido</div>}
        </>
    )
}