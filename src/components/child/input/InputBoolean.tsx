import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { InputProps } from "../../../types/ConfigAll"
import { AppDispatch } from "../../redux/ValidityStore"
import { add, upd } from "../../redux/ValiditySlice"
import { addValue } from "../../redux/ValueSlice"

export const InputBoolean = ({ configElement, setValue, id, fileValue }: InputProps) => {

    const [check, setCheck] = useState<boolean>(fileValue?.value === "true")

    const [validity, setValidity] = useState<boolean>(configElement.required === true ? fileValue?.value === "true" : true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: validity }))
        if (fileValue !== undefined) {
            dispatch(addValue({ id: configElement.name + id, fatherId: id, value: { name: configElement.name, value: check.toString(), id: id } }))
        }
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [validity])

    const handleOnChange = (checked: boolean) => {
        setCheck(!check)
        if (configElement.required) {
            setValidity(checked)
        }
        setValue({ name: configElement.name, value: checked.toString(), id: id })
    }

    return (
        <>
            {configElement.name + " : "}
            <input
                type="checkbox"
                checked={check}
                onChange={e => handleOnChange(e.currentTarget.checked)}
            />
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
        </>
    )
}