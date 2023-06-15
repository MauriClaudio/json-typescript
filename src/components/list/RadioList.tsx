import { useState } from "react"
import { InputProps } from "../../types/ConfigAll"

export const SimpleRadioList = ({ configElement, setValue, id }: InputProps) => {

    const [storedValidity, setStoredValidity] = useState<boolean>(!configElement.required)

    const handleOnChange = (value: string) => {
        setValue({
            name: configElement.name,
            value: value,
            id: id
        })
        setStoredValidity(true)
    }

    return (
        <>
            {configElement.values?.map((value: string) =>
                <div key={value}>
                    <input
                        id={configElement.name + storedValidity + id}
                        type="radio"
                        name={configElement.name + id}
                        value={value}
                        onChange={e => handleOnChange(e.currentTarget.value)}
                    />
                    {value}
                </div>
            )}
            {storedValidity ? <div style={{ color: "#006600" }}>Valido</div> : <div style={{ color: "#cc0000" }}>Non Valido</div>}
        </>
    )
}