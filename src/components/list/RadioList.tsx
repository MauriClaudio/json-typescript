import { InputProps } from "../../types/ConfigAll"

export const SimpleRadioList = ({ configElement, setValue, id}: InputProps) => {
    
    return (
        <>
            {configElement.values?.map((value: string) =>
                <div key={value}>
                    <input type="radio" name={configElement.name + id} id={configElement.name + id}
                        value={value}
                        onChange={e => setValue!({
                            name: configElement.name,
                            value: value,
                            id: id
                        })}
                    />
                    {value}
                </div>
            )}
        </>
    )
}