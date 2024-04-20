import { v4 as uuidv4 } from 'uuid';

export const uuid = () => {
    const id = uuidv4().replace(/-/g, '')
    return id
}