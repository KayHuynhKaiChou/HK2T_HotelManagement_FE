import { ToastOptions, ToastPosition, Theme } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Amenity, TypeAmenity, TypeObjAmenity } from '../types/models';
import { defaultTypeAmenity } from './constants';

export const uuid = () => {
  const id = uuidv4().replace(/-/g, '')
  return id
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