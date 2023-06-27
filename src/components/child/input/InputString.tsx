import { useEffect, useState } from "react"
import { InputProps } from "../../../types/ConfigAll"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/ValidityStore"
import { add, upd } from "../../redux/ValiditySlice"

export const InputString = ({ configElement, setValue, id }: InputProps) => {

    const [thisValue, setThisValue] = useState<string>()
    const [validity, setValidity] = useState<boolean>(!configElement.required)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [validity])

    const handleOnChange = (value: string) => {
        setThisValue(value)
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

        setValidity(currentValidity)
        setValue({ name: configElement.name, value: thisValue, id: id })
    }

    return (
        <>
            {configElement.name === "" ? null : configElement.name + " : "}
            <input
                type={configElement.properties?.password ? "password" : "text"}
                onChange={e => handleOnChange(e.currentTarget.value)}
                onKeyUp={(e) => {
                    if (configElement.properties?.onlyUpperCase)
                        e.currentTarget.value = e.currentTarget.value.toUpperCase()
                    else if (configElement.properties?.onlyLowerCase)
                        e.currentTarget.value = e.currentTarget.value.toLowerCase()
                }}
                maxLength={configElement.properties?.maxLength}
            />
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
        </>
    )
}