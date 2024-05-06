import { Controller } from 'react-hook-form'
import { InputAdornment, TextField } from '@mui/material'
import '../styles/applicationCommonStyle.scss'

interface InputProps {
    form?: any;
    name: string;
    label?: string;
    placeholder?: string;
    typeInput?: string;
    disabled?: boolean;
    className?: string;
    value?: string;
    iconInput?: JSX.Element;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void
}

function InputHk2t(props : InputProps) {
    const {
        form,
        name = '',
        label = '',
        placeholder = '',
        disabled = false,
        typeInput = 'text',
        className = '',
        value = '',
        iconInput,
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
                            InputProps={iconInput ? {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {iconInput}
                                  </InputAdornment>
                                ),
                            } : {}}
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
                    InputProps={iconInput ? {
                        startAdornment: (
                          <InputAdornment position="start">
                            {iconInput}
                          </InputAdornment>
                        ),
                    } : {}}
                />
            )
        }
    }

    return (
        <div className='un_input_wrap'>
            <div className="un_input_label">
                {label}
            </div>
            {renderInput()}
        </div>
    )
}


export default InputHk2t

