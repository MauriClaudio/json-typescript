import { useEffect, useState } from "react"

import { InputProps } from "../../../types/ConfigAll"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/ValidityStore"
import { add, upd } from "../../redux/ValiditySlice"

export const CheckBoxLIst = ({ configElement, setValue, id }: InputProps) => {
    const [arrayCheck, setArrayCheck] = useState<string[]>([])

    const [validity, setValidity] = useState<boolean>(
        !
        (configElement.required
            ||
            (configElement.minChoose ? configElement.minChoose > 0 : false))
    )

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: id, validity: validity }))
    }, [validity])

    const handleOnChange = (name: string, check: boolean) => {
        let newCheck: string[] = arrayCheck.slice()
        if (check) {
            newCheck.push(name)
        }
        else {
            newCheck = arrayCheck.filter((item: string) => item !== name)
        }
        console.log("check", newCheck)
        setArrayCheck(newCheck)

        let currentValidty: boolean = true
        if (configElement.minChoose) {
            if (newCheck.length < configElement.minChoose) {
                currentValidty = false
            }
        }
        if (configElement.required) {
            if (newCheck.length < 1) {
                currentValidty = false
            }
        }

        if (newCheck.length === 0) {
            setValue({ name: configElement.name, id: id })
        }
        else {
            setValue({ name: configElement.name, values: newCheck, id: id })
        }
        setValidity(currentValidty)
    }

    return (
        <>
            {configElement.values?.map((value: string) =>
                <div key={value}>
                    <input
                        type="checkbox"
                        onChange={e => handleOnChange(value, e.currentTarget.checked)}
                        disabled={
                            arrayCheck.length >= configElement.maxChoose! &&
                                !arrayCheck.find((item: string) =>
                                    item === value) ?
                                true
                                :
                                false
                        }
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