import * as React from 'react';
import Icon from '@mui/material/Icon';

type CustomIconType = Omit<React.ComponentProps<typeof Icon> , 'fontSize'>
interface PropsFontAwesomeIcon extends Partial<CustomIconType> {
    fontSizeCustom : number
}

export default function FontAwesomeIconHk2t({className , fontSizeCustom = 50 , color = 'inherit'} : PropsFontAwesomeIcon) {

    return (
        <Icon 
            baseClassName="fas" 
            className={className}
            color={color}
            sx={{ fontSize: fontSizeCustom }}
        />
    )
}
