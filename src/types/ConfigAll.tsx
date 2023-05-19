export type ConfigElement = {
    name: string
    type: string
    tag: string

    values?: string[]
    children?: ConfigElement[]
    requirements?:
    {
        capsLock?: boolean
        onlyLetters?: boolean
        onlyPosotive?: boolean
        required?: boolean
    }
}

export type ConfigMaster = {
    mastertype: string
    element: ConfigElement[]
}

export type DataArray = {
    name: string
    value: boolean
    child: DataArray[]
    path: string
}