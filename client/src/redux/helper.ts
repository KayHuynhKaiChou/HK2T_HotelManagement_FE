import { ActionForm } from "../types/form";

export const refetchList = <T extends { id?: number }>(
    list : T[],
    method : ActionForm,
    interactedObj : T,
) => {
    switch (method) {
        case 'CREATE':
            list.unshift(interactedObj)
            break;
        case "UPDATE":
            const indexUpdatedObj = list.findIndex(obj => obj.id === interactedObj.id)
            list.splice(indexUpdatedObj, 1)
            list.unshift(interactedObj)
            break;
        default:
            break;
    }
    return list
}