import { useState } from "react"
import { InputProps } from "../../types/ConfigAll"

export const SimpleSelectList = ({ configElement, setValue, id }: InputProps) => {
    
    const [storedValidity] = useState<boolean>(true)

    const handleOnChange = (e: any) => {
        setValue({
            name: configElement.name,
            value: e.currentTarget.value,
            id: id
        }) 
    }
    
    return (
        <>
            <select
                onChange={handleOnChange} >
                {configElement.values?.map((value: string) =>
                    <option key={value}>{value}</option>
                )}
            </select>
            {storedValidity ? "Valido" : "Non Valido"}
        </>
    )
}