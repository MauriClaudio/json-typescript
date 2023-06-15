import { useEffect, useState } from "react"
import { InputProps } from "../../types/ConfigAll"

export const InputBoolean = ({ configElement, setValue, id }: InputProps) => {

    const [storedValidity, setStoredValidity] = useState<boolean>(!configElement.required)

    //useEffect(()=>{setValue({ name: configElement.name, id: id }, !configElement.required)} , [])
    console.log("real bool id :", configElement.name + storedValidity + id)

    const handleOnChange = (e: any) => {

        let currentValidity: boolean = true

        if (configElement.required && e.currentTarget.checked === false) {
            currentValidity = false
        }

        setValue({
            name: configElement.name,
            value: e.currentTarget.checked.toString(),
            id: id
        }, currentValidity)
        setStoredValidity(currentValidity)
    }
    return (
        <>
            {configElement.name + " : "}
            <input
                id={configElement.name + storedValidity + id}
                type="checkbox"
                onChange={handleOnChange}
            />
            {storedValidity ? <div style={{ color: "#006600" }}>Valido</div> : <div style={{ color: "#cc0000" }}>Non Valido</div>}
        </>
    )
}