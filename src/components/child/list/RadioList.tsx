import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { InputProps } from "../../../types/ConfigAll"
import { AppDispatch } from "../../redux/ValidityStore"
import { add, upd } from "../../redux/ValiditySlice"

export const RadioList = ({ configElement, setValue, id }: InputProps) => {

    const [validity, setValidity] = useState<boolean>(!configElement.required)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [validity])

    const handleOnChange = (value: string) => {
        if (!validity) {
            setValidity(true)
        }
        setValue({ name: configElement.name, value: value, id: id })
    }

    return (
        <>
            {configElement.values?.map((value: string) =>
                <div key={value}>
                    <input
                        type="radio"
                        name={configElement.name + id}
                        value={value}
                        onChange={e => handleOnChange(e.currentTarget.value)}
                    />
                    {value}
                </div>
            )}
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
        </>
    )
}