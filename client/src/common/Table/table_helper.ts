import { Table, TableRow, styled } from "@mui/material";
import { ColumnType, OptionSelect } from "../../types/supportUI";

export const getLimitRowsPerPage = (rows : {[key: string]: any}[] , pageSizeOptions : OptionSelect[]) => {
    const lengthRows = rows.length;
    let initValue = 0;
    const minOpt = +pageSizeOptions[0]?.value;
    const maxOpt = +pageSizeOptions[pageSizeOptions.length - 1]?.value;

    initValue = lengthRows < minOpt ? minOpt : lengthRows >= maxOpt ? maxOpt : initValue
    if (initValue === minOpt || initValue === maxOpt) return initValue
    pageSizeOptions.forEach((pSizeOpt , i) => {
        if(lengthRows >= +pSizeOpt.value && lengthRows < +pageSizeOptions[i+1].value){
            initValue = +pSizeOpt.value
        }
    }) // 10 25 50 100
    return initValue
}

export const CustomTable = styled(Table)({
    "& .MuiTableCell-root": {
        borderLeft: "1px solid rgba(224, 224, 224, 1)"
    }
})

export const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&.bl_row_selected': {
        backgroundColor: '#ff9a00',
        '& td': { // Đúng cú pháp để chọn các thẻ td con
            color: '#fff !important', // Ví dụ: thay đổi màu chữ cho các thẻ td
        }
    }
}));

export const mapColumnsToOptions = (columns : ColumnType[]) : OptionSelect[] => {
    return columns
        .filter(col => col.isSearched)
        .map(col => ({
            label: col.label || col.nameCol , 
            value: col.id
        }))
}

export const initSelectedIdColumnDetail = (columns : ColumnType[]) : ColumnType['id'] => {
    const columnsFilter = columns.filter(col => col.isSearched)
    return columnsFilter?.length > 0 ? columnsFilter[0].id : ''
}

export const mapCriteriaToOptionSelect = (criteria : ColumnType['criteria']) : OptionSelect[] => {
    return criteria!.flatMap(cri => ({
        label : cri.label, 
        value : typeof cri.condition === 'string' ? cri.condition : cri.condition.join('-')
    }))
}