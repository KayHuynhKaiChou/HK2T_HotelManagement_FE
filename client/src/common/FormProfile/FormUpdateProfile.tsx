import { useForm  , SubmitHandler, UseFormReturn, useWatch} from 'react-hook-form'
import { Avatar, Divider, Grid } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { User } from '../../types/models';
import InputHk2t from '../InputHk2t';
import SelectHk2t from '../SelectHk2t';
import provinces from '../../data/provinces.json';
import districts from '../../data/districts.json';
import wards from '../../data/wards.json';
import { forwardRef, useImperativeHandle, useMemo } from 'react';
import RadioBtnHk2t from '../RadioBtnHk2t';
import { uuid } from '../../utils';
import { defaultGenders } from '../../utils/constants';
import { FormUserProfile } from '../../types/form';
import UploadFileBtnHk2t from '../UploadFileBtnHk2t';
import ButtonHk2t from '../ButtonHk2t';
import useEffectSkipFirstRender from '../../hooks/useEffectSkipFirstRender';
import { Dayjs } from 'dayjs';

interface FormUpdateProfileProps {
    user : User;
    onUpdateProfile : (values : FormUserProfile) => void;
}

export interface FormUpdateProfileHandle {
    form : UseFormReturn<FormUserProfile>
}

const FormUpdateProfile = forwardRef<FormUpdateProfileHandle , FormUpdateProfileProps>((props , ref) => {
    const {user , onUpdateProfile} = props;
    const schema = yup.object({
        firstname: yup.string()
        .required('Please enter firstname !'),
        surname: yup.string()
        .required('Please enter surname !'),
        email: yup.string()
        .required('Please enter email !'),
        phone: yup.string()
        .required('Please enter phone !'),
        birth_day: yup.string()
        .required('Please select date !'),
        gender: yup.number()
        .oneOf([1,2] as const)
        .required(),
        link_avatar: yup.string().required(),
        city: yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required(),
        }).required('Please select city !'),
        district: yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required()
        }).required('Please select district !'),
        ward: yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required(),
        }).required('Please select ward !'),
        address: yup.string()
        .required('Please enter current address !'),
    });
    
    const defaultLocation = {
        city : {label : '---Choose province---' , value : ''},
        district : {label : '---Choose district---' , value : ''},
        ward : {label : '---Choose ward---' , value : ''},
    }
    
    const generateFirstFormProfile = (): FormUserProfile => {
        const provinceName = provinces.find(p => p.province_id.toString() == user.city)?.province_name 
        const districtName = districts.find(d => d.district_id.toString() == user.district)?.district_name 
        const wardName = wards.find(d => d.ward_id.toString() == user.ward)?.ward_name
        
        return {
            firstname : user.firstname,
            surname : user.surname,
            email : user.email,
            gender : user.gender || 1,
            phone : user.phone || '',
            birth_day : user.birth_day || '',
            link_avatar : user.link_avatar || '',
            city : {
                label : provinceName || defaultLocation.city.label , 
                value : user.city || defaultLocation.city.value
            },
            district : {
                label : districtName || defaultLocation.district.label , 
                value : user.district || defaultLocation.district.value
            },
            ward : {
                label : wardName || defaultLocation.ward.label, 
                value : user.ward || defaultLocation.ward.value
            },
            address : user.address || ''
        }
    }
    
    // hook form
    const form : UseFormReturn<FormUserProfile> = useForm({
        defaultValues: generateFirstFormProfile(),
        // @ts-ignore
        resolver: yupResolver(schema)
    }) as UseFormReturn<FormUserProfile>

    // useImperativeHandle hook
    useImperativeHandle(ref , () => ({ form }))

    // useWatch
    const selectedGender = useWatch({ control: form.control, name: "gender" });
    const uploadedLinkImage = useWatch({ control: form.control, name: "link_avatar" });
    const selectedCity = useWatch({ control: form.control, name: "city" });
    const selectedDistrict = useWatch({ control: form.control, name: "district" });
    const selectedWard = useWatch({ control: form.control, name: "ward" });

    // useMemo hook
    const optionProvinces = useMemo(() => {
        return provinces.map((p) => ({
            label : p["province_name"],
            value : p["province_id"].toString()
        }))
    },[])

    const optionDistrict = useMemo(() => {
        const updatedDistricts = districts
            .filter((d) => d["province_id"].toString() == selectedCity.value)
            .map((d) => ({
                label : d["district_name"],
                value : d["district_id"].toString()
            }))
        updatedDistricts.unshift(defaultLocation.city)
        return selectedCity.value 
        ?   updatedDistricts
        :   []
    },[selectedCity])

    const optionWards = useMemo(() => {
        const updatedWards = wards
            .filter((w) => w["district_id"].toString() == selectedDistrict.value)
            .map((w) => ({
                label : w["ward_name"],
                value : w["ward_id"].toString()
            }))
        updatedWards.unshift(defaultLocation.ward)
        return selectedDistrict.value 
        ?   updatedWards
        :   []
    },[selectedDistrict])

    // useEffect hook
    useEffectSkipFirstRender(() => {
        const district = districts.find(d => d.district_id.toString() == selectedDistrict.value)
        if(district?.province_id.toString() !== selectedCity.value){
            form.setValue("district" , {label : '---Choose district---' , value : ''})
        }
    },[selectedCity])

    useEffectSkipFirstRender(() => {
        const ward = wards.find(w => w.ward_id.toString() == selectedWard.value)
        if(ward?.district_id.toString() !== selectedDistrict.value){
            form.setValue("ward" , {label : '---Choose ward---' , value : ''})
        }
    },[selectedDistrict])

    // func change state form
    const handleChangeGender = (gender : FormUserProfile['gender']) => {       
        form.setValue("gender", gender)
    }

    const handleUploadImages = (images : Array<string | ArrayBuffer | null>) => {
        form.setValue("link_avatar", images[0] + '')
    }

    const handleChangeDatePicker = (dateRange: Dayjs | null) => {
        dateRange && form.setValue("birth_day", dateRange.format('YYYY-MM-DD'))
    }

    return (
        <form 
            onSubmit={form.handleSubmit(onUpdateProfile as SubmitHandler<FormUserProfile>)}
            className='bl_personInfor_form'
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">personal information</div>
                <Divider className="bl_personInfor_divider"/>
                <div className="bl_personInfor_body">
                    {user.position != 4 && (
                        <>                       
                            <div className="bl_personInfor_body_background">
                                <Avatar
                                    className='bl_personInfor_background_avatar'
                                    src={uploadedLinkImage} 
                                />
                                <div className="bl_personInfor_background_fullName">
                                    {`${user.firstname} ${user.surname}`}
                                </div>
                                <div className="bl_personInfor_background_btnUpload">
                                    <UploadFileBtnHk2t
                                        onUploadImages={handleUploadImages}
                                    />
                                </div>
                            </div>
                            <Divider className="bl_personInfor_body_divider" orientation='vertical' flexItem/>
                        </>
                    )}
                    <Grid container columnSpacing={3}>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='firstname' 
                                name='firstname' 
                                placeholder='firstname' 
                                form={form} 
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='surname' 
                                name='surname' 
                                placeholder='surname' 
                                form={form} 
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='email' 
                                name='email' 
                                placeholder='email' 
                                form={form} 
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='phone' 
                                name='phone' 
                                placeholder='phone' 
                                form={form} 
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='birth day' 
                                name='birth_day' 
                                typeInput='date' 
                                placeholder='select birthdate' 
                                form={form}
                                onChangeDatePicker={handleChangeDatePicker}
                            />
                        </Grid>
                        <Grid item sm={6} container alignItems={"center"}>
                            <Grid
                                sx={{
                                    color : "#707e9c;" , 
                                    fontWeight : "bold",
                                    marginRight : 4
                                }}
                            >
                                Gender
                            </Grid>
                            {defaultGenders.map((gender , index) => {
                                const value = index + 1 as FormUserProfile['gender']
                                return (
                                    <Grid>
                                        <RadioBtnHk2t
                                            id={`select-gender-${uuid()}`}
                                            name="gender"
                                            label={gender}
                                            value={value}
                                            checked={selectedGender == value}
                                            form={form}
                                            onChange={() => handleChangeGender(value)}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">location</div>
                <Divider className="bl_personInfor_divider"/>
                <Grid container columnSpacing={3}>
                    <Grid item sm={4}>
                        <SelectHk2t 
                            options={optionProvinces} 
                            label='city' 
                            name='city' 
                            placeholder='city' 
                            form={form} 
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <SelectHk2t 
                            options={optionDistrict} 
                            label='district' 
                            name='district' 
                            placeholder='district' 
                            form={form} 
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <SelectHk2t 
                            options={optionWards} 
                            label='ward' 
                            name='ward' 
                            placeholder='ward' 
                            form={form} 
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <InputHk2t 
                            label='address' 
                            name='address' 
                            placeholder='address' 
                            form={form} 
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={`bl_btn__submit ${user.position != 4 ? 'for_employee' : 'for_customer'}`}>
                <ButtonHk2t
                    variant="contained"
                    content='update profile'
                    isUseForm={true}
                /> 
            </div>
        </form>
    )
})

export default FormUpdateProfile
