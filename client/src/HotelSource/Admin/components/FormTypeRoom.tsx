// react-hook-form
import { useForm  , SubmitHandler, UseFormReturn, useWatch} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// MUI
import { Divider, Grid } from '@mui/material'
// hook
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import useEffectSkipFirstRender from '../../../hooks/useEffectSkipFirstRender';
//model
import { TypeAmenity, TypeObjAmenity, TypeRoom} from '../../../types/models';
//common
import InputHk2t from '../../../common/InputHk2t';
import ButtonHk2t from '../../../common/ButtonHk2t';
import CheckboxHk2t from '../../../common/CheckboxHk2t';
import RichTextEditorHk2t from '../../../common/RichTextEditor/RichTextEditorHk2t';
import RadioBtnHk2t from '../../../common/RadioBtnHk2t.tsx';
import UploadFileBtnHk2t from '../../../common/UploadFileBtnHk2t';
// util
import { uuid } from '../../../utils';
// constants
import { colorsBtnCustom, defaultstatus, defaultViewDirection } from '../../../utils/constants';
import SliderImagesRoom from './SliderImagesRoom';
import { ActionForm } from '../../../types/form';
import { Delete } from '@mui/icons-material';
import { uploadImageService } from '../../../lib/api/image';

interface FormTypeRoomProps {
    selectedTypeRoom ?: TypeRoom;
    typesObjAmenity : TypeObjAmenity;
    typeActionForm : ActionForm;
    onActionTypeRoom : (values : TypeRoom) => void;
}

export interface FormTypeRoomHandle {
    form : UseFormReturn<TypeRoom>;
}

const FormTypeRoom = forwardRef<FormTypeRoomHandle , FormTypeRoomProps>((props , ref) => {
    const {selectedTypeRoom , typesObjAmenity , typeActionForm , onActionTypeRoom} = props;
    const formInnerRef = useRef<HTMLFormElement | null>(null);
    const [indexImage , setIndexImage] = useState<number>(0);

    const schema = yup.object({
        title: yup.string()
                .required('Please enter title !'),
        size: yup.number()
                .required('Please enter size !'),
        // preferential_services: yup.string()
        //         .required('Please enter text editor !'),
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
                .min(1, 'Must contain at least one amenity !'),
        images: yup.array().of(yup.string())
                .required()
                .min(1, 'Must contain at least one image !'),
        status: yup.number()
                .oneOf([0,1] as const)
                .required()
    });

    // hook form
    const form : UseFormReturn<TypeRoom> = useForm({
        defaultValues: selectedTypeRoom,
        resolver: yupResolver(schema)
    }) as UseFormReturn<TypeRoom>

    // useImperativeHandle hook
    useImperativeHandle(ref , () => ({ form }))

    // use watch
    const uploadedImages = useWatch({ control: form.control, name: "images"});
    const selectedViewDirection = useWatch({ control: form.control, name: "view_direction"});
    const selectedAmenities = useWatch({ control: form.control, name: "amenities"});
    const inputtedPreferentialServices = useWatch({ control: form.control, name: "preferential_services"});
    const selectedStatus = useWatch({ control: form.control, name: "status"})

    // error fields
    const { errors } = form.formState

    // func change state form
    const handleDeleteImage = () => {
        const filterImages = uploadedImages.filter((_ , index) => index !== indexImage)
        form.setValue(
            "images",
            filterImages,
            { shouldDirty: true }
        )
    }

    const handleChangeViewDirection = (value : TypeRoom['view_direction']) => {       
        form.setValue("view_direction", value, { shouldDirty: true });
    }
    
    const handleChangeCheckAmenity = (id : number) => {
        let currentSelectedAmenities = form.getValues("amenities");
        if(currentSelectedAmenities.includes(id)){
            currentSelectedAmenities = currentSelectedAmenities.filter(ameId => ameId != id)
        }else{
            currentSelectedAmenities.push(id);
        }
        form.setValue(
            "amenities", 
            currentSelectedAmenities, 
            { shouldDirty: true }
        )
    }

    const handleChangePreferentialServices = (textEditor : string) => {
        form.setValue("preferential_services" , textEditor, { shouldDirty: true })
    }

    const handleChangeStatus = (index : TypeRoom['status']) => {
        form.setValue("status" , index , { shouldDirty: true })
    }

    const handleUploadImages = async (base64s : Array<string | ArrayBuffer | null>) => {
        const promiseImages = base64s.map((base64) => {
            return new Promise(
                async (resolve , reject) => {
                    try {
                        let data = new FormData()
                        data.append('image', (base64 + '').replace('data:', '').replace(/^.+,/, ''))
                        const res = await uploadImageService(data)
                        resolve(res.data.url)
                    } catch (error) {
                        reject(error)
                    }
                }
            )
        }) as Promise<string>[]

        const images = await Promise.all(promiseImages)
        form.setValue(
            "images" , 
            [...uploadedImages , ...images],
            { shouldDirty: true }
        )       
    }

    // useMemo
    const keyWordForm = useMemo(() => {
        return typeActionForm === 'CREATE' ? 'create' : 'update'
    },[typeActionForm])

    // useEffect
    useEffectSkipFirstRender(() => {
        if (form.formState.isSubmitSuccessful) {
            form.reset(selectedTypeRoom)
        }
    },[selectedTypeRoom])

    const handleError = (e: any) => {
        console.log(e)
    }

    return (
        <form 
            onSubmit={form.handleSubmit(onActionTypeRoom as SubmitHandler<TypeRoom>, handleError)}
            className='bl_personInfor_form'
            ref={formInnerRef}
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">Form {keyWordForm} type room</div>
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
                                        width : 150
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
                            <Grid item sm={11} container spacing={3} alignItems={"center"}>
                                <Grid
                                    item
                                    sx={{
                                        color : "#707e9c;" , 
                                        fontWeight : "bold",
                                        width : 150
                                    }}
                                >
                                    Status
                                </Grid>
                                {defaultstatus.map((status , index) => (
                                    <Grid item>
                                        <RadioBtnHk2t
                                            id={`select-status-${uuid()}`}
                                            name="status"
                                            label={status}
                                            value={index}
                                            checked={selectedStatus == index}
                                            form={form}
                                            onChange={() => handleChangeStatus(index as TypeRoom['status'])}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item sm={6} container rowSpacing={1}>
                            <Grid item sm={12} container alignItems={"flex-start"}>
                                <Grid
                                    item
                                    sm={6}
                                    sx={{color : "#707e9c", fontWeight : "bold"}}
                                >
                                    Images
                                </Grid>
                                <Grid
                                    item
                                    sm={6}
                                    container
                                    justifyContent={'flex-end'}
                                >
                                    <UploadFileBtnHk2t
                                        onUploadImages={handleUploadImages}
                                    />
                                    <ButtonHk2t
                                        startIcon={<Delete/>}
                                        content='Delete'
                                        colorCustom={colorsBtnCustom['danger']}
                                        sx={{marginLeft : '10px'}}
                                        disabled={uploadedImages.length == 0}
                                        onClick={handleDeleteImage}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item sm={12} sx={{color: "#ff0000", fontSize: "1rem"}}>
                                {errors?.images && errors.images.message}
                            </Grid>
                            <Grid item sm={12} style={{overflowX : 'auto'}}>
                                <SliderImagesRoom 
                                    imageLinks={uploadedImages}
                                    onChangeImage={(index : number) => setIndexImage(index)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={3}>
                        <Grid item sm={6} container spacing={3}>
                            <Grid
                                item
                                sm={12}
                                sx={{
                                    marginRight : 4
                                }}
                                container
                            >
                                <Grid item sm={3} sx={{color : "#707e9c;" , fontWeight : "bold",}}>
                                    Amenities
                                </Grid>
                                <Grid item sm={9} sx={{color: "#ff0000", fontSize: "1rem"}}>
                                    {errors?.amenities && errors.amenities.message}
                                </Grid>
                            </Grid>
                            {Object.keys(typesObjAmenity).map((key) => {
                                const keyTypeObjAmenity = key as TypeAmenity 
                                const amenities = typesObjAmenity[keyTypeObjAmenity]
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
                                                        onChange={() => handleChangeCheckAmenity(ame.id || 0)}
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
                                Preferential Services
                            </Grid>
                            <Grid item sm={12}>
                                <RichTextEditorHk2t
                                    textEditor={inputtedPreferentialServices || ''}
                                    onChangeTextEditor={handleChangePreferentialServices}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="bl_btn__submit for_employee">
                <ButtonHk2t
                    colorCustom={ form.formState.isDirty ? colorsBtnCustom['change'] : colorsBtnCustom['primary']}
                    variant="contained"
                    content={`${keyWordForm} type room`}
                    isUseForm={true}
                /> 
            </div>
        </form>
    )
})

export default FormTypeRoom
