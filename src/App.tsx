/** 
 * Il metodo che ho ipotizzato e che ho iniziato a provare ad inserire per gestire i file in input è:  
 * 
 * Per aggiornare gli input in base al file, l'utilizzo di un nuovo Store di Redux di prova (./components/redux/ValueSlice)
 * che si aggiorna a partine dal componente foglia fino al componente parent grazie agli useEffect.
 * 
 * Mentre la gestione degli errori nel file in input sarebbe divisa in tre : 
 * - se contiene campi non idonei 'SetPath' manda un scritta di errore e questi campi non verrebbero inseriti nel json finale
 * - se i campi 'elements' del file in input contengono elementi che non esistono nella configurazione essi vengono reidirizzati a 'ErrorFile'
 * - se il value non è idoneo la validita iniziale diventa falsa 
 *
 * Questo metodo manca ancora completamente in : SimpleList, InputNumber e tutta la cartella child/list
*/





import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"

import dbconf from "./data/dbconf.json"
import dbconfAll from "./data/dbconfAll.json"
import dbSwitchProva1 from "./data/dbSwitchProva1.json"
import dbSwitchProva2 from "./data/dbSwitchProva2.json"

import { JsonStructure } from "./types/ConfigAll"
import { AppDispatch } from "./components/redux/ValidityStore"
import { getThunk, reset, validity } from "./components/redux/ValiditySlice"
import { SetPath } from "./components/SetPath"
import { getThunkValue, resetValue, value } from "./components/redux/ValueSlice"

function App() {

    const setJsonConfituration = (value: string) => {
        if (value === "dbconf") { return dbconf }
        else if (value === "dbprova1") { return dbSwitchProva1 }
        else if (value === "dbprova2") { return dbSwitchProva2 }
        else return { name: "Error: db not found" }
    }

    const [json, setJson] = useState<JsonStructure>()

    const [conf, setConf] = useState<any>(dbSwitchProva1/*setJsonConfituration(dbconfAll.default)*/)

    const [validity, setValidity] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        setJson({ name: conf.name, elements: [], id: '' })
    }, [conf])

    useEffect(() => {
        updValidity()
        console.log('json :', json)
    }, [json])

    const updValidity = async () => {
        const data: validity[] = await makeGetCall()
        const currentValidity: boolean = data.find((item: validity) => item.validity === false) ? false : true
        setValidity(currentValidity)
    }

    const makeGetCall = async () => {
        const prova: any = await dispatch(getThunk())
        return prova.payload.validity
    }
    const makeGetCallValue = async () => {
        const prova: any = await dispatch(getThunkValue())
        return prova.payload.value
    }
    const getObject = async () => {
        console.log('redux', await makeGetCall())
        console.log("json", json)
        console.log('reduxValue', await makeGetCallValue())
        //console.log("file", fileValue)
    }

    const handleSubmit = async () => {
        console.log("SUBMIT :", json)
        await axios.post("http://localhost:8000/dbdata ", json)
    }

    const handleConfChange = (value: string) => {
        //dispatch(resetValue())
        dispatch(reset())
        setConf(setJsonConfituration(value))
    }

    const [showDownload, setShowDownload] = useState<boolean>(false)
    const [downloadName, setDownloadName] = useState<string>('dbdataDownload')


    const [fileValue, setFileValue] = useState<JsonStructure | undefined>(undefined)

    const getFile = (e: any) => {
        const thisConf:any = document.getElementById("SelectJsonConf")
        handleConfChange(thisConf.value)
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const result: any = e.target?.result
            setFileValue(JSON.parse(result))
        }
    }

    const updLocalValue = async () => {
        const prova: any = await dispatch(getThunkValue())
        const data: value[] = prova.payload.value
        const index: number = data.findIndex((item: value) => item.id === (json!.name))
        setJson(data[index].value)
    }

    useEffect(() => {
        if (fileValue !== undefined) 
        updLocalValue()
        console.log(fileValue)
    }, [fileValue])


    return (
        <>
            <div style={{ display: showDownload ? 'block' : 'none' }}>
                <center>
                    <button onClick={() => setShowDownload(!showDownload)}>X</button>
                    <input placeholder={downloadName} onChange={e => setDownloadName(e.currentTarget.value)} />
                    <a
                        href={'data: application/json;charset=utf-8; ,' + encodeURIComponent(JSON.stringify(json, null, 2))}
                        download={downloadName}
                        target="_blank">
                        <button>download</button>
                    </a>
                </center>
            </div>
            <div style={{ display: showDownload ? 'none' : 'block' }}>
                <select id={"SelectJsonConf"} onChange={e => handleConfChange(e.currentTarget.value)}>
                    {dbconfAll.AllNames.map((item: string) => <option key={item}>{item}</option>)}
                </select>
                <input type="file" onChange={getFile} accept="application/json" />
                <div key={conf.id + fileValue}>
                    <button onClick={getObject}>GET</button>
                    <br /><br />
                    <SetPath
                        configElement={conf}
                        setValue={setJson}
                        id={''}
                        fileValue={fileValue}
                    />
                    <br /><br />
                    <input type="submit" disabled={!validity} onClick={handleSubmit} />
                    <br />
                    <button onClick={() => setShowDownload(!showDownload)}>download</button>
                </div>
            </div>
        </>
    )
}

export default App