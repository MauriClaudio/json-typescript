import { useEffect, useState } from "react"

import { ConfigElement, InputProps, JsonStructure } from "../types/ConfigAll"
import { add, del, getThunk, upd, validity } from "./redux/ValiditySlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./redux/ValidityStore"
import { ListUtils } from "./ListUtils"

export const ComplexList = ({ configElement, setValue, id }: InputProps,) => {

    const baseArray: number[] = []
    for (let i: number = 0; i < configElement.minListElements!; i++) { baseArray.push(i) }

    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])

    const [validity, setValidity] = useState<boolean>(true)

    const [idList, setIdList] = useState<number[]>(baseArray)

    const handleAdd = () => {
        let newIdList: number[] = idList.slice()
        const idCount: number = idList.length ? newIdList[idList.length - 1] : 0
        const newId: number = idCount + 1
        newIdList.push(newId)
        setIdList(newIdList)
        setValue({ name: configElement.name, id: id, elements:jsonElements})
        //console.log("ADD :", newIdList)
    }

    const handleRemove = async (targetId: string) => {
        //delObject(targetId + configElement.name)
        const data: any = await dispatch(getThunk())
        deleteAllChildren(targetId + configElement.name+ id, data.payload.validity)

        const newIdList: number[] = idList.filter((filterId: number) => filterId !== parseInt(targetId))
        setIdList(newIdList)
        console.log("DEL :", newIdList)

        const newJsonElements: JsonStructure[] = jsonElements.filter((element: JsonStructure) => element.id !== targetId)

        //if (newJsonElements.length !== jsonElements.length) {
            setJsonElements(newJsonElements)
            setValue({ name: configElement.name , elements: newJsonElements ,id: id })
        //}

    }

    const deleteAllChildren = (id: string, data: validity[]) => {
        const toDelete: validity | undefined = data.find((item: validity) => item.id === id)
        console.log("id:",id)
        if (toDelete) {
            data.forEach((element: validity) => {
                if (element.fatherId === id) {
                    deleteAllChildren(element.id, data)
                }
            })
            dispatch(del(toDelete.id))
        }
    }

    const handleJsonElements = (js: JsonStructure) => {
        //console.log('to ' + configElement.name + ':' + id, js)
        const newJsonElements: JsonStructure[] = jsonElements.slice()
        const index: number = newJsonElements.findIndex((item: JsonStructure) => item.id === js.id && item.name === js.name)
        if (index !== -1) {
            newJsonElements.splice(index, 1)
        }
        if (js.elements || js.value || js.values) {
            newJsonElements.push(js)
        }

        let newJs: JsonStructure
        if (newJsonElements.length === 0) {
            newJs = { name: configElement.name, id: id }
        }
        else {
            newJs = { name: configElement.name, elements: newJsonElements, id: id }
        }

        setJsonElements(newJsonElements)
        setValue(newJs)
    }

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(add({ id: configElement.name + id, fatherId: id, validity: validity}))
        updValidity()
    }, [])

    useEffect(() => {
        dispatch(upd({ id: configElement.name + id, fatherId: id, validity: true }))
        updValidity()
    }, [jsonElements, idList])

    const updValidity = async () => {
        const prova: any = await dispatch(getThunk())
        const data: validity[] = prova.payload.validity
        const index: number = data.findIndex((item: validity) => item.id === (configElement.name + id))
        setValidity(data[index].validity)
    }

    return (
        <>
            {configElement.name + ': [' }
            {validity ?
                <div style={{ color: "#006600" }}>Valido</div> :
                <div style={{ color: "#cc0000" }}>Non Valido</div>
            }
            {idList?.map((item: number) =>
                <div key={item}>
                    {configElement.elements?.map((element: ConfigElement) =>
                        <div key={element.name} style={{ paddingLeft: "10px" }} >
                            <ListUtils
                                setValue={handleJsonElements}
                                configElement={{ name: item + '', type: '', elements: configElement.elements }}
                                id={configElement.name + id}
                            />
                            {configElement.minListElements &&
                            item >= configElement.minListElements ?
                                null :
                                <button
                                    name={item + ''}
                                    onClick={e => handleRemove(e.currentTarget.name)}
                                >
                                    REMOVE
                                </button> 
                            }
                        </div>
                    )}
                </div>
            )}
            <button onClick={handleAdd}>ADD</button>
            {idList.length !== 0 ? <br /> : null}
            {"]"}
        </>
    )
}
// import { useEffect, useState } from "react"

// import { ConfigElement, InputProps, JsonStructure } from "../../types/ConfigAll"
// import { useDispatch } from "react-redux"
// import { AppDispatch } from "../redux/ValidityStore"
// import { add, del, getThunk, upd, validity } from "../redux/ValiditySlice"
// import { ListUtils } from "../utils/ListUtils"

// export const ComplexList = ({ configElement, setValue, id }: InputProps) => {

//     let baseArray: number[] = []
//     for (let i: number = 0; i < configElement.minListElements!; i++) { baseArray.push(i) }

//     const [idList, setIdList] = useState<number[]>(baseArray)

//     const handleAdd = () => {
//         let newIdList: number[] = idList.slice()
//         const idCount: number = idList.length ? newIdList[idList.length - 1] : 0
//         const newId: number = idCount + 1
//         newIdList.push(newId)
//         setIdList(newIdList)
//         //console.log("ADD :", newIdList)
//     }

//     const handleRemove = (targetId: string) => {
//         const newIdList: number[] = idList.filter((filterId: number) => filterId !== parseInt(targetId))
//         setIdList(newIdList)

//         const newJsonElements: JsonStructure[] = jsonElements.filter((element: JsonStructure) => element.id !== targetId)

//         // if (newJsonElements.length !== jsonElements.length) {

//         //     let newJs: JsonStructure
//         //     if (newJsonElements.length === 0) {
//         //         newJs = { name: configElement.name, id: id }
//         //     }
//         //     else {
//         //         newJs = { name: configElement.name, elements: newJsonElements, id: id }
//         //     }

//         //     setJsonElements(newJsonElements)
//         //     setValue(newJs)
//         // }

//         if (newJsonElements.length !== jsonElements.length) {
//             setJsonElements(newJsonElements)
//             setValue({ name: configElement.name, elements: newJsonElements, id: id })
//         }
        
//         delObject(targetId + configElement.name)
//         //console.log("DEL :", newIdList)
//     }

//     const delObject = async (id: string) => {
//         const data: any = await dispatch(getThunk())
//         deleteAllChildren(id, data.payload.prova)
//     }

//     const deleteAllChildren = (id: string, data: validity[]) => {
//         const toDelete: validity | undefined = data.find((item: validity) => item.id === id)
//         if (toDelete) {
//             data.forEach((element: validity) => {
//                 if (element.id === id) {
//                     deleteAllChildren(element.id, data)
//                 }
//             })
//             dispatch(del(toDelete.id))
//         }
//     }

//     const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])

//     const setThisValue = (js: JsonStructure) => {
//         //console.log("to " + configElement.name + " : ", js)
//         const newJsonElements: JsonStructure[] = jsonElements.slice()
//         const index: number = newJsonElements.findIndex((item: JsonStructure) => item.id === js.id && item.name === js.name)
//         if (index !== -1) {
//             newJsonElements.splice(index, 1)
//         }
//         if (js.elements || js.value || js.values) {
//             newJsonElements.push(js)
//         }

//         let newJs: JsonStructure
//         if (newJsonElements.length === 0) {
//             newJs = { name: configElement.name, id: id }
//         }
//         else {
//             newJs = { name: configElement.name, elements: newJsonElements, id: id }
//         }

//         setJsonElements(newJsonElements)
//         setValue(newJs)
//     }

//     const [validity, setValidity] = useState<boolean>(true)

//     const dispatch = useDispatch<AppDispatch>()

//     useEffect(() => {
//         dispatch(add({ id: configElement.name + id, id: id, validity: configElement.validity !== undefined ? configElement.validity : true }))
//         updValidity()
//     }, [])

//     useEffect(() => {
//         dispatch(upd({ id: configElement.name + id, id: id, validity: true }))
//         updValidity()
//     }, [jsonElements])

//     const updValidity = async () => {
//         const prova: any = await dispatch(getThunk())
//         const data: validity[] = prova.payload.prova
//         const index: number = data.findIndex((item: validity) => item.id === (configElement.name + id))
//         setValidity(data[index].validity)
//     }

//     return (
//         <>
//             {configElement.name + " : ["}
//             {validity ?
//                 <div style={{ color: "#006600" }}>Valido</div> :
//                 <div style={{ color: "#cc0000" }}>Non Valido</div>
//             }
//             {idList?.map((item: number) =>
//                 <div key={item}>
//                     {configElement.elements?.map((element: ConfigElement) =>
//                         <div style={{ paddingLeft: "24px" }} key={element.name}>
//                             <ListUtils
//                                 configElement={{ name: item + '', type: '', elements: configElement.elements }}
//                                 setValue={setThisValue}
//                                 id={configElement.name + id}
//                             />
//                             {item < configElement.minListElements! ?
//                                 null
//                                 :
//                                 <div>
//                                     <button name={item + ''} onClick={e => handleRemove(e.currentTarget.name)}>REMOVE</button>
//                                 </div>
//                             }
//                         </div>
//                     )}
//                 </div>
//             )}
//             <button onClick={handleAdd}>ADD</button>
//             {idList.length !== 0 ? <br /> : null}
//             {"]"}
//         </>
//     )
// }