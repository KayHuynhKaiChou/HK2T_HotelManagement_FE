import { Divider, Grid } from "@mui/material";
import InputHk2t from "../../../common/InputHk2t";
import { Room } from "../../../types/models";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import RadioBtnHk2t from "../../../common/RadioBtnHk2t";
import { uuid } from "../../../utils";
import ButtonHk2t from "../../../common/ButtonHk2t";
import SelectHk2t from "../../../common/SelectHk2t";

interface FormRoomProps {
    onActionRoom : (values : Room) => void;
}

export default function FormRoom({onActionRoom} : FormRoomProps) {

    const schema = yup.object({
        name: yup.string()
                .required('Please enter firstname !'),
        status:  yup.number()
                .oneOf([0,1] as const)
                .required(),
    });

    // hook form
    const form = useForm({
        defaultValues: {
            name : '',
            status : 0
        },
        resolver: yupResolver(schema)
    })

    const selectedStatus = form.watch("status")

    const handleChangeStatus = (status : number) => {
        form.setValue("status" , status)
    }
    
    return (
        <form 
            onSubmit={form.handleSubmit(onActionRoom as SubmitHandler<Room>)}
            className='bl_personInfor_form'
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">Form create Room</div>
                <Divider className="bl_personInfor_divider"/>
                <div className="bl_personInfor_body">
                    <Grid container columnSpacing={3}>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='name' 
                                name='name' 
                                placeholder='name Room' 
                                form={form} 
                            />
                        </Grid>
                        <Grid item sm={4}>
                        </Grid>
                        <Grid item sm={4}>
                            <Grid
                                sx={{
                                    color : "#707e9c;" , 
                                    fontWeight : "bold",
                                    margin: "0 30px"
                                }}
                            >
                                Status
                            </Grid>
                            <Grid container columnSpacing={3}>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="bl_btn__submit for_employee">
                <ButtonHk2t
                    variant="contained"
                    content='Create type room'
                    isUseForm={true}
                /> 
            </div>
        </form>
    )
}
