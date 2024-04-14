export interface ColorButtonCustom {
    background : string;
    borderColor : string;
    hover: {
        backgroundColor : string;
        borderColor : string;
    }
}

export interface columnType {
    id : string;
    nameCol : string;
    width ?: number;
    isSorted ?: boolean;
    typeSort ?: 'normal' | 'asc' | 'desc';
    criteria ?: string[];
}

export interface optionSelect {
    label : string; 
    value : string | number;
}

export interface propsTypeButton {
    id: string;
    label: string;
    checked: boolean;
    disabled: boolean;
    onChange: () => void
}