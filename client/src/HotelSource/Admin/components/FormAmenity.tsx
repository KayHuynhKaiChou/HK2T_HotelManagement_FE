import { Divider, Grid } from "@mui/material";
import InputHk2t from "../../../common/InputHk2t";
import { Amenity } from "../../../types/models";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { defaultstatus } from "../../../utils/constants";
import RadioBtnHK2t from "../../../common/RadioBtnHK2t";
import { uuid } from "../../../utils";

interface FormAmenityProps {
    onActionProfile : (values : Amenity) => void;
}

export default function FormAmenity({onActionProfile} : FormAmenityProps) {

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
            onSubmit={form.handleSubmit(onActionProfile as SubmitHandler<Amenity>)}
            className='bl_personInfor_form'
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">Form add amenity</div>
                <Divider className="bl_personInfor_divider"/>
                <div className="bl_personInfor_body">
                    <Grid container columnSpacing={3}>
                        <Grid item sm={6}>
                            <InputHk2t 
                                label='name' 
                                name='name' 
                                placeholder='name' 
                                form={form} 
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <Grid
                                sx={{
                                    color : "#707e9c;" , 
                                    fontWeight : "bold",
                                    margin: "0 30px"
                                }}
                            >
                                Status
                            </Grid>
                            <Grid container columnSpacing={3} sx={{margin : "16px 0 8px 0"}}>
                                {defaultstatus.map((status , index) => (
                                    <Grid item>
                                        <RadioBtnHK2t
                                            id={`select-gender-${uuid()}`}
                                            name="gender"
                                            label={status}
                                            value={index}
                                            checked={selectedStatus == index}
                                            form={form}
                                            onChange={() => handleChangeStatus(index)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </form>
    )
}
