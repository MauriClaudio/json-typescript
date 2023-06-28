import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { InputProps } from "../../../types/ConfigAll"
import { AppDispatch } from "../../redux/ValidityStore"
import { add, upd } from "../../redux/ValiditySlice"

export const InputBoolean = ({ configElement, setValue, id }: InputProps) => {

    const [validity, setValidity] = useState<boolean>(!configElement.required)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [validity])

    const handleOnChange = (checked: boolean) => {
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
                onChange={e => handleOnChange(e.currentTarget.checked)}
            />
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
        </>
    )
}