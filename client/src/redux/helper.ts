import { ActionForm } from "../types/form";

export const refetchList = <T extends { id?: number }>(
    list : T[],
    method : ActionForm,
    interactedObj : T,
) => {
    switch (method) {
        case 'CREATE':
            list.push(interactedObj)
            break;
        case "UPDATE":
            const indexUpdatedObj = list.findIndex(obj => obj.id === interactedObj.id)
            list[indexUpdatedObj] = interactedObj
            break;
        default:
            break;
    }
    return list
}