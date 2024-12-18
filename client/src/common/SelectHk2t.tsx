import { OptionSelect } from '../types/supportUI';
import { Controller } from 'react-hook-form';
import Select, { SingleValue } from 'react-select';
interface propsSelect {
    form?: any;
    name : string;
    options : OptionSelect[];
    label ?: string;
    value ?: number | string;
    disabled ?: boolean; 
    placeholder ?: string;
    className ?: string;
    maxMenuHeight ?: number;
    onChange ?: (value: OptionSelect['value']) => void;
}

export default function SelectHk2t({
    form,
    name,
    options,
    label,
    value,
    disabled = false,
    placeholder = '',
    className,
    maxMenuHeight = 300,
    onChange
} : propsSelect) {

    function handleChange (option : SingleValue<OptionSelect>) {
        if(onChange && typeof onChange == 'function'){
            onChange(option!.value)
        }
    }
   
    const renderSelect = () => {
        if(form){
            const {formState : { errors, isSubmitted }} = form;
            const hasError = errors[name]; // thằng này sẽ lưu kiểu boolean do đó ta cần thêm !!
            
            const selectStyles = {
                control: (provided: any) => ({
                    ...provided,
                    marginTop: '16px',
                    marginBottom: '8px',
                    borderColor: hasError && isSubmitted ? '#ff0000' : provided.borderColor, // Thay đổi màu viền nếu có lỗi
                    boxShadow: 'none', // Tắt box shadow nếu cần
                    '&:hover': {
                        borderColor: hasError && isSubmitted ? '#ff0000' : provided.borderColor, // Thay đổi viền khi hover
                    }
                })
            };

            return (
                <Controller
                    name={name}
                    control={form.control}
                    render={({field}) => 
                        <>
                            <Select
                                {...field}
                                isSearchable
                                options={options}
                                placeholder={placeholder}
                                isDisabled={disabled}
                                styles={selectStyles}
                                maxMenuHeight={maxMenuHeight}                   
                            />
                            {errors[name] && (
                                <p style={{
                                    fontSize: "1rem",
                                    color: "#ff0000",
                                    letterSpacing: "0.03333em"
                                }} >{errors[name]?.value.message}</p>
                            )}
                        </>
                    }
                />
            )
        }else{
            return (
                <Select
                    name={name}
                    isSearchable
                    defaultValue={options.find(op => op.value == value)}
                    value={options.find(op => op.value == value)}
                    onChange={handleChange}
                    options={options}
                    isDisabled={disabled}
                    placeholder={placeholder}
                    className={className}
                    maxMenuHeight={maxMenuHeight}  
                />
            )
        }
    }

    return (
        <div className='un_input_wrap'>
            <div className="un_input_label">
                {label}
            </div>
            {renderSelect()}
        </div>
    )
}
