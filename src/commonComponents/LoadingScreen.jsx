import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LoadingScreen({ className }) {
    return (
        <div className={`z-50 flex h-full w-full flex-col items-center justify-center ${className}`}>
            {/* <img src="/loading.gif" alt="" className="w-40" /> */}
            <DotLottieReact src="/loading.lottie" loop autoplay />
        </div>
    );
}
