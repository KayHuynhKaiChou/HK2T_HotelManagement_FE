import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import '../styles/applicationCommonStyle.scss'

interface InputProps {
    form?: any;
    name: string;
    placeholder?: string;
    typeInput?: string;
    disabled?: boolean;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void
}

function InputHk2t(props : InputProps) {
    const {
        form,
        name = '',
        placeholder = '',
        disabled = false,
        typeInput = 'text',
        className = '',
        value = '',
        onChange,
        onFocus
    } = props
    
    function renderInput(){
        if(form){
            const {formState : {errors}} = form;
            const hasError = errors[name]; // thằng này sẽ lưu kiểu boolean do đó ta cần thêm !!
            return (
                <Controller
                    name={name}
                    control={form.control}
                    render={({field}) => 
                        <TextField 
                            {...field} 
                            margin="normal"
                            disabled={disabled}
                            placeholder={placeholder}
                            InputLabelProps={{ shrink: false }}
                            type={typeInput}
                            fullWidth
                            error={!!hasError}
                            helperText={errors[name]?.message}
                            className={`un_input ${className}`}
                            onFocus={onFocus}
                        />
                    }
                />
            )
        }else{
            return(
                <TextField
                    name={name}
                    value={value}
                    onChange={onChange}
                    margin="normal"
                    disabled={disabled}
                    placeholder={placeholder}
                    InputLabelProps={{ shrink: false }}
                    type={typeInput}
                    fullWidth
                    className={`un_input ${className}`}
                />
            )
        }
    }

    return (
        renderInput()
    )
}


export default InputHk2t

