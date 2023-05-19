import { useEffect } from "react"
import { ConfigElement } from "../types/ConfigAll"
import { ParentProva } from "./ParentProva"

type props = {
    configAll: ConfigElement
    set: (command: string, path: string, value: boolean) => void
    path: string
}

export const ChildProva = ({ configAll, set, path }: props) => {

    path = path + "|" + configAll.name

    const handleAddObject = () => {
        if (!(configAll.children)) {
            let value: boolean = false
            if (configAll.tag === "select" || !(configAll.requirements?.required)) {
                value = true
            }
            set("ADD", path, value)
        }
    }
    useEffect(() => {
        handleAddObject()
    }, [])

    const handleChangeObject = (e: any) => {
        const value: string = e.currentTarget.value
        if (configAll.requirements) {
            let acceptValue: boolean = true
            if (configAll.requirements.required) {
                if (value === "") {
                    acceptValue = false
                }
            }
            if (configAll.requirements.onlyPosotive) {
                if (parseInt(value) <= 0) {
                    acceptValue = false
                }
            }
            if (configAll.requirements.onlyLetters) {
                if (/[!@#$%^&*(),.?":{}|<>=]/g.test(value) || /\d+/g.test(value)) {
                    acceptValue = false;
                }
            }
            set("CHANGE", path, acceptValue)
        }
        else
            set("CHANGE", path, true)
    }

    return (
        <>
            {configAll.name + " : "}
            {configAll.children ? "[" : "{"}
            {
                configAll.tag === "input" ?
                    configAll.type === "radio" ?
                        configAll.values?.map((item: string) =>
                            <div key={item}>
                                <input type="radio" id={configAll.name} name={configAll.name} value={item} onChange={handleChangeObject} />
                                {item}
                            </div>
                        )
                        :
                        <input type={configAll.type} id={configAll.name} name={configAll.name}
                            min={configAll.requirements?.onlyPosotive ? 0 : undefined}
                            pattern={configAll.requirements?.onlyLetters ? "[A-Za-z]" : undefined}
                            style={
                                configAll.requirements?.capsLock ?
                                    { textTransform: "uppercase" } : {}
                            }
                            onChange={handleChangeObject} />
                    :
                    configAll.tag === "select" ?
                        <select id={configAll.name} onChange={handleChangeObject}>
                            {configAll.values?.map((item: string) =>
                                <option key={item} value={item}>{item}</option>
                            )}
                        </select>
                        :
                        null
            }
            {configAll.children ? null : "}"}
            <br />
            {configAll.children ?
                <div style={{ paddingLeft: "24px" }}>
                    <ParentProva configAll={configAll.children} set={set} path={path} />
                </div>
                : null}
            {configAll.children ?
                <div style={{ paddingLeft: "24px" }}>
                    <button>ADD</button>
                </div>
                : null}
            {configAll.children ? <>{"]"}<br /></> : null}
        </>
    )
}