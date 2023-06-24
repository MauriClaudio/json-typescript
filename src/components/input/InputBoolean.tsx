import { useEffect, useState } from "react"
import { InputProps } from "../../types/ConfigAll"
import { AppDispatch } from "../../ProvaRedux/ProvaStore"
import { useDispatch } from "react-redux"
import { add, upd } from "../../ProvaRedux/ProvaValiditySlice"

export const InputBoolean = ({ configElement, setValue, id }: InputProps) => {

    // useEffect(() => {
    //     setCheck(false)
    //     setValidity(!configElement.required)
    // }, [configElement])

    const [check, setCheck] = useState<boolean>(false)
    const [validity, setValidity] = useState<boolean>(!configElement.required)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: '' + id, validity: validity }))
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: '' + id, validity: validity }))
    }, [validity])

    const handleOnChange = (checked: boolean) => {
        setCheck(!check)
        let currentValidity: boolean = true

        if (configElement.required && checked === false) { currentValidity = false }

        setValidity(currentValidity)
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