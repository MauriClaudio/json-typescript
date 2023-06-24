import { useDispatch } from "react-redux"

import { getThunk } from "./ProvaValiditySlice"
import { AppDispatch } from "./ProvaStore"
import { ConfigElement, JsonStructure } from "../types/ConfigAll"
import { ProvaObject } from "./ProvaObject"
import { useState } from "react"
import { ProvaList } from "./ProvaList"

export type props = {
    setFather: (js: JsonStructure) => void
    initialState: ConfigElement
    fatherId: string
}

const EXAMPLE_CONF: ConfigElement = {
    name: '1',
    type: '',
    minListElements: 1,
    elements: [
        {
            name: '1',
            type: 'object',
            elements: [
                {
                    name: '1',
                    type: '',
                    required: true,
                },
                {
                    name: '2',
                    type: '',
                    required: true,
                }
            ]
        },
    ]
}

function App() {

    const [json, setJson] = useState<JsonStructure>()

    const dispatch = useDispatch<AppDispatch>()

    const getObject = async () => {
        console.log('redux', await makeGetCall())
        console.log('json', json)
    }

    const makeGetCall = async () => {
        const prova: any = await dispatch(getThunk())
        return prova.payload.prova
    }

    return (
        <>
            <button onClick={getObject}>GET</button>
            <br />
            {EXAMPLE_CONF.type === 'object' ?
                <ProvaObject initialState={EXAMPLE_CONF} setFather={setJson} fatherId='' />
                :
                <ProvaList initialState={EXAMPLE_CONF} setFather={setJson} fatherId='' />
            }
        </>
    )
}
export default App