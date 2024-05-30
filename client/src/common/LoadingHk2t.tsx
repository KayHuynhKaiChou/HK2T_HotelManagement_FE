import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

export default function LoadingHk2t() {
    useEffect(() => {
        const loadingElement = document.querySelector('.un_loading');
        const parentElement = loadingElement?.parentElement
        parentElement!.style.position = "relative";
        parentElement!.style.opacity = "0.6"

        return () => {
            parentElement!.style.position = "unset";
            parentElement!.style.opacity = "unset";
        }
    },[])

    return (
        <div className='un_loading'>
            <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{
                    height : '100%',
                    width : '100%',
                    justifyContent : 'center',
                    alignItems : 'center',
                    position : 'absolute',
                    zIndex : '99',
                }}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    )
}