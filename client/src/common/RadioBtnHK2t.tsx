import { useEffect } from "react";
import { propsTypeButton } from "../types/supportUI";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

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

  //redux
  const {user} = useSelector<RootState , RootState>(state => state);
  
  useEffect(() => {
    document.getElementById(id)?.addEventListener('click' , () => onChange())
  }, [])

  const classPosition = user.position != 4 ? 'for_employee' : 'for_customer'
  
  const renderRadio = () => {
    if(form){
      return (
        <input 
          id={id}
          type="radio" 
          className={`un_radio ${classPosition}`}
          value={value}
          checked={checked}
          //{...form.register(name, { valueAsNumber: true })}
        />
      )
    }else{
      return (
        <input 
          id={id}
          type="radio" 
          className={`un_radio ${classPosition}`}
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
