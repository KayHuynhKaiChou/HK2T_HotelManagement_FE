import { useForm  , SubmitHandler, useWatch, UseFormReturn} from 'react-hook-form'
import { Avatar, Divider, Grid } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { User } from '../../../types/models';
import InputHk2t from '../../../common/InputHk2t';
import SelectHk2t from '../../../common/SelectHk2t';
import provinces from '../../../data/provinces.json';
import districts from '../../../data/districts.json';
import wards from '../../../data/wards.json';
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import RadioBtnHK2t from '../../../common/RadioBtnHK2t';
import { uuid } from '../../../utils';
import { defaultGenders } from '../../../utils/constants';
import { FormUserEmployee } from '../../../types/form';
import UploadFileBtnHk2t from '../../../common/UploadFileBtnHk2t';
import ButtonHk2t from '../../../common/ButtonHk2t';

interface FormUpdateProfileProps {
    user : User;
    onUpdateProfile : (values : FormUserEmployee) => void;
}

export interface FormUpdateProfileHandle {
    form : UseFormReturn<FormUserEmployee>
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

    const generateFirstFormProfile = (): FormUserEmployee => {
        const provinceName = provinces.find(p => p.province_id.toString() == user.city)?.province_name 
        const districtName = districts.find(d => d.district_id.toString() == user.district)?.district_name 

        return {
            ...user,
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
                label : user.ward || defaultLocation.ward.label, 
                value : user.ward || defaultLocation.ward.value
            },
            address : user.address || ''
        }
    }

    // hook form
    const form : UseFormReturn<FormUserEmployee> = useForm({
        defaultValues: generateFirstFormProfile(),
        resolver: yupResolver(schema)
    })

    // useImperativeHandle hook
    useImperativeHandle(ref , () => ({ form }))

    // useWatch
    const selectedGender = useWatch({
        control: form.control,
        name: 'gender'
    })

    const uploadedLinkImage = useWatch({
        control: form.control,
        name: 'link_avatar'
    });

    const selectedCity = useWatch({
        control: form.control,
        name: 'city'
    });

    const selectedDistrict = useWatch({
        control: form.control,
        name: 'district'
    });

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
                value : w["ward_name"]
            }))
        updatedWards.unshift(defaultLocation.ward)
        return selectedDistrict.value 
        ?   updatedWards
        :   []
    },[selectedDistrict])

    // useEffect hook
    useEffect(() => {
        const district = districts.find(d => d.district_id.toString() == selectedDistrict.value)
        if(district?.province_id.toString() !== selectedCity.value){
            form.setValue("district" , {label : '---Choose district---' , value : ''})
        }
    },[selectedCity])

    useEffect(() => {
        const ward = wards.find(w => w.ward_name == form.getValues('ward').value)
        if(ward?.district_id.toString() !== selectedDistrict.value){
            form.setValue("ward" , {label : '---Choose ward---' , value : ''})
        }
    },[selectedDistrict])

    useEffect(() => { // khi render lần 1 thì chưa call api get profile , do đó lần 2 mới set form
        form.reset(generateFirstFormProfile())
    },[user])

    // func change state form
    const handleChangeGender = (gender : FormUserEmployee['gender']) => {       
        form.setValue("gender", gender)
    }

    return (
        <form 
            onSubmit={form.handleSubmit(onUpdateProfile as SubmitHandler<FormUserEmployee>)}
            className='bl_personInfor_form'
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">personal information</div>
                <Divider className="bl_personInfor_divider"/>
                <div className="bl_personInfor_body">
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
                                form={form}
                                name='link_avatar'
                            />
                        </div>
                    </div>
                    <Divider className="bl_personInfor_body_divider" orientation='vertical' flexItem/>
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
                                placeholder='Email' 
                                form={form} 
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='email' 
                                name='email' 
                                placeholder='Password' 
                                form={form} 
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <InputHk2t 
                                label='phone' 
                                name='phone' 
                                placeholder='Password' 
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
                                const value = index + 1 as FormUserEmployee['gender']
                                return (
                                    <Grid>
                                        <RadioBtnHK2t
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
            <div className="bl_btn__login">
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
