import { Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";
import { noop } from "../../utils/noop";
import ButtonHk2t from "../ButtonHk2t";
import { colorsBtnCustom } from "../../utils/constants";

type TypeDialog = 'CONFIRM' | 'ERROR'

type DialogContextProps = {
    show: (comp: JSX.Element, callback?: () => void, typeDialog?: TypeDialog) => void;
    hide: (callback?: () => void) => void
}

const defaultProps = {
    show: () => {},
    hide: () => {}
}

export const DialogHk2tContext = createContext<DialogContextProps>(defaultProps)

export const DialogHk2tProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [contentComp, setContentComp] = useState(<></>);
    const [typeDialog, setTypeDialog] = useState<TypeDialog>('ERROR')
    const ref = useRef<() => void>()

    const show : DialogContextProps['show'] = useCallback(
        (comp, callback, type) => {
            type && type !== typeDialog && setTypeDialog(type)
            setOpen(true)
            setContentComp(comp)
            ref.current = callback || noop
        },
        [open]
    )

    const hide : DialogContextProps['hide'] = useCallback(
        (callback) => {
            setOpen(false)

            if(callback && typeof callback === 'function'){
                callback()
                ref.current = noop
            } else if (ref.current){
                ref.current()
            }
        },
        [open]
    )

    const cancel = () => {
        setOpen(false)
        ref.current = noop
    }

    return (
        <DialogHk2tContext.Provider value={{ show, hide }}>
            {children}
            <Dialog
                open={open}
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent dividers>
                    <DialogContentText 
                        id="alert-dialog-description"
                        style={{ color: 'black' }}
                    >
                        {contentComp}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {typeDialog === 'ERROR' ? (
                        <ButtonHk2t
                            content='OK'
                            onClick={() => hide()}
                        />
                    ) : (
                        <>
                            <ButtonHk2t
                                content='OK'
                                onClick={() => hide()}
                            />
                            <ButtonHk2t
                                colorCustom={colorsBtnCustom['danger']}
                                content='CANCEL'
                                onClick={() => cancel()}
                            />
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </DialogHk2tContext.Provider>
    )
}

export function useDialogHk2t(): DialogContextProps {
    return useContext(DialogHk2tContext)
}
