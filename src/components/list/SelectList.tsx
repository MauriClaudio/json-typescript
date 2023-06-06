import { InputProps } from "../../types/ConfigAll"

export const SimpleSelectList = ({ configElement, setValue, id }: InputProps) => {
    return (
        <>
            <select
                onChange={e => setValue!({
                    name: configElement.name,
                    value: e.currentTarget.value,
                    id: id
                })} >
                {configElement.values?.map((value: string) =>
                    <option key={value}>{value}</option>
                )}
            </select>
        </>
    )
}