import { Backdrop, CircularProgress } from '@mui/material';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Oval } from 'react-loader-spinner';

type LoadingContextProps = {
    show: (message?: string) => void;
    hide: () => void
}

const defaultProps = {
    show: () => {},
    hide: () => {}
}

export const LoadingHk2tScreenContext = createContext<LoadingContextProps>(defaultProps)

export const LoadingHk2tScreenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Loading')

    const show = (message?: string) => {
        message && setMessage(message)
        setOpen(true)
    }

    const hide = () => setOpen(false)

    return (
        <LoadingHk2tScreenContext.Provider value={{ show, hide }}>
            {children}
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <CircularProgress color="inherit" />
                    <p>{message} . . .</p>
                </div>
            </Backdrop>
        </LoadingHk2tScreenContext.Provider>
    )
}

export function useLoadingHk2tScreen(): LoadingContextProps {
    return useContext(LoadingHk2tScreenContext)
}