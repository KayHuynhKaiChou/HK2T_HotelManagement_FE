import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { MenuAdmin } from "../../../types/supportUI"
import { useEffect, useState } from "react"
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export interface CollapseMenuProps {
    menuAdmin : MenuAdmin;
    open : boolean; // toggle navbar left
}

export default function CollapseMenu ({ menuAdmin , open } : CollapseMenuProps) {
    const navigate = useNavigate();
    const [isOpen , setIsOpen] = useState<boolean>(false);

    const handleCollapse = () => {
        setIsOpen(isOpen => !isOpen)
    }

    return (
        <div className={`un_collapse ${isOpen ? 'is_collapsed' : ''}`}>
            <ListItemButton
                className="bl_listItemBtn"
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                }}
                onClick={handleCollapse}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <menuAdmin.Icon/>
                </ListItemIcon>
                <ListItemText
                    primary={menuAdmin.name}
                    sx={{ opacity: open ? 1 : 0 }}
                />
                {!open ? <></> : isOpen ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Collapse 
                in={isOpen} 
                timeout="auto" 
                unmountOnExit 
                sx={{display : open ? 'inherit' : 'none'}}
            >
                <List component="div" disablePadding>
                    {menuAdmin.childrenMenu.map(({name , Icon , endpoint}) => (
                        <ListItemButton 
                            sx={{ pl: 4 }}
                            onClick={() => navigate(`/admin/${endpoint}`)}
                        >
                            <ListItemIcon>
                                <Icon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </div>
    )
}
