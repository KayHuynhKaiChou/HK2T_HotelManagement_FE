// ex : sliceBySize([5,11,2,4,2] , 2)
// return [[5,11],[2,4],[2]]

export function sliceBySize<T>(array: T[], size = 1): T[][] {
    return array.reduce(
        (acc : T[][] , _ : T , index : number) => (index % size ? acc : [...acc , array.slice(index , index + size)]),
        []
    )
}

// ex : removeDuplicateKeys([
//         {
//             id : 1,
//             name : 'ab'
//         },
//         {
//             id : 1,
//             name : 'cd'
//         },
//         {
//             id : 2,
//             name : 'ef'
//         }
//     ],
//     "id"
//     )
// return [{id : 1 , name : 'cd'} , {id : 2 , name : 'ef'}]
export function removeDuplicateKeys<T>(array : T[] , key : keyof T) : T[] {
    return Array.from(new Map<T[keyof T] , T>(array.map(element => [element[key] , element])).values())
}