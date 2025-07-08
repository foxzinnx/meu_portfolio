import { useState } from 'react';
import { Github, Linkedin, Mail, FileText, User, ExternalLink, Code, type LucideIcon, X } from 'lucide-react';
import { LockScreen } from '../lockscreen/lockscreen';

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  href?: string;
  bgColor?: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const ProfileModal = ({ isOpen, onClose, title, content }: ProfileModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {content}
        </div>
      </div>
    </div>
  );
};

const DesktopIcon = ({ icon: Icon, label, onClick, href, bgColor = "bg-blue-500" }: DesktopIconProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (href) {
      window.open(href, '_blank');
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`flex flex-col items-center cursor-pointer select-none w-20 h-20 p-2 rounded-lg transition-all duration-150 ${
        isPressed ? 'bg-white/20 scale-95' : 'hover:bg-white/10'
      }`}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <div className={`${bgColor} p-2 rounded-lg shadow-lg mb-1 transition-transform duration-150 ${
        isPressed ? 'scale-95' : ''
      }`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-white text-xs font-medium text-center leading-tight">
        {label}
      </span>
    </div>
  );
};

export const WorkSpace = () => {
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const openModal = (modalType: string) => {
    setCurrentModal(modalType);
  };


  const closeModal = () => {
    setCurrentModal(null);
  };

  const githubContent = (
    <div className="text-white">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <Github className="w-12 h-12 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">BRYAN GOMES</h3>
          <p className="text-gray-400">@foxzinnx</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Repositórios Principais</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>⭐ Foxify Social</span>
              <span className="text-gray-400">Next.js</span>
            </div>
            <div className="flex justify-between">
              <span>⭐ Encurtador de links</span>
              <span className="text-gray-400">Node.js</span>
            </div>
            <div className="flex justify-between">
              <span>⭐ NordisBank</span>
              <span className="text-gray-400">Next.js</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Estatísticas</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Repositórios:</span>
              <span className="text-green-400">36</span>
            </div>
            <div className="flex justify-between">
              <span>Estrelas:</span>
              <span className="text-yellow-400">1</span>
            </div>
            <div className="flex justify-between">
              <span>Seguidores:</span>
              <span className="text-blue-400">4</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <button 
          onClick={() => window.open('https://github.com/foxzinnx', '_blank')}
          className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          Visitar GitHub
        </button>
      </div>
    </div>
  );

  const linkedinContent = (
    <div className="text-white">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-600 p-4 rounded-lg">
          <Linkedin className="w-12 h-12 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">BRYAN GOMES</h3>
          <p className="text-gray-400">Desenvolvedor Full Stack</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Experiência</h4>
          <div className="space-y-3">
            <div>
              <div className="font-bold">CEO | Desenvolvedor</div>
              <div className="text-sm text-gray-400">Foxify Social • 2025 - Presente</div>
            </div>
            <div>
              <div className="font-semibold">Designer Gráfico</div>
              <div className="text-sm text-gray-400">WP Assesoria • Mai-2022 - Jan-2023</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Habilidades</h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-900 px-2 py-1 rounded text-xs">React</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-xs">Next.js</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-xs">Node.js</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-xs">TypeScript</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-xs">Javascript</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-xs">TailwindCSS</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-xs">Python</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-xs">PostgreSQL</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-xs">SQL</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-xs">MongoDB</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-xs">JWT</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <button 
          onClick={() => window.open('https://linkedin.com/in/bryangomes', '_blank')}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          Visitar LinkedIn
        </button>
      </div>
    </div>
  );

  const desktopIcons = [
    {
      icon: Github,
      label: "GitHub",
      onClick: () => openModal('github'),
      bgColor: "bg-gray-800"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      onClick: () => openModal('linkedin'),
      bgColor: "bg-blue-600"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:bryangomes16624@gmail.com",
      bgColor: "bg-red-500"
    },
    {
      icon: FileText,
      label: "Currículo",
      href: "/curriculo.pdf",
      bgColor: "bg-green-600"
    },
    {
      icon: Code,
      label: "Projetos",
      onClick: () => alert("Depois arrumo isso"),
      bgColor: "bg-purple-600"
    },
    {
      icon: User,
      label: "Sobre Mim",
      onClick: () => alert("Depois arrumo isso"),
      bgColor: "bg-orange-500"
    },
    // {
    //   icon: Briefcase,
    //   label: "Portfólio",
    //   onClick: () => alert("Abrindo portfólio..."),
    //   bgColor: "bg-indigo-600"
    // },
    // {
    //   icon: ExternalLink,
    //   label: "Website",
    //   href: "https://seusite.com",
    //   bgColor: "bg-teal-600"
    // }
  ];


  return (
    <div className="relative bg-black min-h-screen overflow-y-hidden">

        {isLocked && (
            <div className="fixed inset-0 z-50">
                <LockScreen onUnlock={handleUnlock} />
            </div>
        )}

      <div className="h-screen relative">
        <div className="absolute inset-0 z-10">
          <img
            src="/wallpaper2.jpg"
            className="object-cover h-full w-full"
            alt=""
            onError={() => console.error('Erro ao carregar a imagem')}
          />
        </div>

        <div className="relative z-20 p-6">

          <div className="flex flex-col flex-wrap gap-4 h-[calc(100vh-120px)] content-start">
            {desktopIcons.map((iconData, index) => (
              <DesktopIcon
                key={index}
                icon={iconData.icon}
                label={iconData.label}
                onClick={iconData.onClick}
                href={iconData.href}
                bgColor={iconData.bgColor}
              />
            ))}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-gray-700 h-12 flex items-center px-4">
            <div className="flex items-center gap-4">
              <div className="text-white text-sm">
                {new Date().toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={currentModal === 'github'}
        onClose={closeModal}
        title="GitHub Profile"
        content={githubContent}
      />
      
      <ProfileModal
        isOpen={currentModal === 'linkedin'}
        onClose={closeModal}
        title="LinkedIn Profile"
        content={linkedinContent}
      />
    </div>
  );
};