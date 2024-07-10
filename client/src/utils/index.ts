import { ToastOptions, ToastPosition, Theme } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Amenity, TypeAmenity, TypeObjAmenity } from '../types/models';
import { defaultTypeAmenity } from './constants';
import { isValidElement } from 'react';

export const uuid = () => {
  const id = uuidv4().replace(/-/g, '')
  return id
}

export const formatDate = (dateObj : Date) => {
  return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}

export const isJSXElement = (element: any): boolean => {
  return isValidElement(element);
}

export const capitalizeFirstLetter = (text : String) => {
  if (typeof text !== 'string' || text.length === 0) {
    return '';
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const convertAmenitiesArrayToObject = (amenities : Amenity[]) : TypeObjAmenity => {
  return defaultTypeAmenity.reduce<TypeObjAmenity>((acc , typeAme , index) => {
    const amenitiesByType = amenities.filter(a => a.type === index + 1)
    const typeAmeLowerCase = typeAme.toLocaleLowerCase() as TypeAmenity
    acc[typeAmeLowerCase] = amenitiesByType
    return acc
  },{general : [] , bathroom : [] , other : []})
}

export const toastMSGObject = ({
  position = "top-right" as ToastPosition,
  autoClose = 2000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  progress = undefined,
  theme = "colored" as Theme,
} = {}): ToastOptions<{}> => ({
  position,
  autoClose,
  hideProgressBar,
  closeOnClick,
  pauseOnHover,
  draggable,
  progress,
  theme
})