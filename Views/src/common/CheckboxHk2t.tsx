import { useEffect } from "react";
import { propsTypeButton } from "../types/supportUI";

export default function CheckboxHk2t({
    id,
    checked,
    disabled,
    label,
    onChange
} : propsTypeButton) {

    useEffect(() => {
        document.getElementById(id)?.addEventListener('click' , () => onChange())
    }, [])
    
    return (
        <div 
            className="un_checkbox_wrap"
            id={id}
        >
            <input 
                type="checkbox" 
                className="un_checkbox"
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            <label htmlFor={id}/>
            <label 
                htmlFor={id}
                className="un_checkbox_labelText"    
            >
                {label}
            </label>
        </div>
    )
}
