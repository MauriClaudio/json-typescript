import { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { AppDispatch } from "./ProvaStore"
import { add, upd,  } from "./ProvaValiditySlice"
import { props } from "./ProvaApp"

export const ProvaInput = ({ initialState, setFather, fatherId }: props,) => {

    const [check, setCheck] = useState<boolean>(false)
    const [validity, setValidity] = useState<boolean>(!initialState.required)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => { 
        dispatch(add({ id: initialState.name + fatherId, fatherId: fatherId, validity: validity }))
    }, [])

    useEffect(()=>{
        //console.log('prova ordine useEffect', initialState.name + ':'+ fatherId)
        dispatch(upd({ id: initialState.name + fatherId, fatherId: fatherId, validity: validity }))     
    },[validity])

    const changeCheck = (checked: boolean) => {
        setCheck(!check)
        let currentValidity: boolean = true

        if (initialState.required && checked === false) { currentValidity = false }
        
        setValidity(currentValidity)
        setFather({ name: initialState.name, value: checked.toString(), id: fatherId })
    }

    return (
        <>
            {initialState.name + ':' + fatherId}
            <input checked={check} onChange={e => changeCheck(e.currentTarget.checked)} type="checkbox" />
            <input checked={validity} readOnly type="checkbox" />
        </>
    )
}