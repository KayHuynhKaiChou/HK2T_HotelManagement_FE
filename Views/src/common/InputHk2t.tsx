import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import '../styles/InputHk2t.scss'

interface InputProps {
    form: any,
    name: string,
    placeholder: string,
    typeInput?: string,
    disabled?: boolean
}

function InputHk2t(props : InputProps) {
    const {
        form,
        name = '',
        placeholder = '',
        disabled = false,
        typeInput = 'text'
    } = props
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
                    className='un_InputHk2t'
                />
            }
        />
    )
}


export default InputHk2t

