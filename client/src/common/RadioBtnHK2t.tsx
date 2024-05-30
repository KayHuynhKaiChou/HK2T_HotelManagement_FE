import { useEffect } from "react";
import { propsTypeButton } from "../types/supportUI";

export default function RadioBtnHK2t({
    id,
    form,
    label,
    value,
    name,
    checked = false,
    disabled = false,
    onChange
} : propsTypeButton) {
  
  useEffect(() => {
    document.getElementById(id)?.addEventListener('click' , () => onChange())
  }, [])

  
  const renderRadio = () => {
    if(form){
      return (
        <input 
          id={id}
          type="radio" 
          className="un_radio"
          value={value}
          checked = {checked}
          {...form.register(name, { valueAsNumber: true })}
        />
      )
    }else{
      return (
        <input 
          id={id}
          type="radio" 
          className="un_radio" 
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
      )
    }
  }

  return (
    <div className="un_radio_wrap" id={id}>
      {renderRadio()}
      <label htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
