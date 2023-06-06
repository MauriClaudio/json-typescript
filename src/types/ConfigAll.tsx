export type InputProps = {
    configElement: ConfigElement
    setValue: (js: JsonStructure) => void
    id?: string
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

    datatype?: string
    elements?: ConfigElement[]
    maxChoose?: number
    minListElements?: number
    values?: string[]
}

//OLD TYpE



/*
    body?: string
    unique?: boolean
    required?: boolean
    composition?: Composition[]
    properties?: Properties
*/



/*
export type Composition = {
    name: string
    elements: elemento[]
}

export type elemento = {
    type: string
}

export type Properties = {
    //autoIncrement?: boolean
    banLetters?: boolean
    banNumbers?: boolean
    banSpecialCharacters?: boolean
    //composition?: Composition[]
    hide?: boolean
    maxLength?: number
    maxNumberChoice?: number
    minLength?: number
    minNumberChoice?: number
    needLetters?: boolean
    needLowerCase?: boolean
    needUpperCase?: boolean
    needNumbers?: boolean
    needSpecialCharacters?: boolean
    onlyLowerCase?: boolean
    onlyPosotive?: boolean
    onlyUpperCase?: boolean
    password?: boolean
    required?: boolean
    unique?: boolean
}
/*
export type ConfigElement_ = {
    name: string
    type: string

    required?: boolean
    minNumberOnList?: number

    body?: string
    datatype?: string
    defaultValue?: any
    elements?: ConfigElement[]
    values?: Values[]

    properties?:
    {
        autoIncrement?: boolean
        banLetters?: boolean
        banNumbers?: boolean
        banSpecialCharacters?: boolean  
        composition?: Composition[]
        hide?: boolean
        maxLength?: number
        maxNumberChoice?: number
        minLength?: number
        minNumberChoice?: number
        needLetters?: boolean
        needNumbers?: boolean
        needSpecialCharacters?: boolean
        onlyLetters?: boolean
        onlyNumbers?: boolean
        onlyLowercase?: boolean
        onlyPosotive?: boolean
        onlyUpperCase?: boolean
        password?: boolean
        required?: boolean
        unique?: boolean
    }
}


export type ConfigMaster = {
    mastertype: string
    elements: ConfigElement[]
}
*/