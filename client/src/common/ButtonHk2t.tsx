import { Button, IconButton, styled } from "@mui/material";
import React from "react";
import { ColorButtonCustom } from "../types/supportUI";
import { colorsBtnCustom } from "../utils/constants";

type CustomButtonType = Omit<React.ComponentProps<typeof Button> , "color" | "type">
interface propsButton extends Partial<CustomButtonType>{
    typeCustom ?: 'normal' | 'icon'; // 'icon' => use Icon field , 'normal' => use startIcon , endIcon
    colorCustom ?: ColorButtonCustom;
    content ?: string;
    Icon ?: any;
    isUseForm ?: boolean;
}

export default function ButtonHk2t({
    typeCustom = 'normal',
    content = 'button',
    startIcon,
    endIcon,
    disabled = false,
    size = 'small',
    Icon,
    colorCustom = colorsBtnCustom['primary'],
    isUseForm = false
} : propsButton) {

    const ButtonIconCustom = styled(IconButton)({
        borderRadius: '10%',
        color: "#fff",
        ...colorCustom,
        '&:hover': {
            ...colorCustom.hover,
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
        }
    })

    const ButtonCustom = styled(Button)({
        ...colorCustom
    })

    function classifyButton(){
        if(typeCustom == 'normal'){
            return (
                <ButtonCustom 
                    variant="contained"
                    startIcon={startIcon}
                    endIcon={endIcon}
                    disabled={disabled}
                    size={size}
                    type={isUseForm ? 'submit' : 'button'}
                >
                    { content }
                </ButtonCustom>
            )
        }else{
            return(
                <ButtonIconCustom 
                    disabled={disabled}
                >
                    <Icon/>
                </ButtonIconCustom>
            )
        }
    }
    return (
        classifyButton()
    )
}
