import { useEffect, useState } from "react"

import { InputProps } from "../../../types/ConfigAll"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/ValidityStore"
import { add, upd } from "../../redux/ValiditySlice"

export const SelectList = ({ configElement, setValue, id }: InputProps) => {

    const [validity, setValidity] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [validity])

    const handleOnChange = (value: string) => {
        setValidity(true)
        setValue({ name: configElement.name, value: value, id: id })
    }


    return (
        <>
            <select onChange={e=>handleOnChange(e.currentTarget.value)}>
                {configElement.values?.map((value: string) =>
                    <option key={value}>{value}</option>
                )}
            </select>
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
        </>
    )
}