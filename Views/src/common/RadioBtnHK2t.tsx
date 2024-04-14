import { useEffect } from "react";
import { propsTypeButton } from "../types/supportUI";

export default function RadioBtnHK2t({
    id,
    label,
    checked = false,
    disabled = false,
    onChange
} : propsTypeButton) {
  useEffect(() => {
    document.getElementById(id)?.addEventListener('click' , () => onChange())
  }, [])
  return (
    <div className="un_radio_wrap" id={id}>
      <input 
        id={id}
        type="radio" 
        className="un_radio" 
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
