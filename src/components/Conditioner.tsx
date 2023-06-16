import { useState } from "react";
import { ConfigElement, InputProps, JsonStructure, States } from "../types/ConfigAll";
import { SimpleList } from "./list/SimpleList";

export const Conditioner = ({ configElement, setValue, id }: InputProps) => {

    const [rurelValue, setRurelValue] = useState<string>()
    const [jsonElements, setJsonElements] = useState<JsonStructure[]>([])

    const setThisValue = (js: JsonStructure) => {
        const rurelName: string = configElement.elements?.find((element: ConfigElement) => !element.states)?.name!
        console.log("rurelName", rurelName)
        if (rurelName === js.name) {
            setRurelValue(js.value!)
            console.log("rurelValue", rurelValue)
        }
        
        const newJsonElements: JsonStructure[] = jsonElements.filter((item: JsonStructure) => item.name !== js.name)
        if (js.elements || js.value || js.values) {
            newJsonElements.push(js)
        }
        setJsonElements(newJsonElements)

        if (newJsonElements.length === 0) {
            setValue({ name: configElement.name, id: id })
        }
        else {
            setValue({ name: configElement.name, elements: newJsonElements, id: id })
        }
        //
        console.log("to " + configElement.name + " : ", js)

    }

    return (
        <>
            {configElement.elements?.map((item: ConfigElement) =>
                <div key={item.name}>
                    {
                        item.states ?
                            //passaggio elements base on value
                            item.states.find((itemm: States) => itemm.condition === rurelValue) ?
                                <SimpleList
                                    configElement={{
                                        name: item.name,
                                        type: "list",
                                        required: item.required,
                                        values: item.states.find((itemm: States) =>
                                            itemm.condition === rurelValue)?.values
                                    }}
                                    setValue={setThisValue} />
                                :
                                <SimpleList
                                    configElement={{
                                        name: item.name,
                                        type: "list",
                                        required: item.required,
                                        values: item.states.find((itemm: States) =>
                                            itemm.default)?.values
                                    }}
                                    setValue={setThisValue} />
                            :
                            //passaggio elements + change value
                            <SimpleList configElement={item} setValue={setThisValue} />
                    }
                </div>
            )}
        </>
    )
}
/**
 * dbutile
 * 
 * {
  "mastertype": "list",
  "minListElements": 1,
  "elements": [
    {
      "name": "OBJ_1",
      "type": "object",
      "elements": [
        {
          "name": "CL_1",
          "type": "list",
          "elements": [
            {
              "name": "SL_Radio",
              "type": "list",
              "required": true,
              "values": [
                "value1",
                "value2",
                "value3"
              ]
            }
          ]
        },
        {
          "name": "OBJ_2",
          "type": "object",
          "elements": [
            {
              "name": "Input Boolean",
              "type": "boolean",
              "required": true
            },
            {
              "name": "Input Number",
              "type": "number",
              "properties": {
                "onlyPositive": true,
                "maxLength": 12,
                "minLength": 3
              }
            },
            {
              "name": "Input Text",
              "type": "string",
              "properties": {
                "password": true,
                "minLength": 5,
                "maxLength": 26,
                "needLowerCase": true,
                "needUpperCase": true,
                "needNumbers": true,
                "needLetters": true,
                "needSpecialCharacters": true
              }
            }
          ]
        },
        {
          "name": "SL_Check Box",
          "type": "list",
          "maxChoose": 2,
          "minChoose": 2,
          "required": true,
          "values": [
            "value1",
            "value2",
            "value3"
          ]
        },
        {
          "name": "CondList_3",
          "type": "conditionList",
          "elements": [
            {
              "name": "SL_Select_R1",
              "type": "list",
              "values": [
                "value1",
                "value2",
                "value3",
                "value4",
                "value5"
              ]
            },
            {
              "name": "CondList_3",
              "type": "list",
              "rurel": "SL_Select_R1",
              "required": true,
              "states": [
                {
                  "groupId": 1,
                  "default": true,
                  "condition": "value1",
                  "values": [
                    "uno",
                    "one"
                  ]
                },
                {
                  "groupId": 2,
                  "condition": "value2",
                  "values": [
                    "due",
                    "two"
                  ]
                },
                {
                  "groupId": 3,
                  "condition": "value3",
                  "values": [
                    "tre",
                    "three"
                  ]
                }
              ]
            }
          ]
        },
        {
          "name": "SL_Input",
          "type": "list",
          "datatype": "text",
          "maxChoose": 5,
          "minChoose": 2,
          "required": true,
          "properties": {
            "minLength": 3,
            "maxLength": 12,
            "onlyLowerCase": true,
            "banNumbers": true,
            "banSpecialCharacters": true
          }
        }
      ]
    }
  ]
}
 * 
 * 
 */