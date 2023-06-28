export type InputProps = {
    configElement: ConfigElement
    setValue: (js: JsonStructure, validity?: boolean) => void
    id: string
    listUtils?: string
}

export type JsonStructure = {
    name: string
    id?: string
    value?: string
    values?: string[]
    elements?: JsonStructure[]
}

export type ConfigElement = {
    name: string
    type: string

    id?:number
    
    datatype?: string
    elements?: ConfigElement[]
    maxChoose?: number
    minChoose?: number
    minListElements?: number
    values?: string[]
    properties?: Properties
    required?: boolean
}

export type Properties = {
    //autoIncrement?: boolean
    banLetters?: boolean
    banNumbers?: boolean
    banSpecialCharacters?: boolean
    //hide?: boolean
    maxLength?: number
    minLength?: number
    needLetters?: boolean
    needLowerCase?: boolean
    needUpperCase?: boolean
    needNumbers?: boolean
    needSpecialCharacters?: boolean
    onlyLowerCase?: boolean
    onlyPositive?: boolean
    onlyUpperCase?: boolean
    password?: boolean
    //unique?: boolean
}