import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FontAwesomeIconHk2t from "../FontAwesomeIconHk2t";
import { uuid } from "../../utils";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { colorsBtnCustom, defaultSortColumn, iconsSort } from "../../utils/constants";
import SelectHk2t from "../SelectHk2t";
import { OptionSelect , ColumnType , CriteriaType, TypeSort } from "../../types/supportUI";
import { 
    CustomTable, 
    CustomTableRow, 
    getLimitRowsPerPage, 
    initSelectedIdColumnDetail, 
    mapColumnsToOptions, 
    mapCriteriaToOptionSelect
} from "./table_helper";
import InputHk2t from "../InputHk2t";
import ButtonHk2t from "../ButtonHk2t";
import AddIcon from '@mui/icons-material/Add';

interface propsTable {
    rows: { [key : string] : any}[];
    columns: ColumnType[];
    pageSizeOptions : OptionSelect[];
    isLoadingTable : boolean; 
    onActionAdd ?: (...args: any[]) => void;
    onExportExcel ?: (...args: any[]) => void;
}

type selectTypeCurrentPage = 'NORMAL' | 'PREVIOUS' | 'NEXT';

export default function TableHk2t({ 
    rows , 
    columns , 
    pageSizeOptions = [] , 
    isLoadingTable ,
    onActionAdd ,
    onExportExcel
}: propsTable) {
    // state ===================================================================
    const [selectedIdColumnDetail , setSelectedIdColumnDetail] = useState<OptionSelect['value']>(
        initSelectedIdColumnDetail(columns)
    );
    const [rowsDetail , setRowsDetail] = useState<propsTable['rows']>(rows); // limit rows per page (1 page phải có bao nhiêu data)
    const [rowsFilter , setRowsFilter] = useState<propsTable['rows']>(rows); // filter rows by search
    const [searchText , setSearchText] = useState<string>('');
    const [pageSizeOption , setPageSizeOption] = useState<OptionSelect['value']>(
        getLimitRowsPerPage(rows , pageSizeOptions)
    ); // limit length rows per page
    const [listNumberPage , setListNumberPage] = useState<number[]>([]); // ex : Previous 1 2 3 4 Next
    const [currentPage , setCurrentPage] = useState<number>(1);
    const [selectedCriteria , setSelectedCriteria] = useState<CriteriaType['condition'] | null>(null);
    const [sortedColumn , setSortedColumn] = useState<{id : ColumnType['id'] , type : TypeSort}>(defaultSortColumn);

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

    const columnDetail = useMemo(() => {
        const foundColumn = columns.find(col => col.id === selectedIdColumnDetail);
        return foundColumn!
    },[selectedIdColumnDetail]) // ta có thể gộp columnDetail với selectedIdColumnDetail để có kiểu là ColumnType giống với columnsDetail state

    const getIconSortByColumn = useMemo(() => {
        return (idCol : ColumnType['id']) => {
            const keyIconSort = sortedColumn.id === idCol ? sortedColumn.type : 'NORMAL'
            return iconsSort[keyIconSort]
        }
    },[sortedColumn])

    // useEffect =================================================================
    useLayoutEffect(() => { 
        // use useLayoutEffect để update rowsDetail trước rồi mới update DOM 
        // nếu dung useEffect : trường hợp isLoadingTable : true và đặc biệt lưu ý rows và rowDetails
        // B1 : truyền props columns và rows ở dạng data đã có (từ api) 
        // B2 : xuống phần DOM thì rowDetails vẫn ở dạng data loading ( {'-' : '-'} ) trong khi columns đã ở dạng data đã có
        // do đó ở dòng 323, row[col.nameCol] bị null
        // B3 : chạy useEffect này xong thì rowDetails mới đc update sang lại data đã có
        if(isLoadingTable) return;
        setRowsDetail(rows);
        setRowsFilter(rows);
        searchText != '' && setSearchText('');
        const limitRowsPerPage = getLimitRowsPerPage(rows , pageSizeOptions);
        pageSizeOption != limitRowsPerPage && setPageSizeOption(limitRowsPerPage);
        // listNumberPage.length > 0 && setListNumberPage([]);
        currentPage > 1 && setCurrentPage(1);
        selectedCriteria && setSelectedCriteria(null);
        sortedColumn.id != defaultSortColumn.id && setSortedColumn(defaultSortColumn);
    },[rows]) // when prop rows change , we need reset all states become default as first time

    useEffect(() => {
        if(isLoadingTable) return;
        setCurrentPage(1)
    },[pageSizeOption , lengthRows]) // when change dropdown 

    useEffect(() => {
        if(isLoadingTable) return;
        // giả sử tôi có 107 data , limit per page là 5 data , ta lấy 107 / 5 = 21 ceil lên 22
        // khi đó ta sẽ có Prev 1 2 3 ... 22 Next 
        const lengthListNumber = Math.ceil((lengthRows / +pageSizeOption)) || 1;
        const listPage = Array.from({ length: lengthListNumber }, (_, index) => index + 1)
        setListNumberPage(listPage)
        setRowsDetail(rowsFilter.slice(fromRow , toRow))       
    },[currentPage , pageSizeOption , lengthRows , rows])
    // dependency rows mục đích là khi update 1 ele trong rows 

    // track sort asc / desc by column
    useEffect(() => {
        if(isLoadingTable) return;
        const foundSortedCol = columns.find(col => col.id === sortedColumn?.id);
        if(foundSortedCol){
            const keyRow = foundSortedCol.nameCol
            const rowsDetailSorted = rowsFilter.sort((eleBefore , eleAfter) => {
                return sortedColumn?.type === 'ASC'
                    ? eleBefore[keyRow] - eleAfter[keyRow]
                    : eleAfter[keyRow] - eleBefore[keyRow]
            })
            rows = rows.sort((eleBefore , eleAfter) => {
                return sortedColumn?.type === 'ASC'
                    ? eleBefore[keyRow] - eleAfter[keyRow]
                    : eleAfter[keyRow] - eleBefore[keyRow]
            })
            setRowsFilter([
                ...rowsDetailSorted
            ])
            // cần update thêm row detail với fromRow và toRow hiện tại
            setRowsDetail([
                ...rowsDetailSorted.slice(fromRow,toRow)
            ])
        }
    },[sortedColumn])

    // when change search text , rows will filter by text
    useEffect(() => {
        if(isLoadingTable) return;
        if(columnDetail?.criteria){
            return;
        }
        let limitRows = 0;
        let resultFilter = [];
        if(searchText == ''){
            resultFilter = [...rows]
            limitRows = getLimitRowsPerPage(resultFilter , pageSizeOptions);
        }else{
            resultFilter = rows.filter(row => {
                const originalValue = row[columnDetail?.nameCol].toLowerCase() as string;
                return originalValue.includes(searchText.toLowerCase())
            })
            limitRows = getLimitRowsPerPage(resultFilter, pageSizeOptions);
        }
        setPageSizeOption(limitRows);
        setRowsFilter(resultFilter);
    },[searchText , columnDetail])

    // when change criteria , rows will filter by criteria
    useEffect(() => {
        if(isLoadingTable) return;
        if(columnDetail?.criteria && selectedCriteria){
            const condition = selectedCriteria
            const compareFirst = condition![0];
            const compareLast = condition![1];
            const resultFilter = rows.filter(row => {
                return row[columnDetail?.nameCol] >= compareFirst && row[columnDetail?.nameCol] <= compareLast
            })
            const limitRows = getLimitRowsPerPage(resultFilter, pageSizeOptions);
            setPageSizeOption(limitRows);
            setRowsFilter(resultFilter);
        }
    },[selectedCriteria , columnDetail])

    useEffect(() => {
        if(isLoadingTable) return;
        if(columnDetail?.criteria){
            setSelectedCriteria(columnDetail.criteria[0].condition)
        }else{
            setSearchText('')
        }
    },[columnDetail])

    // func handle event to change state ================================================================
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
    
    const handleChangePageSizeOption = (value : OptionSelect['value']) => {
        console.log({value})
        setPageSizeOption(value);
    }

    const handleChangeSelectedColumn = (value : OptionSelect['value']) => {
        setSelectedIdColumnDetail(value);
    }

    const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleChangeSelectedCriteria = (value : OptionSelect['value']) => {
        const stringCondition = value as string
        const formatArrayCondition = stringCondition.split('-').map(limit => Number(limit))
        setSelectedCriteria(formatArrayCondition)
    }

    const handleChangeSortedColumn = (idCol : ColumnType['id']) => {
        setSortedColumn({
            id : idCol,
            type : sortedColumn?.type === 'ASC' ? 'DESC' : 'ASC'
        })
    }

    // logic css
    const getJustifyContent = (isSorted : boolean , textAlign : ColumnType['textAlign']) => {
        if(isSorted) return 'space-between';
        let valueJC = '';
        switch(textAlign){
            case 'left':
                valueJC = 'flex-start'
                break;
            case 'right':
                valueJC = 'flex-end'
                break;
            case 'center':
                valueJC = 'center'
                break;
        };
        return valueJC
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
                            name="select_total_number_row_per_page"
                            options={pageSizeOptions}
                            value={pageSizeOption}
                            onChange={handleChangePageSizeOption}
                        />
                        <div className="bl_subText">thành viên</div>
                    </div>
                ) }
                <div className="bl_act">
                    {typeof onActionAdd === 'function' && (
                        <ButtonHk2t
                            content='add'
                            startIcon={<AddIcon/>}
                            onClick={onActionAdd}
                        />
                    )}
                    {typeof onExportExcel === 'function' && (
                        <ButtonHk2t
                            content='export excel'
                            startIcon={<FontAwesomeIconHk2t className="fa-file-excel"/>}
                            colorCustom={colorsBtnCustom['success']}
                            onClick={onExportExcel}
                        />
                    )}
                </div>
                <div className="bl_searchTable">
                    <div className="bl_searchTable_label">Search: </div>
                    {
                        !columnDetail?.criteria ? (
                            <InputHk2t
                                className="bl_searchTable_input"
                                name="search"
                                placeholder="Bạn cần tìm gì ?"
                                value={searchText}
                                onChange={handleChangeSearchText}
                            />
                        ) : (
                            <SelectHk2t
                                name='select_range'
                                className="bl_searchTable_select"
                                options={mapCriteriaToOptionSelect(columnDetail.criteria)}
                                value={selectedCriteria ? selectedCriteria.join('-') : ''}
                                onChange={handleChangeSelectedCriteria}
                            />
                        )
                    }
                    <SelectHk2t
                        name="select_field"
                        className="bl_searchTable_select"
                        options={mapColumnsToOptions(columns)}
                        value={selectedIdColumnDetail}
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
                        {columns.map(col => (
                            <TableCell 
                                key={col.id}
                                width={col.width || 300}
                            >
                                <div 
                                    className="un_tableCell_wrap"
                                    style={{
                                        justifyContent : getJustifyContent(!!col.isSorted , col.textAlign)
                                    }}
                                >
                                    {col.label ?? col.nameCol}
                                    {col.isSorted && (
                                        <div 
                                            className="un_iconSort"
                                            onClick={() => handleChangeSortedColumn(col.id)}
                                        >
                                            <FontAwesomeIconHk2t
                                                fontSizeCustom={15}
                                                {...getIconSortByColumn(col.id)}
                                            />
                                        </div>
                                    )}
                                </div>
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
                                <TableCell 
                                    align={col.textAlign ?? 'left'} 
                                    className={col.nameCol === 'action' ? 'un_flex_center_children_cell' : undefined}
                                >
                                    {row[col.nameCol]}
                                </TableCell>
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
