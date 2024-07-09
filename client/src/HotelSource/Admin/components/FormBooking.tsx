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

interface FormBookingProps {
    onAction : (values : any) => void;
}

export default function Form({onAction} : FormBookingProps) {

    const schema = yup.object({
        email: yup.string()
                .required('Please enter email !'),
        typeRoom: yup.number() // ban đầu disable , khi chọn adult và kids sau sẽ filter ra list type room phù hợp
                .required('Please select type room !'),
        first_adult_capacity: yup.number()
                .required('Please enter quantity adult !'),
        first_kid_capacity: yup.number()
                .required('Please enter quantity kids !'),
        check_in: yup.string()
                .required('Please enter check in !'),
        check_out: yup.string()
                .required('Please enter check out !'),
        room: yup.string() // tự động lấy phòng gần nhất chưa ai booking
                .required('Please enter firstname !'),
    });

    // hook form
    const form = useForm({
        defaultValues: {
            email : '',
            typeRoom : '',
            first_adult_capacity : 0,
            first_kid_capacity : 0,
            check_in : '',
            check_out : '',
            room : ''
        },
        resolver: yupResolver(schema)
    })

    // const selectedStatus = form.watch("status")

    // const handleChangeStatus = (status : number) => {
    //     form.setValue("status" , status)
    // }
    
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
