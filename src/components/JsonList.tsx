import { props } from "../types/PJson";

export const JsonList = ({props}: props) => {
    return (<>
        ID: {props.id} | UserName: {props.name} | type: {props.type} | bool: {props.bool.toString()} | colo: {props.colo} |
    </>);
}