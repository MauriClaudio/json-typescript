import { useState } from "react";
import { ConfigElement, InputProps, JsonStructure, States } from "../types/ConfigAll";
import { SimpleList } from "./list/SimpleList";

export const Conditioner = ({ configElement, setValue }: InputProps) => {

    const [rurelValue, setRurelValue] = useState<string>()

    const setThisValue = (js: JsonStructure) => {

    }

    return (
        <>
            {configElement.elements?.map((item: ConfigElement) =>
                <div key={item.name}>
                    {
                        item.states ?
                            //passaggio elements base on value
                            <SimpleList configElement={{ name: item.name, type: "list", values: item.states.find((itemm: States) => itemm.condition === rurelValue)?.values }} setValue={setThisValue} />
                            :
                            //passaggio elements + change value
                            <></>
                    }
                </div>
            )}
        </>
    )
}