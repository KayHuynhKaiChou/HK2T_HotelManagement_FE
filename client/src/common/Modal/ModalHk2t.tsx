import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Divider} from "@mui/material";
import {ReactNode} from "react";

interface ModalHk2TProps {
    header?: string;
    heightBody?: string;
    widthModal?: string;
    heightModal?: string;
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

function ModalHk2T({
    header,
    heightBody = '550px',
    widthModal = '1200px',
    heightModal = 'fit-content',
    children,
    open,
    onClose
} : ModalHk2TProps) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: widthModal,
        height: heightModal,
        bgcolor: 'background.paper',
        borderRadius: '20px',
        boxShadow: 24,
        padding: '30px',
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {header && (
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {header}
                    </Typography>
                )}
                <Divider/>
                <div
                    id="modal-modal-description"
                    style={{
                        marginTop: 10,
                        overflowY: 'auto',
                        height: heightBody
                    }}
                >
                    {children}
                </div>
            </Box>
        </Modal>
    );
}

export default ModalHk2T;