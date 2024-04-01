import * as React from 'react';
import Icon from '@mui/material/Icon';

type PropsFontAwesomeIcon = React.ComponentProps<typeof Icon>

export default function FontAwesomeIconHk2t({className , fontSize = 'large' , color = 'inherit'} : PropsFontAwesomeIcon) {

    return (
        <Icon 
            baseClassName="fas" 
            className={className}
            fontSize={fontSize}
            color={color}
            sx={{ fontSize: 50 }}
        />
    )
}
