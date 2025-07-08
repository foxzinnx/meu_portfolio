import { useState } from 'react';
import { StartScreen } from "../startScreen/startScreen";

export const WorkSpace = () => {
    const [isLocked, setIsLocked] = useState(true);

    const handleUnlock = () => {
        setIsLocked(false);
    };

    return (
        <div className="relative bg-black">
            {isLocked && (
                <div className="fixed inset-0 z-50">
                    <StartScreen onUnlock={handleUnlock} />
                </div>
            )}
            
            <div className="h-screen">
                <div className='text-white font-medium'>Área de trabalho</div>
                
                <button 
                    onClick={() => setIsLocked(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    🔒 Bloquear Tela
                </button>
            </div>
        </div>
    );
};