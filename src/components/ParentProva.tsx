import { ConfigElement } from "../types/ConfigAll";
import { ChildProva } from "./ChildProva";

type props = {
    configAll: ConfigElement[]
    set: (command: string, path: string, value: boolean) => void
    path: string
}

export const ParentProva = ({ configAll, set, path }: props) => {
    return (
        <>
            {configAll?.map((item: ConfigElement) =>
                <ChildProva key={item.name} configAll={item} set={set} path={path} />
            )}
        </>
    )
}