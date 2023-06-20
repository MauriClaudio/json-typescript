import { useDispatch } from "react-redux"
import { add, del, provaAsync } from "./ProvaRedux/ProvaSlice"
import { AppDispatch } from "./ProvaRedux/ProvaStore"

const INPUT_ID = "input"

function App() {
    const dispatch = useDispatch<AppDispatch>()

    const generateSlice = () => {
        const e: any = document.getElementById(INPUT_ID)
        //TODO
    }

    const addObject = () => {
        const e: any = document.getElementById(INPUT_ID)
        dispatch(add(e.value))
    }

    const delObject = () => {
        dispatch(del())
    }

    const getObject = async () => {
        const prova: any = await dispatch(provaAsync())
        console.log(prova.payload.prova)
    }

    return (
        <>
            <button onClick={generateSlice}>GEN</button >
            <input id={INPUT_ID} />
            <button onClick={addObject}>ADD</button >
            <button onClick={delObject}>DEL</button>
            <button onClick={getObject}>GET</button>
        </>
    )
}
export default App

// import { useState } from "react"

// import dbconf from "./data/dbconf.json"
// import dbconfAll from "./data/dbconfAll.json"
// import dbvalidity1 from "./data/dbvalidity1.json"
// import dbvalidity2 from "./data/dbvalidity2.json"
// import { ComplexList } from "./components/list/ComplexList"
// import { SimpleList } from "./components/list/SimpleList"
// import { Object } from "./components/Object"
// import { JsonStructure } from "./types/ConfigAll"

// import axios from "axios"

// function App() {

//     const [json, setJson] = useState<JsonStructure>()

//     const setValue = (js: JsonStructure) => {
//         //console.log("to APP : ", js)
//         if (js.elements || js.value || js.values) {
//             setJson(js)
//             console.log("NEW APP :", js)
//         }
//         else {
//             setJson(undefined)
//             console.log("NEW APP :", undefined)
//         }
//     }

//     const handleSubmit = async () => {
//         console.log("SUBMIT :", json)
//         await axios.post("http://localhost:8000/dbdata ", json)
//     }

//     const handleDbConfChange = (value: string) => {
//         if (json !== undefined) {
//             setJson(undefined)
//         }
//         if (value === "dbconf") {
//             return dbconf
//         }
//         else if (value === "dbvalidity1") {
//             return dbvalidity1
//         }
//         else if (value === "dbvalidity2") {
//             return dbvalidity2
//         }
//         else return { name: "Error: db not found" }
//     }

//     const [conf, setConf] = useState<any>(handleDbConfChange(dbconfAll.default))

//     return (
//         <>
//             {/**/}
//             <select onChange={e => setConf(handleDbConfChange(e.currentTarget.value))}>
//                 {dbconfAll.AllNames.map((item: string) => <option key={item}>{item}</option>)}
//             </select>
//             <br />
//             {conf !== "" ?
//                 conf.mastertype === "list" ?
//                     conf.elements ?
//                         <ComplexList
//                             configElement={conf}
//                             setValue={setValue}
//                             id="1"
//                         />
//                         :
//                         <SimpleList
//                             configElement={conf}
//                             setValue={setValue}
//                             id="1"
//                         />
//                     :
//                     <Object
//                         configElement={conf}
//                         setValue={setValue}
//                         id="1"
//                     />
//                 : null
//             }
//             <br /><br />
//             <input type="submit" onClick={e => handleSubmit()} />
//             <br />
//             <a
//                 href={'data: application/json;charset=utf-8; ,'
//                     + encodeURIComponent(JSON.stringify(json, null, 2))}
//                 download={"dbdataDownload"}
//                 target="_blank">
//                 <button>download</button>
//             </a>
//             {/**/}
//         </>
//     )
// }

// export default App

// /*
// const [configAll, setConfigAll] = useState<ConfigMaster>({ mastertype: "", elements: [] })
// const handleGet = async () => {
// const { data } = await axios.get("http://localhost:8000/config")
// setConfigAll(data)
// }
// useEffect(() => {
// handleGet()
// }, [])
// */