import { Divider, Grid } from "@mui/material";
import InputHk2t from "../../../common/InputHk2t";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { colorsBtnCustom, defaultTypeAmenity, defaultstatus } from "../../../utils/constants";
import RadioBtnHk2t from "../../../common/RadioBtnHk2t.tsx";
import { uuid } from "../../../utils";
import ButtonHk2t from "../../../common/ButtonHk2t";
import SelectHk2t from "../../../common/SelectHk2t";
import { FormAmenityPayload } from "../../../types/form";
import { useMemo } from "react";

interface FormAmenityProps {
    onActionProfile : (values : FormAmenityPayload) => void;
}

export default function FormAmenity({
    onActionProfile
} : FormAmenityProps) {

    const schema = yup.object({
        name: yup.string()
            .required('Please enter name !'),
        status:  yup.number()
            .required(),
        type: yup.object().shape({
            label: yup.string().required('Please select city !'),
            value: yup.string().required('Please select city !'),
        }).required('Please select city !') 
    });

    // hook form
    //@ts-ignore
    const form : UseFormReturn<FormAmenityPayload> = useForm({
        defaultValues: {
            name : '',
            type : {
                label: defaultTypeAmenity[0],
                value: '1'
            },
            status : 1
        },
        resolver: yupResolver(schema)
    })

    const selectedStatus = form.watch("status")

    const defaultTypeAmenityOptions = useMemo(() => {
        return defaultTypeAmenity.map((ta, index) => ({
            label: ta,
            value: index + 1
        }))
    },[])

    const handleChangeStatus = (status : number) => {
        form.setValue("status" , status)
    }
    
    return (
        <form 
            onSubmit={form.handleSubmit(onActionProfile as SubmitHandler<FormAmenityPayload>)}
            className='bl_personInfor_form'
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">Form create amenity</div>
                <Divider className="bl_personInfor_divider"/>
                <div className="bl_personInfor_body">
                    <Grid container columnSpacing={3}>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='name' 
                                name='name' 
                                placeholder='name amenity' 
                                form={form} 
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <SelectHk2t 
                                options={defaultTypeAmenityOptions} 
                                label='type amenity' 
                                name='type' 
                                placeholder='select type amenity' 
                                form={form} 
                            />
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
                            <Grid container columnSpacing={3} sx={{margin : "16px 0 8px 0"}}>
                                {defaultstatus.map((status , index) => (
                                    <Grid item>
                                        <RadioBtnHk2t
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
            <div className="bl_btn__submit for_employee">
                <ButtonHk2t
                    colorCustom={ form.formState.isDirty ? colorsBtnCustom['change'] : colorsBtnCustom['primary']}
                    variant="contained"
                    content='Create amenity'
                    isUseForm={true}
                /> 
            </div>
        </form>
    )
}
