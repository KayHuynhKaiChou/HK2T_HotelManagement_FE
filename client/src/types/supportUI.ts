import { SvgIconComponent } from "@mui/icons-material";

export interface ColorButtonCustom {
    background ?: string;
    borderColor ?: string;
    hover ?: {
        backgroundColor : string;
        borderColor : string;
    }
}

export interface CriteriaType {
    label : string;
    condition : any; 
}

export type TypeSort = 'NORMAL' | 'ASC' | 'DESC' ; 
export interface ColumnType {
    id : string;
    nameCol : string;
    label ?: string;
    textAlign ?: 'left' | 'right' | 'center',
    width ?: number;
    isSorted ?: boolean;
    isSearched ?: boolean;
    criteria ?: CriteriaType[];
}

export type ColumnTypeProps = Omit<ColumnType , 'typeSort'>

export interface OptionSelect {
    label : string; 
    value : string | number;
}

export interface MenuAdmin {
    name : string;
    endpoint : string;
    Icon : SvgIconComponent;
    childrenMenu : MenuAdmin[];
}

export interface BreadCrumbChild {        
    href?: string;
    label: string;
    icon?: any;
}