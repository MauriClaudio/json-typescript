import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { InputProps } from "../../../types/ConfigAll"
import { AppDispatch } from "../../redux/ValidityStore"
import { add, upd } from "../../redux/ValiditySlice"
import { addValue } from "../../redux/ValueSlice"

export const InputString = ({ configElement, setValue, id, fileValue }: InputProps) => {

    const [string, setStirng] = useState<string>(fileValue?.value ? fileValue.value : '')

    const [validity, setValidity] = useState<boolean>(
        fileValue?.value ?
            configElement.required === true && fileValue?.value === "" ?
                false
                :
                configElement.properties ?
                    (configElement.properties?.minLength && fileValue.value.length < configElement.properties.minLength)
                        || (configElement.properties?.needUpperCase && !/[A-Z]/g.test(fileValue.value))
                        || (configElement.properties?.needLowerCase && !/[a-z]/g.test(fileValue.value))
                        || (configElement.properties?.banLetters && /[a-zA-Z]/g.test(fileValue.value))
                        || (configElement.properties?.needLetters && !/[a-zA-Z]/g.test(fileValue.value))
                        || (configElement.properties?.banNumbers && /\d+/g.test(fileValue.value))
                        || (configElement.properties?.needNumbers && !/\d+/g.test(fileValue.value))
                        || (configElement.properties?.banSpecialCharacters && /[!@#$%^&*(),._?":{}|<>=]/g.test(fileValue.value))
                        || (configElement.properties?.needSpecialCharacters && !/[!@#$%^&*(),._?":{}|<>=]/g.test(fileValue.value)) ?
                        false
                        :
                        true
                    :
                    true
            :
            !configElement.required
    )

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: validity }))
        if (fileValue !== undefined) {
            dispatch(addValue({ id: configElement.name + id, fatherId: id, value: { name: configElement.name, value: string, id: id } }))
        }
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [validity])

    const handleOnChange = (value: string) => {
        setStirng(value)
        let currentValidity: boolean = true

        if (configElement.required && value === "") {
            currentValidity = false
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
        setValue({ name: configElement.name, value: value, id: configElement.name + id })
    }

    return (
        <>
            {configElement.name + " : "}
            <input
                value={string}
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