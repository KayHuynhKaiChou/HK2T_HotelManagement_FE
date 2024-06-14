import { useForm  , SubmitHandler, UseFormReturn} from 'react-hook-form'
import { Divider, Grid } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { forwardRef, useImperativeHandle } from 'react';
import { TypeAmenity, TypeRoom, User } from '../../../types/models';
import InputHk2t from '../../../common/InputHk2t';
import ButtonHk2t from '../../../common/ButtonHk2t';
import typeAmenity from '../../../data/amenities.json';
import CheckboxHk2t from '../../../common/CheckboxHk2t';
import { uuid } from '../../../utils';
import RichTextEditorHk2t from '../../../common/RichTextEditor/RichTextEditorHk2t';
import { defaultViewDirection } from '../../../utils/constants';
import RadioBtnHk2t from '../../../common/RadioBtnHk2t';
import SliderImagesRoom from './SliderImagesRoom';
import UploadFileBtnHk2t from '../../../common/UploadFileBtnHk2t';

interface FormTypeRoomProps {
    user : User;
    onActionTypeRoom : (values : TypeRoom) => void;
}

export interface FormTypeRoomHandle {
    form : UseFormReturn<TypeRoom>;
}

const FormTypeRoom = forwardRef<FormTypeRoomHandle , FormTypeRoomProps>((props , ref) => {
    const {user , onActionTypeRoom} = props;

    const schema = yup.object({
        title: yup.string()
                .required('Please enter title !'),
        size: yup.number()
                .required('Please enter size !'),
        preferential_services: yup.string()
                .required('Please enter text editor !'),
        view_direction: yup.number()
                .oneOf([1,2] as const)
                .required(),
        adult_capacity: yup.number()
                .required('Please enter capacity of adult !'),
        kids_capacity: yup.number()
                .required('Please enter capacity of kids !'),
        base_price: yup.number()
                .required('Please enter base price !'),
        amenities: yup.array()
                .of(yup.number())
                .required()
                .min(1, 'Must contain at least one amenity'),
        images: yup.array()
                .of(yup.string())
                .required()
                .min(1, 'Must contain at least one image'),
        status: yup.number()
                .oneOf([0,1] as const)
                .required()
    });

    // hook form
    const form : UseFormReturn<TypeRoom> = useForm({
        defaultValues: {
            title : '',
            preferential_services : '',
            view_direction : 1,
            size : 0,
            adult_capacity : 0,
            kids_capacity : 0,
            base_price : 0,
            amenities : [],
            images : [''],
            status : 0
        },
        resolver: yupResolver(schema)
    }) as UseFormReturn<TypeRoom>

    // useImperativeHandle hook
    useImperativeHandle(ref , () => ({ form }))

    // use watch
    const uploadedImages = form.watch("images" , []);
    const selectedViewDirection = form.watch("view_direction" , 1);
    const selectedAmenities = form.watch("amenities" , [])
    console.log(uploadedImages.length)

    // func change state form
    const handleChangeViewDirection = (value : TypeRoom['view_direction']) => {       
        form.setValue("view_direction", value);
    }
    
    const handleChangeCheckAmenity = (id : number) => {
        let currentSelectedAmenities = form.getValues("amenities");
        if(currentSelectedAmenities.includes(id)){
            currentSelectedAmenities = currentSelectedAmenities.filter(ameId => ameId != id)
        }else{
            currentSelectedAmenities.push(id);
        }
        form.setValue("amenities" , currentSelectedAmenities)
    }

    return (
        <form 
            onSubmit={form.handleSubmit(onActionTypeRoom as SubmitHandler<TypeRoom>)}
            className='bl_personInfor_form'
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">Form create type room</div>
                <Divider className="bl_personInfor_divider"/>
                <div className="bl_personInfor_body">
                    <Grid container columnSpacing={3}>
                        <Grid item sm={6} container columnSpacing={3}>
                            <Grid item sm={11}>
                                <InputHk2t
                                    label='title' 
                                    name='title' 
                                    placeholder='title' 
                                    form={form} 
                                />
                            </Grid>
                            <Grid item sm={11}>
                                <InputHk2t 
                                    typeInput='number'
                                    label='size' 
                                    name='size' 
                                    placeholder='size' 
                                    form={form} 
                                />
                            </Grid>
                            <Grid item sm={11}>
                                <InputHk2t 
                                    typeInput='number'
                                    label='adult capacity' 
                                    name='adult_capacity' 
                                    placeholder='adult capacity' 
                                    form={form} 
                                />
                            </Grid>
                            <Grid item sm={11}>
                                <InputHk2t 
                                    label='kids capacity' 
                                    name='kids_capacity' 
                                    placeholder='kids capacity' 
                                    form={form} 
                                />
                            </Grid>
                            <Grid item sm={11}>
                                <InputHk2t 
                                    typeInput='number' 
                                    label='base price' 
                                    name='base_price' 
                                    placeholder='base price' 
                                    form={form} 
                                />
                            </Grid>
                            <Grid item sm={11} container spacing={3} alignItems={"center"} marginBottom={3}>
                                <Grid
                                    item
                                    sx={{
                                        color : "#707e9c;" , 
                                        fontWeight : "bold",
                                        marginRight : 4
                                    }}
                                >
                                    View direction
                                </Grid>
                                {defaultViewDirection.map((vd , index) => {
                                    const value = index + 1 as TypeRoom['view_direction']
                                    return (
                                        <Grid item>
                                            <RadioBtnHk2t
                                                id={`select-view-dir-${uuid()}`}
                                                name="view_direction"
                                                label={vd}
                                                value={value}
                                                checked={selectedViewDirection == value}
                                                form={form}
                                                onChange={() => handleChangeViewDirection(value)}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Grid>
                        <Grid item sm={6} container rowSpacing={1}>
                            <Grid item sm={12} container>
                                <Grid
                                    item
                                    sx={{
                                        color : "#707e9c;" , 
                                        fontWeight : "bold",
                                        marginRight : 4
                                    }}
                                >
                                    Room images
                                </Grid>
                                <UploadFileBtnHk2t
                                    form={form}
                                    name="images"
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <SliderImagesRoom/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={3}>
                        <Grid item sm={6} container spacing={3}>
                            <Grid
                                item
                                sm={12}
                                sx={{
                                    color : "#707e9c;" , 
                                    fontWeight : "bold",
                                    marginRight : 4
                                }}
                            >
                                Amenities
                            </Grid>
                            {Object.keys(typeAmenity).map((key) => {
                                const keyTypeObjAmenity = key as TypeAmenity 
                                const amenities = typeAmenity[keyTypeObjAmenity]
                                return (
                                    <Grid item sm={11} container spacing={3}>
                                        <Grid item sm={3}>{key}</Grid>
                                        <Grid item sm={9} container spacing={3}>
                                            {amenities.map(ame => (
                                                <Grid item>
                                                    <CheckboxHk2t
                                                        id={`checkbox-amenity-by-type-${uuid()}`}
                                                        label={ame.name}
                                                        checked={selectedAmenities.includes(ame.id)}
                                                        onChange={() => handleChangeCheckAmenity(ame.id)}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>

                                )
                            })}
                        </Grid>
                        <Grid item sm={6} container spacing={3}>
                            <Grid
                                item
                                sm={12}
                                sx={{
                                    color : "#707e9c;" , 
                                    fontWeight : "bold",
                                    marginRight : 4
                                }}
                            >
                                Text Editor
                            </Grid>
                            <Grid item sm={12}>
                                <RichTextEditorHk2t
                                    textEditor='ss'
                                    onChangeTextEditor={() => console.log('')}
                                />
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
})

export default FormTypeRoom
