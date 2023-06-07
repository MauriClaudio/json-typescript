import { useState } from "react"

import { InputProps } from "../../types/ConfigAll"

export const SimpleCheckBoxLIst = ({ configElement, setValue, id }: InputProps) => {
    const [arrayCheck, setArrayCheck] = useState<string[]>([])

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
        
        if (newCheck.length === 0) {
            setValue({ name: configElement.name, id: id })
        }
        else  {
            setValue({ name: configElement.name, values: newCheck, id: id })                
        }
    }

    return (
        <>
            {configElement.values?.map((value: string) =>
                <div key={value}>
                    <input type="checkbox"
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
        </>
    )
}