import { Action } from "redux";
import { Amenity } from "../../types/models";

type keyAmenityType = 'SHOW' | 'CREATE'
type valueAmenityType = 'SHOW_AMENITY' | 'CREATE_AMENITY'

export const amenityType : Record<keyAmenityType , valueAmenityType> = {
    SHOW : 'SHOW_AMENITY',
    CREATE : 'CREATE_AMENITY'
} as const

export interface AmenityAction extends Action<valueAmenityType>{
    payload : Amenity[] | null;
}