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
    onChange
} : propsSelect) {

    function handleChange (option : SingleValue<OptionSelect>) {
        if(onChange && typeof onChange == 'function'){
            onChange(option!.value)
        }
    }

    const renderSelect = () => {
        if(form){
            // const {formState : {errors}} = form;
            // const hasError = errors[name]; // thằng này sẽ lưu kiểu boolean do đó ta cần thêm !!
            return (
                <Controller
                    name={name}
                    control={form.control}
                    render={({field}) => 
                        <Select
                            {...field}
                            isSearchable={false}
                            options={options}
                            placeholder={placeholder}
                            isDisabled={disabled}
                            className='bl_select_form'
                        />
                    }
                />
            )
        }else{
            return (
                <Select
                    name={name}
                    isSearchable={false}
                    defaultValue={options.find(op => op.value == value)}
                    onChange={handleChange}
                    options={options}
                    isDisabled={disabled}
                    placeholder={placeholder}
                    className={className}
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
