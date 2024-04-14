import { Table, TableRow, styled } from "@mui/material";
import { columnType, optionSelect } from "../../types/supportUI";

export const getLimitRowsPerPage = (rows : unknown[] , pageSizeOptions : optionSelect[]) => {
    const lengthRows = rows.length;
    let initValue = 0;
    const minOpt = +pageSizeOptions[0]?.value;
    const maxOpt = +pageSizeOptions[pageSizeOptions.length - 1]?.value;

    initValue = lengthRows < minOpt ? minOpt : lengthRows >= maxOpt ? maxOpt : initValue
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
    }
}));

export const mapColumnsToOptions = (columns : columnType[]) : optionSelect[] => {
    return columns.map(col => ({label: col.nameCol , value: col.nameCol}))
}