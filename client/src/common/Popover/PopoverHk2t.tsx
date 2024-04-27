import { Popover } from "@mui/material";
import { useState } from "react";

interface PropsPopover{
    id : string;

}

export default function PopoverHk2t({
    id
} : PropsPopover) {
    const [isOpen , setIsOpen] = useState(false);

    function handleClose(){
        setIsOpen(false)
    }

    return (
        <Popover
            id={id}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
        >
            aaaaaaaaaaaaaaaa
        </Popover>
    )
}
