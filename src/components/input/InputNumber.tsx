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
            if (configElement.properties) {
                if (configElement.properties?.onlyPositive) {
                    if (parseInt(value) < 0) {
                        currentValidity = false
                    }
                }
                if (configElement.properties?.minLength) {
                    if (value.length < configElement.properties.minLength) {
                        currentValidity = false
                    }
                }
            }
        }

        setValue({
            name: configElement.name,
            value: e.currentTarget.value,
            id: id
        })
        setStoredValidity(currentValidity)
        console.log("input : ", {
            name: configElement.name,
            value: e.currentTarget.value,
            id: id
        }, currentValidity)
    }

    return (
        <>
            {configElement.name === "" ? null : configElement.name + " : "} <input type="number"
                onChange={handleOnChange}
                onBeforeInput={(e) => {
                    if (configElement.properties?.maxLength)
                        if (e.currentTarget.value.length >= configElement.properties?.maxLength)
                            e.preventDefault()
                }}
            />
            {
                storedValidity ? "Valido" : "Non Valido"
            }
        </>
    )
}