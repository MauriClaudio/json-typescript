import { useState } from "react"
import { InputProps } from "../../types/ConfigAll"

export const InputString = ({ configElement, setValue, id }: InputProps) => {

    const [storedValidity, setStoredValidity] = useState<boolean>(!configElement.required)

    const handleOnChange = (e: any) => {
        let value: string = e.currentTarget.value

        if (configElement.properties?.onlyLowerCase) {
            value = value.toLowerCase()
        }
        if (configElement.properties?.onlyUpperCase) {
            value = value.toUpperCase()
        }

        let currentValidity: boolean = true

        if (configElement.required && value === "") {
            currentValidity = false
        }
        if (configElement.properties) {
            if (configElement.properties?.minLength && value.length < configElement.properties.minLength) {
                currentValidity = false
            }
            if (configElement.properties?.needUpperCase && !/[A-Z]/g.test(value)) {
                currentValidity = false
            }
            if (configElement.properties?.needLowerCase && !/[a-z]/g.test(value)) {
                currentValidity = false
            }
            if (configElement.properties?.banLetters && /[a-zA-Z]/g.test(value)) {
                currentValidity = false
            }
            if (configElement.properties?.needLetters && !/[a-zA-Z]/g.test(value)) {
                currentValidity = false
            }
            if (configElement.properties?.banNumbers && /\d+/g.test(value)) {
                currentValidity = false
            }
            if (configElement.properties?.needNumbers && !/\d+/g.test(value)) {
                currentValidity = false
            }
            if (configElement.properties?.banSpecialCharacters && /[!@#$%^&*(),._?":{}|<>=]/g.test(value)) {
                currentValidity = false
            }
            if (configElement.properties?.needSpecialCharacters && !/[!@#$%^&*(),._?":{}|<>=]/g.test(value)) {
                currentValidity = false
            }
        }

        setStoredValidity(currentValidity)

        console.log("input : ", {
            name: configElement.name,
            value: value,
            id: id
        }, currentValidity)

        setValue({
            name: configElement.name,
            value: value,
            id: id
        }, currentValidity)
    }


    return (
        <>
            {configElement.name === "" ? null : configElement.name + " : "} <input
                type={configElement.properties?.password ? "password" : "text"}
                maxLength={configElement.properties?.maxLength}
                onChange={handleOnChange}
                onKeyUp={(e) => {
                    if (configElement.properties?.onlyUpperCase)
                        e.currentTarget.value = e.currentTarget.value.toUpperCase()
                    else if (configElement.properties?.onlyLowerCase)
                        e.currentTarget.value = e.currentTarget.value.toLowerCase()
                }}
            />{storedValidity ? "Valido" : "Non Valido"}
        </>
    )
}