import { InputProps } from "../../types/ConfigAll"

export const InputString = ({ configElement, setValue }: InputProps) => {

    return (
        <>
            {configElement.name + " : "} <input
                //type={configElement.properties?.password ? "password" : "text"}
                //maxLength={configElement.properties?.maxLength}
                onChange={e => setValue({
                    name: configElement.name,
                    value: e.currentTarget.value
                })}
            /*onKeyUp={(e) => {
                if (configElement.properties?.onlyUpperCase)
                    e.currentTarget.value = e.currentTarget.value.toUpperCase()
                else if (configElement.properties?.onlyLowerCase)
                    e.currentTarget.value = e.currentTarget.value.toLowerCase()
            }}*/
            />
        </>
    )
}