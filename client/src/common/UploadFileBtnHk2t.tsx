import { ChangeEvent } from "react";
import { uuid } from "../utils";
import ButtonHk2t from "./ButtonHk2t";
import { Upload } from "@mui/icons-material";

interface UploadFileBtnHk2tProps {
    form?:any;
    name : string;
    disabled?: boolean;
    className?: string;
    value?: any;
}

export default function UploadFileBtnHk2t(props : UploadFileBtnHk2tProps) {
    const {
        form,
        name = '',
        disabled = false,
        className = '',
        value = ''
    } = props

    const uid = uuid();
    
    // function renderInput(){
    //     if(form){
    //         // const {formState : {errors}} = form;
    //         // const hasError = errors[name]; // thằng này sẽ lưu kiểu boolean do đó ta cần thêm !!
    //         return (
    //             <input 
    //                 {...form.register(name)}
    //                 disabled={disabled}
    //                 type="file"
    //                 className={`un_input ${className}`}
    //             />
    //         )
    //     }else{
    //         return(
    //             <input
    //                 disabled={disabled}
    //                 type="file"
    //                 className={`un_input ${className}`}
    //             />
    //         )
    //     }
    // }
    const handleFileChange = (event : ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                form.setValue(name, base64String)
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='un_uploadFile_wrap'>
            <input
                id={`uploadFile-${uid}`}
                disabled={disabled}
                type="file"
                className={`un_uploadFile ${className}`}
                style={{display : 'none'}}
                onChange={handleFileChange}
            />
            <label htmlFor={`uploadFile-${uid}`}>
                <ButtonHk2t
                    startIcon={<Upload/>}
                    content="upload image"
                    className="un_uploadFile_btn"
                />
            </label>
        </div>
    )
}
