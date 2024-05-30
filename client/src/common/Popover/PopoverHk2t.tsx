import { Popover } from "@mui/material";
import { ReactElement, forwardRef, useImperativeHandle, useMemo, useState } from "react";

interface PopoverProps{
    id : string;
    children : ReactElement;
}

export interface PopoverHandle{
    onOpen : (event: React.MouseEvent<HTMLElement>) => void;
    onClose : () => void;
}

const PopoverHk2t = forwardRef<PopoverHandle , PopoverProps>((props , ref) => {
    const { id , children } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    function onOpen(event: React.MouseEvent<HTMLElement>){
        setAnchorEl(event.currentTarget)
    }

    function onClose(){
        setAnchorEl(null)
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
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            {children}
        </Popover>
    )
})

export default PopoverHk2t
