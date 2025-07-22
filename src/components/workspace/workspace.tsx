import { useState, useEffect } from 'react';
import { Github, Linkedin, ExternalLink, X, Folder } from 'lucide-react';
import { LockScreen } from '../lockscreen/lockscreen';

interface DesktopIconProps {
  icon: string;
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

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  moveSpeed: number;
  direction: number;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  lastModified: string;
  githubUrl?: string;
}

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 200; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 3 + 1,
          moveSpeed: Math.random() * 20 + 10,
          direction: Math.random() * 360
        });
      }
      setStars(newStars);
    };

    generateStars();

  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse transition-all duration-100"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.twinkleSpeed}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.3)`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
};

const ProfileModal = ({ isOpen, onClose, title, content }: ProfileModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#000007] border border-gray-700 rounded-lg w-full max-w-2xl max-h-[80vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white text-lg sm:text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          {content}
        </div>
      </div>
    </div>
  );
};

const ProjectsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      name: "Foxify Social",
      description: "Projeto fullstack de uma rede social com design moderno e responsivo, além de ter vários recursos como follow, likes, comentários, compartilhamento de fotos e vídeos e reposts. Fiz o backend usando Node.js com express e javascript, utilizei JWT para autenticação com AuthContext no frontend.",
      technologies: ["Next.js", "TypeScript", "Node.js", "Express", "JWT", "Supabase"],
      lastModified: "2025-07-22",
      githubUrl: "https://foxifysocial.vercel.app/"
    },
    {
      name: "Encurtador de Links",
      description: "Encurtador de Links simples que fiz usando Node.js com javascript, e MongoDB como banco de dados.",
      technologies: ["Node.js", "Javascript", "Express", "MongoDB", "React"],
      lastModified: "2025-07-01",
      githubUrl: "https://github.com/foxzinnx/encurtador-url"
    },
    {
      name: "NordisBank",
      description: "Online banking platform with secure transactions.",
      technologies: ["Next.js", "TypeScript", "JWT", "PostgreSQL"],
      lastModified: "2025-07-07",
      githubUrl: "https://github.com/foxzinnx/NordisBank"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <h2 className="text-white text-base sm:text-lg font-semibold">Meus Projetos</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row h-[70vh] sm:h-[60vh] overflow-y-auto">
          <div className="w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-600 p-3 sm:p-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {projects.map(project => (
                <div
                  key={project.name}
                  className={`flex flex-col items-center p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedProject?.name === project.name
                      ? 'bg-blue-600/20 border border-blue-500'
                      : 'hover:bg-gray-700/50'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <Folder className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
                  <span className="text-white text-xs sm:text-sm mt-2 text-center">{project.name}</span>
                  <span className="text-gray-400 text-xs">{project.lastModified}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="w-full sm:w-1/2 p-4 sm:p-6">
            {selectedProject ? (
              <div className="text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{selectedProject.name}</h3>
                <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">{selectedProject.description}</p>
                <h4 className="font-semibold text-sm sm:text-base mb-2">Tecnologias:</h4>
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {selectedProject.technologies.map(tech => (
                    <span
                      key={tech}
                      className="bg-gray-700 px-2 py-1 rounded text-xs sm:text-sm text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <span className="text-gray-400 text-xs sm:text-sm">
                    Última modificação: {selectedProject.lastModified}
                  </span>
                  {selectedProject.githubUrl && (
                    <button
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                      className="bg-gray-700 hover:bg-gray-600 px-3 py-1 cursor-pointer rounded flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver projeto
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center text-sm sm:text-base mt-10 sm:mt-20">
                Selecione um projeto para ver os detalhes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DesktopIcon = ({ icon: Icon, label, onClick, href }: DesktopIconProps) => {
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
      className={`flex flex-col items-center cursor-pointer select-none w-20 sm:w-23 h-20 sm:h-23 rounded-lg transition-all duration-150 ${
        isPressed ? 'bg-white/20 scale-95' : 'hover:bg-white/10'
      }`}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <div className={`p-2 rounded-lg shadow-lg mb-1 transition-transform duration-150 ${
        isPressed ? 'scale-95' : ''
      }`}>
        <img src={Icon} alt={label} className="w-10 h-10 sm:w-12 sm:h-12" />
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
      icon: '/github-icon.png',
      label: "GitHub",
      onClick: () => openModal('github'),
      bgColor: "bg-gray-800"
    },
    {
      icon: '/linkedin-icon.png',
      label: "LinkedIn",
      onClick: () => openModal('linkedin'),
      bgColor: "bg-blue-600"
    },
    {
      icon: '/email-icon.png',
      label: "Email",
      href: "mailto:bryangomes16624@gmail.com",
      bgColor: "bg-red-500"
    },
    {
      icon: '/cv-icon.png',
      label: "Currículo",
      href: "/curriculo-bryan.pdf",
      bgColor: "bg-green-600"
    },
    {
      icon: '/projects-icon.png',
      label: "Projetos",
      onClick: () => openModal('projects'),
      bgColor: "bg-purple-600"
    },
    {
      icon: '/me-icon.png',
      label: "Sobre Mim",
      onClick: () => alert("Depois arrumo isso"),
      bgColor: "bg-orange-500"
    },
  ];

  return (
    <div className="relative bg-black min-h-screen overflow-y-hidden">
      {isLocked && (
        <div className="fixed inset-0 z-50">
          <LockScreen onUnlock={handleUnlock} />
        </div>
      )}

      <div className="h-screen relative">
        <div className="bg-black absolute inset-0 z-10">
          <StarryBackground />
        </div>

        <div className="relative z-20 p-4 sm:p-6">
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
      
      <ProjectsModal
        isOpen={currentModal === 'projects'}
        onClose={closeModal}
      />
    </div>
  );
};