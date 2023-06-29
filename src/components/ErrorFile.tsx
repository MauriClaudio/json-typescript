import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { JsonStructure } from "../types/ConfigAll"
import { AppDispatch } from "./redux/ValidityStore"
import { add, del } from "./redux/ValiditySlice"

type props = {
    setValue: (js: JsonStructure, validity?: boolean) => void
    id: string
    listUtils?: string
    fileValue: JsonStructure
}

export const ErrorFile = ({ setValue, id, listUtils, fileValue }: props) => {

    const [isDeleted, setIsDeleted] = useState<boolean>(false)

    const setThisValue = () => {
        setIsDeleted(true)
        dispatch(del(fileValue.name + id))
        setValue({ name: fileValue.name, id: listUtils ? listUtils : id })
    }

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: fileValue.name + id, fatherId: id, validity: false }))
    }, [])

    return (
        <div>
            {fileValue.name + " : "}
            {isDeleted ?
                <div style={{ color: "#006600" }}>
                    {"elemento CANCELLATO."}
                </div>
                :
                <div style={{ color: "#cc0000" }}>
                    {"errore, questo elemento non fa parte della configurazione, ELIMINARLO ?"}
                    <button onClick={setThisValue} >CONFERMA</button>
                </div>
            }
        </div>
    )
}