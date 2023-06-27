import { useEffect, useState } from "react"
import { InputProps } from "../../../types/ConfigAll"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/ValidityStore"
import { add, upd } from "../../redux/ValiditySlice"

export const InputNumber = ({ configElement, setValue, id }: InputProps) => {

    const [thisValue, setThisValue] = useState<string>('')
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
            if (
                configElement.properties?.onlyPositive && parseInt(value) < 0
                || configElement.properties?.minLength && value.length < configElement.properties.minLength
            ) {
                currentValidity = false
            }
        }

        setValidity(currentValidity)
        setValue({ name: configElement.name, value: thisValue + '', id: id })
    }

    return (
        <>
            {configElement.name === "" ? null : configElement.name + " : "}
            <input
                type="number"
                value={thisValue}
                onChange={e => handleOnChange(e.currentTarget.value)}
                onBeforeInput={(e) => {
                    if (configElement.properties?.maxLength)
                        if (e.currentTarget.value.length >= configElement.properties?.maxLength)
                            e.preventDefault()
                }}
            />
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
        </>
    )
}