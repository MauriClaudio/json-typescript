import { useEffect, useState } from "react"
import axios from "axios"

import { ConfigMaster, DataArray } from "./types/ConfigAll"
import { ParentProva } from "./components/ParentProva"

function App() {
    const [array, setArray] = useState<DataArray[]>([
        /** 
        { name: "id", value: false, path: "" },
        { name: "name", value: false, path: "" },
        {
            name: "info", value: true, path: "", child: [
                { name: "option", value: false, path: "" },
                {
                    name: "subinfo", value: false, path: "", child: [
                        { name: "Inumber", value: false, path: "" },
                        { name: "version", value: false, path: "" },
                    ]
                },
                { name: "Iname", value: false, path: "" },
            ]
        },
        { name: "check", value: false, path: "" },
        /**/
    ])
    const [configAll, setConfigAll] = useState<ConfigMaster>({ mastertype: "", element: [] })

    const handleGet = async () => {
        const { data } = await axios.get("http://localhost:8000/config")
        setConfigAll(data)
    }
    useEffect(() => {
        handleGet()
    }, [])

    const visualArray = (item: DataArray) => {
        return (
            <>
                {"name : " + item.name + " | value : " + item.value + " | path : " + item.path}
                <input type="checkbox" disabled checked={item.value} />
                {item.child?.map((itemm: DataArray) => <div key={itemm.name} style={{ paddingLeft: "20px" }}>{visualArray(itemm)}</div>)}
            </>
        )
    }

    const recoursiveCreateArray = (path: string[], n: number, oldArray: DataArray[], value: boolean) => {
        n++
        const findItem: DataArray = oldArray.find((item: DataArray) => item.name === path[n])!
        if (findItem) {
            oldArray = recoursiveCreateArray(path, n, findItem.child, value)
        }
        else {
            if (path[n + 1]) {
                const child: DataArray[] = recoursiveCreateArray(path, n, [], value)
                const pathParent = path.slice()
                pathParent.pop()
                const newValue: boolean = !(child.find((item: DataArray) => item.value === false))
                oldArray.push({ name: path[n], value: newValue, path: pathParent.toString(), child: child })
            }
            else {
                oldArray.push({ name: path[n], value: value, path: path.toString(), child: [] })
            }
        }
        return oldArray
    }

    const recoursiveUpdateArray = (path: string[], n: number, oldArray: DataArray[], value: boolean) => {
        n++
        const newArray: DataArray[] = oldArray.map((item: DataArray) => {
            if (item.name === path[n]) {
                let child: DataArray[] = []
                if (path[n + 1]) {
                    child = recoursiveUpdateArray(path, n, item.child, value)
                    if (child.find((items: DataArray) => items.value === false)) {
                        return {
                            ...item,
                            value: false,
                            child: child
                        }
                    }
                    else {
                        return {
                            ...item,
                            value: true,
                            child: child
                        }
                    }
                }
                else {
                    return {
                        ...item,
                        value: value
                    }
                }
            }
            return item
        })
        return newArray
    }

    const set = (command: string, path: string, value: boolean) => {
        console.log("Complete Path : ", path)
        const pathArray: string[] = path.split("|")


        if (command === "ADD") {
            const newArray: DataArray[] = recoursiveCreateArray(pathArray, 0, array, value)
            setArray(newArray)
        }
        else {
            const newArray: DataArray[] = recoursiveUpdateArray(pathArray, 0, array, value)
            setArray(newArray)
        }
        console.log(command + "------------------------------------------")
    }

    return (
        <>
            {configAll?.mastertype === "object" ? "{" : "["}
            <br />
            <ParentProva configAll={configAll.element} set={set} path={""} />
            {configAll?.mastertype === "object" ? "}" : "]"}
            <br />
            <input type="submit"
                disabled={array.find((item: DataArray) => item.value === false) ? true : false}
            />
            {array.map((item: DataArray) => <div key={item.name}>
                {visualArray(item)}
            </div>)}
        </>
    )
}

export default App