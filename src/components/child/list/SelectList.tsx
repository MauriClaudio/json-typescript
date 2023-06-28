import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { InputProps } from "../../../types/ConfigAll"
import { AppDispatch } from "../../redux/ValidityStore"
import { add } from "../../redux/ValiditySlice"

export const SelectList = ({ configElement, setValue, id }: InputProps) => {

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: true }))
    }, [])

    const handleOnChange = (value: string) => {
        setValue({ name: configElement.name, value: value, id: id })
    }

    return (
        <>
            <select onChange={e => handleOnChange(e.currentTarget.value)}>
                {configElement.values?.map((value: string) =>
                    <option key={value}>{value}</option>
                )}
            </select>
            {
                <div style={{ color: "#006600" }}>Valido</div>
            }
        </>
    )
}