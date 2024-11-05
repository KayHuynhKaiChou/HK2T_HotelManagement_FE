import { ChangeEvent, useRef } from "react";
import { uuid } from "../utils";
import ButtonHk2t from "./ButtonHk2t";
import { Upload } from "@mui/icons-material";
interface UploadFileBtnHk2tProps {
    onUploadImages : (images : Array<string | ArrayBuffer | null>) => void;
    disabled?: boolean;
    className?: string;
}

export default function UploadFileBtnHk2t(props : UploadFileBtnHk2tProps) {
    const {
        onUploadImages,
        disabled = false,
        className = ''
    } = props

    const uid = uuid();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = async (event : ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files && event.target.files;
        if (files) {
            const promises = Array.from(files).map((file) => {
                return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        // ko thể dùng reader.result.replace('data:', '').replace(/^.+,/, '')
                        // vì cho vô field src nó ko hiện ảnh
                        // do đó lúc call api mới dùng .replace('data:', '').replace(/^.+,/, '')
                        resolve(reader.result || '');
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });
    
            try {
                const base64Strings = await Promise.all(promises);
                onUploadImages(base64Strings);
            } catch (error) {
                console.error("Error reading files: ", error);
            }
        }
        // Reset giá trị của input file để đảm bảo sự kiện `onChange` được kích hoạt lại khi chọn cùng file
        if(inputRef.current) {
            inputRef.current.value = ''
        }
    };

    const handleClickBtn = () => {
        document.getElementById(`uploadFile-${uid}`)?.click();
    }

    return (
        <div className='un_uploadFile_wrap'>
            <input
                ref={inputRef}
                id={`uploadFile-${uid}`}
                disabled={disabled}
                type="file"
                multiple
                className={`un_uploadFile ${className}`}
                style={{display : 'none'}}
                onChange={handleFileChange}
            />
            <label htmlFor={`uploadFile-${uid}`} onClick={handleClickBtn}>
                <ButtonHk2t
                    id={`uploadFile-${uid}`}
                    startIcon={<Upload/>}
                    content="upload image"
                    className="un_uploadFile_btn"
                />
            </label>
        </div>
    )
}
