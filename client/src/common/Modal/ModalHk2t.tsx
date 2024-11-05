import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Divider} from "@mui/material";
import {ReactNode} from "react";

interface ModalHk2TProps {
    header?: string;
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    height: 650,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    padding: '30px',
};

function ModalHk2T({
    header,
    children,
    open,
    onClose
} : ModalHk2TProps) {

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
                        overflowY: 'scroll',
                        height: '550px'
                    }}
                >
                    {children}
                </div>
            </Box>
        </Modal>
    );
}

export default ModalHk2T;