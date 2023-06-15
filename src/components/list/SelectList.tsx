import { useState } from "react"
import { InputProps } from "../../types/ConfigAll"

export const SimpleSelectList = ({ configElement, setValue, id }: InputProps) => {

    const [storedValidity] = useState<boolean>(true)

    const handleOnChange = (e: any) => {
        let currentValidity: boolean = true

        setValue({
            name: configElement.name,
            value: e.currentTarget.value,
            id: id
        }, currentValidity)
    }

    return (
        <>
            <select
                id={configElement.name + storedValidity + id}
                onChange={handleOnChange}
            >
                {configElement.values?.map((value: string) =>
                    <option key={value}>{value}</option>
                )}
            </select>
            {storedValidity ? <div style={{ color: "#006600" }}>Valido</div> : <div style={{ color: "#cc0000" }}>Non Valido</div>}
        </>
    )
}