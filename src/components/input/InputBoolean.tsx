import { InputProps } from "../../types/ConfigAll"

export const InputBoolean = ({ configElement, setValue }: InputProps) => {

    return (
        <>
            {configElement.name + " : "}<input type="checkbox"
                onChange={e =>
                    setValue({
                        name: configElement.name,
                        value: e.currentTarget.checked.toString()
                    })
                } />
        </>
    )
}