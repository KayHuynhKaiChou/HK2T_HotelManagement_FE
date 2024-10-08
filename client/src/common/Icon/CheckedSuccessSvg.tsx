import SvgIcon from '@mui/material/SvgIcon';

export default function CheckedSuccessSvg() {
    return (
        <SvgIcon>
            <svg
                className="bk-icon -streamline-checkmark_selected"
                fill="#008009"
                height="16"
                role="presentation"
                width="16"
                viewBox="0 0 128 128"
                aria-hidden="true"
                focusable="false"
            >
                <path 
                    d="M56.62 93.54a4 4 0 0 1-2.83-1.18L28.4 67a4 4 0 1 1 5.65-5.65l22.13 22.1 33-44a4 4 0 1 1 6.4 4.8L59.82 91.94a4.06 4.06 0 0 1-2.92 1.59zM128 64c0-35.346-28.654-64-64-64C28.654 0 0 28.654 0 64c0 35.346 28.654 64 64 64 35.33-.039 63.961-28.67 64-64zm-8 0c0 30.928-25.072 56-56 56S8 94.928 8 64 33.072 8 64 8c30.914.033 55.967 25.086 56 56z"
                ></path>
            </svg>
        </SvgIcon>
    );
}
