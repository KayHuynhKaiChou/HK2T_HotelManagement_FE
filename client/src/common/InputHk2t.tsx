import '../styles/applicationCommonStyle.scss'
import { Controller } from 'react-hook-form'
import { InputAdornment, TextField } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DateValidationError, PickerChangeHandlerContext, PickerValidDate } from '@mui/x-date-pickers/models';

interface InputProps {
    form?: any;
    name: string;
    label?: string;
    placeholder?: string;
    typeInput?: React.HTMLInputTypeAttribute;
    disabled?: boolean;
    className?: string;
    value?: string;
    iconInput?: JSX.Element;
    minDate?: PickerValidDate;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDatePicker?:(value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => void
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
        className,
        value = '',
        iconInput,
        minDate = dayjs('1900-01-01'),
        onChange,
        onChangeDatePicker,
        onFocus
    } = props
    
    
    function renderInput(){
        if(form){
            const {formState : { errors, isSubmitted}} = form;
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

    function renderDatePicker(){
        if (!form) return <></>
        const {formState : { errors, isSubmitted}} = form;
        const hasError = errors[name]; // thằng này sẽ lưu kiểu boolean do đó ta cần thêm !!
        return (
            <Controller
                name={name}
                control={form.control}
                render={({field : { value, onChange }}) => 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker 
                                className={`un_input bl_datePicker`}
                                minDate={minDate}
                                onChange={(value) => onChange(value && value.format('YYYY-MM-DD'))}
                                disabled={disabled}
                                value={dayjs(value)}
                                slotProps={{
                                    textField: {
                                        error: !!hasError,
                                        helperText: errors[name]?.message,
                                    },
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                }
            />
        )
    }

    return (
        <div className='un_input_wrap'>
            <div className="un_input_label">
                {label}
            </div>
            {
                typeInput === 'date' 
                    ? renderDatePicker() 
                    : renderInput()
            }
        </div>
    )
}


export default InputHk2t

