import { ToastOptions, ToastPosition, Theme } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Amenity, Reversation, Room, TypeAmenity, TypeObjAmenity, TypeRoom, User } from '../types/models';
import { defaultTypeAmenity, statusBooking } from './constants';
import { isValidElement } from 'react';

export const uuid = () => {
  const id = uuidv4().replace(/-/g, '')
  return id
}

export const formatDateV1 = (dateObj : Date) : string => {
  return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}

export const formatDateV2 = (date: Date) : string => {
  // Các mảng để lưu tên ngày và tên tháng
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];

  // Lấy các thành phần của ngày
  const dayName = days[date.getDay()]; // Tên ngày
  const monthName = months[date.getMonth()]; // Tên tháng
  const day = date.getDate(); // Ngày trong tháng
  const year = date.getFullYear(); // Năm

  // Trả về chuỗi định dạng
  return `${dayName}, ${monthName} ${day}, ${year}`;
}

export const distanceTwoDate = (dateFirst: Date, dateLast: Date) => {
  // Tính khoảng cách giữa 2 ngày bằng số milliseconds
  const millisecondsPerDay = 1000 * 60 * 60 * 24; // Số milliseconds trong 1 ngày
  const timeDifference = Math.abs(dateLast.getTime() - dateFirst.getTime()); // Khoảng cách giữa 2 ngày

  // Chia số milliseconds cho số milliseconds trong 1 ngày để ra số ngày
  return Math.ceil(timeDifference / millisecondsPerDay);
}

export const formatCurrency = (amount: number) => {
  // 1350000 => 1.350.000
  return amount.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ cho Việt Nam
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

export const formatRoomsToResourcesCalender = (rooms : Room[]) => {
  return rooms.map(room => {
    return {
      id : room.id + '',
      title : `Room ${room.room_number} (${room.type_room.title})`
    }
  })
}

export const formatReversationsToEventsCalender = (reservations : Reversation[] , users : User[]) => {
  return reservations.map(reservation => {
    const title = users.find(u => u.id === reservation.user_id)?.email
    const status = reservation.status
    return {
      id: reservation.id,
      resourceId: reservation.room.id,
      title,
      start: reservation.checkin_at,
      end: reservation.checkout_at,
      backgroundColor: statusBooking[status - 1].color
    }
  })
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