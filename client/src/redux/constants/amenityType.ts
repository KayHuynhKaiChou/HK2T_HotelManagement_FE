import { Action } from "redux";
import { Amenity } from "../../types/models";

type keyAmenityType = 'SHOW'
type valueAmenityType = 'SHOW_AMENITY'

export const amenityType : Record<keyAmenityType , valueAmenityType> = {
    SHOW : 'SHOW_AMENITY',
} as const

export interface AmenityAction extends Action<valueAmenityType>{
    payload : Amenity[] | null;
}