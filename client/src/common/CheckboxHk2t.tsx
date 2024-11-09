import { useEffect } from "react";

interface CheckboxHk2t {
    id : string;
    checked : boolean;
    disabled ?: boolean;
    label : string;
    onChange : () => void;
}

export default function CheckboxHk2t({
    id,
    checked,
    disabled = false,
    label,
    onChange
} : CheckboxHk2t) {

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
                className="un_checkbox_labelText ellipsis"    
            >
                {label}
            </label>
        </div>
    )
}
