import { useState, useEffect } from 'react';

interface StartScreenProps {
  onUnlock?: () => void;
}

export const LockScreen = ({ onUnlock }: StartScreenProps) => {
  const [time, setTime] = useState(() => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  });

  const [date, setDate] = useState(() => {
    const d = new Date();
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const months = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    return `${days[d.getDay()]}, ${d.getDate().toString().padStart(2, '0')} de ${months[d.getMonth()]}`;
  });

  const [isUnlocking, setIsUnlocking] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setTime(`${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`);
      const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
      ];
      setDate(`${days[d.getDay()]}, ${d.getDate().toString().padStart(2, '0')} de ${months[d.getMonth()]}`);
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      if (onUnlock) onUnlock();
    }, 800);
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === 'Enter' && !isUnlocking) {
        handleUnlock();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUnlocking]);

  const handleMouseDown = (e: any) => {
    if (isUnlocking) return;
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging || isUnlocking) return;
    const deltaY = e.clientY - startY;
    if (deltaY < 0) { 
      setDragY(deltaY);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging || isUnlocking) return;
    setIsDragging(false);
    
    if (dragY < -100) {
      handleUnlock();
    } else {
      setDragY(0);
    }
  };

  const handleTouchStart = (e: any) => {
    if (isUnlocking) return;
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: any) => {
    if (!isDragging || isUnlocking) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY < 0) { 
      setDragY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || isUnlocking) return;
    setIsDragging(false);
    
    if (dragY < -100) {
      handleUnlock();
    } else {
      setDragY(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startY, dragY]);

  return (
    <div className="bg-black">
      <div 
        className={`h-screen w-full overflow-hidden relative select-none transition-all duration-700 ease-out ${
          isUnlocking ? 'opacity-0 transform translate-y-[-100vh]' : 'opacity-100'
        }`}
        style={{
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 z-10">
          <img
            src="/blackcat.jpg"
            className="object-cover h-full w-full brightness-50 blur-md scale-105 rounded-[4px]"
            alt="Imagem de fundo com gato preto"
            onError={() => console.error('Erro ao carregar a imagem')}
          />
        </div>
        
        <div className="flex flex-col justify-center items-center h-full relative z-20">
          <p className="font-medium text-white text-6xl drop-shadow-lg">
            {time}
          </p>
          <p className="font-regular text-white text-2xl drop-shadow-lg mt-2">
            {date}
          </p>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-opacity-70 text-center">
            <p className="text-sm mb-2">Pressione Enter ou arraste para cima</p>
            <div className="animate-bounce">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
