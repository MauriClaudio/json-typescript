import { useState } from "react"
import { InputProps } from "../../types/ConfigAll"

export const InputString = ({ configElement, setValue, id }: InputProps) => {

    const [storedValidity, setStoredValidity] = useState<boolean>(!configElement.required)

    const handleOnChange = (e: any) => {
        let value: string = e.currentTarget.value

        let currentValidity: boolean = true

        if (configElement.required && value === "") {
            currentValidity = false
        }
        else if (!configElement.required && value === "") {
            currentValidity = true
        }
        else if (configElement.properties) {

            if (configElement.properties?.onlyLowerCase) {
                value = value.toLowerCase()
            }
            else if (configElement.properties?.onlyUpperCase) {
                value = value.toUpperCase()
            }

            if (
                (configElement.properties?.minLength && value.length < configElement.properties.minLength)
                || (configElement.properties?.needUpperCase && !/[A-Z]/g.test(value))
                || (configElement.properties?.needLowerCase && !/[a-z]/g.test(value))
                || (configElement.properties?.banLetters && /[a-zA-Z]/g.test(value))
                || (configElement.properties?.needLetters && !/[a-zA-Z]/g.test(value))
                || (configElement.properties?.banNumbers && /\d+/g.test(value))
                || (configElement.properties?.needNumbers && !/\d+/g.test(value))
                || (configElement.properties?.banSpecialCharacters && /[!@#$%^&*(),._?":{}|<>=]/g.test(value))
                || (configElement.properties?.needSpecialCharacters && !/[!@#$%^&*(),._?":{}|<>=]/g.test(value))
            ) {
                currentValidity = false
            }
        }

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
        setStoredValidity(currentValidity)
    }

    return (
        <>
            {configElement.name === "" ? null : configElement.name + " : "}
            <input
                id={configElement.name + storedValidity + id}
                type={configElement.properties?.password ? "password" : "text"}
                onChange={handleOnChange}
                onKeyUp={(e) => {
                    if (configElement.properties?.onlyUpperCase)
                        e.currentTarget.value = e.currentTarget.value.toUpperCase()
                    else if (configElement.properties?.onlyLowerCase)
                        e.currentTarget.value = e.currentTarget.value.toLowerCase()
                }}
                maxLength={configElement.properties?.maxLength}
            />
            {storedValidity ? <div style={{ color: "#006600" }}>Valido</div> : <div style={{ color: "#cc0000" }}>Non Valido</div>}
        </>
    )
}