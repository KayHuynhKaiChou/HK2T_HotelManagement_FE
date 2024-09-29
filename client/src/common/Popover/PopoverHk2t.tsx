import { Popover, PopoverOrigin } from "@mui/material";
import { ReactElement, forwardRef, useImperativeHandle, useMemo, useState } from "react";

interface PopoverProps{
    id : string;
    children : ReactElement;
    anchorOrigin ?: PopoverOrigin;
    transformOrigin ?: PopoverOrigin;
    onClosePopover ?: () => void;
}

export interface PopoverHandle{
    onOpen : (event: React.MouseEvent<HTMLElement>) => void;
    onClose : () => void;
}

const PopoverHk2t = forwardRef<PopoverHandle , PopoverProps>((props , ref) => {
    const { 
        id , 
        children ,
        anchorOrigin = {
            vertical: 'bottom',
            horizontal: 'right',
        },
        transformOrigin = {
            vertical: 'top',
            horizontal: 'right',
        },
        onClosePopover
    } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    function onOpen(event: React.MouseEvent<HTMLElement>){
        setAnchorEl(event.currentTarget)
    }

    function onClose(){
        setAnchorEl(null)
        onClosePopover && onClosePopover()
    }

    useImperativeHandle(ref , () => ({
        onOpen: (event: React.MouseEvent<HTMLElement>) => onOpen(event),
        onClose: () => onClose()
    }))

    const isOpen = useMemo(() => {
        return !!anchorEl
    },[anchorEl])

    return (
        <Popover
            id={id}
            anchorEl={anchorEl}
            open={isOpen}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
        >
            {children}
        </Popover>
    )
})

export default PopoverHk2t
