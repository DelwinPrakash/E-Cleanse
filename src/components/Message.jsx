import { useEffect, useRef } from 'react';
import { ReactTyped } from 'react-typed';

export default function Message({ sender, text }) {
    const messageEndRef = useRef(null);

    const isUser = sender === 'user';

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [sender, text]);

    return (
        <div className={`bg-red-500 flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`flex p-2 max-w-72 min-w-10 justify-center sm:max-w-md md:max-w-lg lg:max-w-xl rounded-xl break-all ${isUser ? 'bg-sky-500 text-white' : 'bg-gray-200 text-black mb-4'}`}>
                {isUser ? text : (
                    <ReactTyped
                        strings={[text]}
                        typeSpeed={17}
                        className="font-medium leading-relaxed"
                        showCursor={false}
                    />
                )}
            </div>
            <div ref={messageEndRef}/>
        </div>
    );
}
