import { ToastOptions, ToastPosition, Theme } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const uuid = () => {
    const id = uuidv4().replace(/-/g, '')
    return id
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