export type Validity = {
    name: string
    validity?: boolean
}

export type InputProps = {
    configElement: ConfigElement
    setValue: (js: JsonStructure, validity?: boolean) => void
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
    minChoose?: number
    minListElements?: number
    values?: string[]
    properties?: Properties
    required?: boolean
    states?: States[]
    rurel?: string
}

export type States = {
    groupId: number
    default?: boolean
    condition: string
    values: string[]
}

export type Properties = {
    //autoIncrement?: boolean
    banLetters?: boolean
    banNumbers?: boolean
    banSpecialCharacters?: boolean
    //composition?: Composition[]
    //hide?: boolean
    maxLength?: number
    //maxNumberChoice?: number
    minLength?: number
    //minNumberChoice?: number
    needLetters?: boolean
    needLowerCase?: boolean
    needUpperCase?: boolean
    needNumbers?: boolean
    needSpecialCharacters?: boolean
    onlyLowerCase?: boolean
    onlyPositive?: boolean
    onlyUpperCase?: boolean
    password?: boolean
    //required?: boolean
    //unique?: boolean
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
        onlyPositive?: boolean
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