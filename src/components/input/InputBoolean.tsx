import { useState } from "react"
import { InputProps } from "../../types/ConfigAll"

export const InputBoolean = ({ configElement, setValue }: InputProps) => {

    const [storedValidity, setStoredValidity] = useState<boolean>(!configElement.required)

    const handleOnChange = (e: any) => {
        setValue({
            name: configElement.name,
            value: e.currentTarget.checked.toString()
        })

        let currentValidity: boolean = true

        if (configElement.required) {
            if (e.currentTarget.checked === false) {
                currentValidity = false
            }
        }
        setStoredValidity(currentValidity)
    }
    return (
        <>
            {configElement.name + " : "}<input type="checkbox"
                onChange={handleOnChange
                } />
            {storedValidity ? "Valido" : "Non Valido"}
        </>
    )
}