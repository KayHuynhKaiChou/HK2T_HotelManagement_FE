import {Select , MenuItem , FormControl} from '@mui/material'
import { optionSelect } from '../types/supportUI';

interface propsSelect {
    options : optionSelect[];
    value : number | string;
    className ?: string;
    onChange : (value: optionSelect['value']) => void;
}

export default function SelectHk2t({
    options,
    value,
    className = '',
    onChange
} : propsSelect) {

    return (
        <FormControl 
            className={`un_select ${className}`}
            size='small'
        >
            <Select
                inputProps={{ 'aria-label': 'Without label' }}
                value={value}
                onChange={e => onChange(e.target.value)}
            >
                {options.map(o => (
                    <MenuItem value={o.value}>{o.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
