import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FontAwesomeIconHk2t from "../FontAwesomeIconHk2t";
import { uuid } from "../../utils";
import { useEffect, useMemo, useState } from "react";
import { iconsSort } from "../../utils/constants";
import SelectHk2t from "../SelectHk2t";
import { optionSelect , columnType } from "../../types/supportUI";
import { CustomTable, CustomTableRow, getLimitRowsPerPage, mapColumnsToOptions } from "./table_helper";
import InputHk2t from "../InputHk2t";

interface propsTableHk2t {
    rows: unknown[];
    columns: columnType[];
    pageSizeOptions : optionSelect[]; 
}

type selectTypeCurrentPage = 'NORMAL' | 'PREVIOUS' | 'NEXT';

export default function TableHk2t({ rows , columns , pageSizeOptions = [] }: propsTableHk2t) {
    // state ===================================================================
    const [columnsDetail , setColumnsDetail] = useState<columnType[]>(columns);
    const [selectedColumn , setSelectedColumn] = useState<optionSelect['value']>(columns[0].nameCol);
    const [rowsDetail , setRowsDetail] = useState<unknown[]>(rows); // limit rows per page (1 page phải có bao nhiêu data)
    const [rowsFilter , setRowsFilter] = useState<unknown[]>(rows); // filter rows by search
    const [searchText , setSearchText] = useState<string>('');
    const [pageSizeOption , setPageSizeOption] = useState<optionSelect['value']>(
        getLimitRowsPerPage(rows , pageSizeOptions)
    ); // limit length rows per page
    const [listNumberPage , setListNumberPage] = useState<number[]>([]); // ex : Previous 1 2 3 4 Next
    const [currentPage , setCurrentPage] = useState<number>(1);

    // useMemo ==================================================================
    const lengthRows = useMemo(() => rowsFilter.length ,[rowsFilter.length])

    // giả sử current page is 4 , lengthRow = 102 , limit rows per page : 10 
    // => toRow : 4*10 = 40 và => fromRow : 40 - 10 = 30 
    // khi đó ta slice(30,40) khi chọn current page là 4
    const toRow = useMemo(() => {
        const toRowResult = currentPage * +pageSizeOption
        return toRowResult > lengthRows ? lengthRows : toRowResult
    },[currentPage, pageSizeOption , lengthRows])

    const fromRow = useMemo(() => {
        if(toRow == lengthRows){ // 107 == 107 
            const remainRows = lengthRows % +pageSizeOption // 2
            return toRow - remainRows // => 107 - 2 = 105
        }
        return toRow - +pageSizeOption 
    },[currentPage, pageSizeOption , lengthRows]) 

    const showDetailLimitPage = useMemo(() => {
        return `Showing ${toRow == 0 ? fromRow : fromRow + 1} to ${toRow} of ${lengthRows} entries`
    },[fromRow , toRow , lengthRows])

    const isDisabledBtnPrev = useMemo(() => currentPage === 1, [currentPage])
    // thêm 1 dependency listNumberPage với 1 case đặt biệt : Prev(disabled) |1| 2 3 ... Next => Prev(disabled) |1| Next(disabled)
    const isDisabledBtnNext = useMemo(() => currentPage === listNumberPage.length, [currentPage , listNumberPage])

    // useEffect =================================================================
    useEffect(() => {
        setCurrentPage(1)
    },[pageSizeOption , lengthRows]) // when change dropdown 

    useEffect(() => {
        // giả sử tôi có 107 data , limit per page là 5 data , ta lấy 107 / 5 = 21 ceil lên 22
        // khi đó ta sẽ có Prev 1 2 3 ... 22 Next 
        const lengthListNumber = Math.ceil((lengthRows / +pageSizeOption)) || 1;
        const listPage = Array.from({ length: lengthListNumber }, (_, index) => index + 1)
        setListNumberPage(listPage)
        setRowsDetail(rowsFilter.slice(fromRow , toRow))       
    },[currentPage , pageSizeOption , lengthRows])

    useEffect(() => {
        let limitRows = 0;
        let resultFilter = [];
        if(searchText == ''){
            resultFilter = [...rows]
            limitRows = getLimitRowsPerPage(resultFilter , pageSizeOptions);
        }else{
            resultFilter = rows.filter(row => {
                const originalValue = row[selectedColumn].toLowerCase() as string;
                return originalValue.includes(searchText.toLowerCase())
            })
            limitRows = getLimitRowsPerPage(resultFilter, pageSizeOptions);
        }
        setPageSizeOption(limitRows);
        setRowsFilter(resultFilter);
    },[searchText])

    // func handle event ================================================================
    const handleSelectCurrentPage = (typeSelect : selectTypeCurrentPage , numPage : number = 0) => { 
        switch(typeSelect){
            case "NORMAL":
                setCurrentPage(numPage);
                break;
            case "PREVIOUS":
                setCurrentPage(currentPage - 1);
                break;
            case "NEXT":
                setCurrentPage(currentPage + 1);
                break;
            default:
                setCurrentPage(numPage);
                break;
        }
    }
    
    const handleChangePageSizeOption = (value : optionSelect['value']) => {
        setPageSizeOption(value);
    }

    const handleChangeSelectedColumn = (value : optionSelect['value']) => {
        setSelectedColumn(value);
    }

    const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleSortByColumnName = (idCol : columnType['id']) => {
        let columnsDetailClone = [...columnsDetail]
        columnsDetailClone = columnsDetailClone
            .map(col => {
                if(col.id === idCol || !col.isSorted){
                    return col
                }else{
                    return {...col , typeSort: 'normal'}
                }
            })
        const foundCol = columnsDetailClone.find(col => col.id === idCol);
        if(foundCol){
            foundCol.typeSort = foundCol.typeSort === 'asc' ? 'desc' : 'asc'
            const keyRow = foundCol.nameCol
            const rowsDetailSorted = rowsFilter.sort((eleBefore , eleAfter) => {
                return foundCol.typeSort === 'asc'
                    ? eleBefore[keyRow] - eleAfter[keyRow]
                    : eleAfter[keyRow] - eleBefore[keyRow]
            })
            setRowsDetail([
                ...rowsDetailSorted
            ])
            setColumnsDetail([
                ...columnsDetailClone
            ])
        }
    }

    return (
        <TableContainer 
            component={Paper}
            className="bl_tableContainer"
        >
            <div className="bl_tableContainer_header">
                {pageSizeOptions.length !== 0 && (
                    <div className="bl_selectLimit">
                        <div className="bl_subText">Hiển thị</div>
                        <SelectHk2t
                            options={pageSizeOptions}
                            value={pageSizeOption}
                            onChange={handleChangePageSizeOption}
                        />
                        <div className="bl_subText">thành viên</div>
                    </div>
                ) }
                <div className="bl_searchTable">
                    <div className="bl_searchTable_label">Search: </div>
                    <InputHk2t
                        className="bl_searchTable_input"
                        name="search"
                        placeholder="Bạn cần tìm gì ?"
                        value={searchText}
                        onChange={handleChangeSearchText}
                    />
                    <SelectHk2t
                        className="bl_searchTable_select"
                        options={mapColumnsToOptions(columns)}
                        value={selectedColumn}
                        onChange={handleChangeSelectedColumn}
                    />
                </div>
            </div>
            <CustomTable
                className="bl_tableContainer_body" 
                sx={{ minWidth: 650 }}
                aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnsDetail.map(col => (
                            <TableCell 
                                key={col.id} 
                                className="un_tableCell_wrap" 
                                align="left"
                                width={col.width || 300}
                            >
                                {col.nameCol}
                                {col.isSorted && (
                                    <div 
                                        className="un_iconSort"
                                        onClick={() => handleSortByColumnName(col.id)}
                                    >
                                        <FontAwesomeIconHk2t
                                            fontSizeCustom={15}
                                            {...iconsSort[col.typeSort || 'normal']}
                                        />
                                    </div>
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsDetail.map((row) => (
                        <CustomTableRow
                            key={uuid()}
                        >
                            {columns.map(col => (
                                <TableCell align="left">{row[col.nameCol]}</TableCell>
                            ))}
                        </CustomTableRow>
                    ))}
                </TableBody>
            </CustomTable>
            <div className="bl_tableContainer_footer">
                <div className="bl_numberPageLimit">
                    {showDetailLimitPage}
                </div>
                <div className="bl_paginationPage">
                    <button
                        disabled={isDisabledBtnPrev}
                        className="bl_paginationPage_btn"
                        onClick={() => handleSelectCurrentPage('PREVIOUS')}
                    >
                        Previous
                    </button>
                    <div className="bl_listNumberPage">
                        {listNumberPage.map(numPage => (
                            <div 
                                className={
                                    `bl_numberPage ${currentPage == numPage ? 'bl_numberPage__selected' : ''}`
                                }
                                onClick={() => handleSelectCurrentPage('NORMAL',numPage)}
                            >{numPage}</div>
                        ))}
                    </div>
                    <button   
                        disabled={isDisabledBtnNext}                   
                        className="bl_paginationPage_btn"
                        onClick={() => handleSelectCurrentPage('NEXT')}
                    >
                        Next
                    </button>
                </div>
            </div>
        </TableContainer>
    );
}
