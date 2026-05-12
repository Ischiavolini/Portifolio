/*
Design escolhido: Ubuntu Human Interface + Brutalismo Digital Suave.
Este arquivo deve reforçar a metáfora de desktop Ubuntu: dock lateral, barra superior,
janelas flutuantes, apps como documentos vivos e microinterações produtivas.
Pergunta-guia: esta escolha reforça ou dilui a filosofia de desktop profissional explorável?
*/

import { useMemo, useRef, useState } from "react";
import {
  AppWindow,
  Award,
  Briefcase,
  Code,
  ExternalLink,
  FileText,
  Folder,
  Github,
  GraduationCap,
  Home as HomeIcon,
  Linkedin,
  Mail,
  Maximize2,
  Minus,
  Power,
  Search,
  Terminal,
  User,
  Volume2,
  Wifi,
  X,
} from "lucide-react";

type AppId = "readme" | "projects" | "about" | "academic" | "career" | "terminal";

type WindowState = {
  id: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized?: boolean;
};

const wallpaperUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663623874893/mcTp3twRSx2aLC7Fq2BcjK/ubuntu-portfolio-wallpaper-eUYBmvKKNMfHRXCvFKPt7v.webp";

const projectPreviewUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663623874893/mcTp3twRSx2aLC7Fq2BcjK/project-folder-preview-as7iQm8JCxo9wYAgpiAUWU.webp";

const readmePanelUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663623874893/mcTp3twRSx2aLC7Fq2BcjK/readme-storytelling-panel-JgZ86suHYpRa4sWEqSTB4g.webp";

const apps: Array<{
  id: AppId;
  title: string;
  dockLabel: string;
  icon: typeof FileText;
  accent: string;
  defaultWindow: Omit<WindowState, "id" | "title" | "z" | "minimized">;
}> = [
  {
    id: "readme",
    title: "README.md",
    dockLabel: "README",
    icon: FileText,
    accent: "from-orange-500 to-amber-300",
    defaultWindow: { x: 118, y: 92, width: 760, height: 560 },
  },
  {
    id: "projects",
    title: "Projetos — Files",
    dockLabel: "Projetos",
    icon: Folder,
    accent: "from-orange-500 to-purple-500",
    defaultWindow: { x: 178, y: 124, width: 850, height: 590 },
  },
  {
    id: "about",
    title: "Sobre mim.app",
    dockLabel: "Sobre mim",
    icon: User,
    accent: "from-fuchsia-500 to-orange-400",
    defaultWindow: { x: 244, y: 104, width: 760, height: 545 },
  },
  {
    id: "academic",
    title: "academic.my",
    dockLabel: "academic.my",
    icon: GraduationCap,
    accent: "from-emerald-400 to-orange-400",
    defaultWindow: { x: 205, y: 150, width: 790, height: 560 },
  },
  {
    id: "career",
    title: "Linkedin.local",
    dockLabel: "Trajetória",
    icon: Briefcase,
    accent: "from-sky-400 to-orange-500",
    defaultWindow: { x: 150, y: 140, width: 810, height: 565 },
  },
  {
    id: "terminal",
    title: "terminal — ajuda",
    dockLabel: "Terminal",
    icon: Terminal,
    accent: "from-zinc-600 to-orange-500",
    defaultWindow: { x: 300, y: 172, width: 700, height: 460 },
  },
];

const projects = [
  {
    name: "TCC - Lost descent",
    type: "Unity game",
    status: "Concluido",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=80",
    description:
      "Este projeto era para a ETEC Albert Einstein. A ideia do projeto era criar um jogo roguelike cuja principal mecânica envolvia a troca de partes do corpo para adquirir novas habilidades. Outro ponto importante é a história do jogo, que buscava gerar uma reflexão no jogador sobre como seria o futuro da nossa sociedade.",
    stack: ["C#", "Unity", "UI", "Pixel art"],
    repoLink: "https://github.com/seu-usuario/projeto-alpha",  // ← Link do repositório
  demoLink: "https://projeto-alpha.com",                      // ← Link da demo
  files: ["src/", "public/", "package.json", "README.md"],
  },
  {
    name: "CIEE - PBL's",
    type: "Curso do Jovem Aprendiz",
    status: "Em Andamento",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?",
    description:
      "O CIEE é uma instituição que ajuda jovens a entrarem no mercado de trabalho por meio da aprendizagem e do estágio. Como jovem aprendiz, participo das atividades da empresa e também dos conteúdos do CIEE, que ajudam no desenvolvimento profissional, ensinando responsabilidade, organização, comunicação e postura no ambiente de trabalho",
    stack: ["Desenvolvimento Humano", "Desenvolvimento Profissional",],
    repoLink: "https://drive.google.com/drive/folders/1D-8BhNvL_RsFYb6PBw6oFvApt-1hOlWo?usp=sharing",  // ← Link do repositório
  demoLink: "https://projeto-alpha.com",                      // ← Link da demo
  files: ["src/", "public/", "package.json", "README.md"],
  },
  
];

const academicItems = [
  {
    title: "Formação no ensino medio (Aulas eletivas com foco em tecnologia)",
    place: "Escola Estadual Castro Alves",
    period: "2024 — Completo",
    details: "No Castro Alves, fui um bom aluno e, além disso, escolhi aulas voltadas à tecnologia. Também realizei um curso da Alura como parte do cronograma escolar, desenvolvendo projetos em diversas plataformas, como Scratch e o próprio VS Code, utilizando JavaScript, HTML e CSS",
  },
  {
    title: "Curso Técnico",
    place: "ETEC Albert Einstein",
    period: "01/2023 - 06/2024 Completo",
    details: "Neste período, foi quando mais aprendi sobre tecnologia, graças aos diversos professores excelentes que tive ao longo da minha formação. Com isso, desenvolvi conhecimentos em diferentes áreas da programação e da tecnologia, aprendendo linguagens como JavaScript, HTML e CSS, além de utilizar ferramentas e plataformas como VS Code, Scratch, Unity, Firebase e Ionic Angular. Também adquiri experiência no desenvolvimento de jogos, criação de sistemas e desenvolvimento web, o que aumentou ainda mais meu interesse pela área de tecnologia e pelo desenvolvimento Full Stack.",
  },
  
];

const careerItems = [
  {
    role: "Atualmente trabalhando - Jovem aprendiz",
    company: "HAGANA SEGURANÇA LIMITADA",
    period: "2026 — atual",
    text: "Faço parte da área administrativa como jovem aprendiz, onde tenho diversas responsabilidades, como auxiliar na operação da empresa, apoiar atividades organizacionais e colaborar com diferentes demandas do dia a dia corporativo. Além disso, participo do CIEE, uma instituição que promove a capacitação e a inserção de jovens no mercado de trabalho, proporcionando aprendizado profissional e desenvolvimento pessoal. Essa experiência tem sido muito gratificante, pois vem contribuindo diretamente para minha formação como jovem trabalhador, ajudando no desenvolvimento de habilidades como responsabilidade, comunicação, organização, trabalho em equipe e resolução de problemas",
  }
];

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/gabriel-o-ischiavolini-329289383/" },
  { label: "GitHub", icon: Github, href: "https://github.com/Ischiavolini" },
  { label: "E-mail", icon: Mail, href: "mailto:gabrieloliveiraischiavolini@gmail.com" },
];

function formatTime() {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function WindowContent({ id }: { id: AppId }) {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [activeProjectTab, setActiveProjectTab] = useState<'info' | 'repo' | 'demo' | 'files'>('info');

  if (id === "readme") {
    return (
      <div className="window-scroll grid gap-6 p-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-5">
          <div className="terminal-label">/home/portfolio/README.md</div>
          <h1 className="text-4xl font-black tracking-tight text-white">Olá, eu sou Gabriel.</h1>
          <p className="text-lg leading-8 text-zinc-200">
            Prazer, sou Gabriel. Tenho a ambição de me tornar desenvolvedor e quero adquirir mais conhecimentos sobre a área de back-end e front-end.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Desenvolvedor", "Criativo técnico", "Aprendizado contínuo"].map((item) => (
              <div className="metric-card" key={item}>
                <span className="text-xs uppercase tracking-[0.22em] text-orange-300">tag</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-orange-400/25 bg-orange-500/10 p-4 text-sm leading-7 text-orange-50">
            <strong>Audio storytelling</strong> disponível abaixo.
          </div>
        </section>
        <aside className="space-y-4">
          <img className="h-56 w-full rounded-3xl object-cover shadow-2xl shadow-orange-950/40" src={readmePanelUrl} alt="Painel visual do README" />
          <div className="video-card p-4">
            <div className="flex items-center gap-4">
              <div className="play-button">🎧</div>
              <div className="flex-1">
                <p className="font-bold text-white">Storytelling_Gabriel.mp3</p>
                <p className="text-xs text-zinc-300 mb-2">Ouça minha apresentação pessoal</p>
                <audio controls className="w-full h-8 custom-audio">
                  <source src="/gabriel_voz_otimizada.mp3" type="audio/mpeg" />
                  Seu navegador não suporta o elemento de áudio.
                </audio>
              </div>
            </div>
          </div>
        </aside>
      </div>
    );
  }

  if (id === "projects") {
    return (
      <div className="window-scroll grid h-full gap-0 lg:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-white/10 bg-black/20 p-4 lg:block">
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-orange-500/20 px-3 py-2 text-sm text-orange-100">
            <HomeIcon size={16} /> Home
          </div>
          {["Projetos", "Repositórios", "Demos", "Arquivos"].map((item) => (
            <div className="file-sidebar-item" key={item}>{item}</div>
          ))}
          <img className="mt-6 rounded-2xl border border-white/10" src={projectPreviewUrl} alt="Prévia visual dos projetos" />
        </aside>
        <main className="p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="terminal-label">~/Projetos</div>
              <h2 className="text-2xl font-black text-white">Gerenciador de projetos</h2>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
              <Search size={16} /> buscar projeto
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <button
                  key={project.name}
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveProjectTab('info');
                  }}
                  className={`project-card group ${selectedProject.name === project.name ? 'active' : ''}`}
                >
                  <div className="relative h-32 overflow-hidden rounded-xl">
                    <img src={project.image} alt={project.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-2 left-2 rounded-lg bg-orange-500 px-2 py-1 text-[10px] font-bold uppercase text-white">
                      {project.status}
                    </span>
                  </div>
                  <div className="p-3 text-left">
                    <h3 className="font-bold text-white">{project.name}</h3>
                    <p className="text-xs text-zinc-400">{project.type}</p>
                  </div>
                </button>
              ))}
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/5 p-4">
              {selectedProject ? (
                <div className="space-y-4">
                  <div className="flex gap-1 rounded-lg bg-black/40 p-1">
                    {(['info', 'repo', 'demo', 'files'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveProjectTab(tab)}
                        className={`flex-1 rounded-md py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          activeProjectTab === tab ? 'bg-orange-500 text-white' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {activeProjectTab === 'info' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      <p className="text-sm leading-relaxed text-zinc-300">{selectedProject.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((s) => (
                          <span key={s} className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-zinc-400">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeProjectTab === 'repo' && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                      <div className="rounded-xl bg-black/40 p-4 text-center">
                        <Github className="mx-auto mb-2 text-zinc-500" size={32} />
                        <p className="mb-3 text-xs text-zinc-400">Código fonte disponível no GitHub</p>
                        <a href={selectedProject.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-black transition-transform hover:scale-105">
                          Ver repositório <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  )}

                  {activeProjectTab === 'demo' && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                      <div className="rounded-xl bg-orange-500/10 p-4 text-center border border-orange-500/20">
                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">▶</div>
                        <p className="mb-3 text-xs text-zinc-300">Visualize o projeto em execução</p>
                        <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-105">
                          Abrir demonstração <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  )}

                  {activeProjectTab === 'files' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                      {selectedProject.files.map((file) => (
                        <div key={file} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-zinc-400">
                          {file.endsWith('/') ? <Folder size={14} /> : <FileText size={14} />}
                          {file}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-zinc-500">
                  Selecione um projeto para ver detalhes
                </div>
              )}
            </aside>
          </div>
        </main>
      </div>
    );
  }

  if (id === "about") {
    return (
      <div className="window-scroll p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <header className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-orange-500 to-fuchsia-500 blur opacity-75 animate-pulse" />
              <div className="relative h-32 w-32 rounded-full border-4 border-zinc-900 bg-zinc-800 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-700 text-4xl">👨‍💻</div>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white">Gabriel Oliveira Ischiavolini</h2>
              <p className="text-orange-400 font-mono">Desenvolvedor em formação</p>
              <div className="flex gap-3 justify-center sm:justify-start">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="text-orange-500" size={20} /> Perfil Profissional
            </h3>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 leading-relaxed text-zinc-300">
              Sempre gostei muito de aprender coisas novas, principalmente envolvendo tecnologia, desenvolvimento e criação de ideias. Meu foco é crescer profissionalmente, ganhar experiência e transformar aprendizado em algo prático e útil.
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h4 className="mb-3 font-bold text-white">Interesses</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Desenvolvimento Back-end</li>
                <li className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Desenvolvimento Front-end</li>
                <li className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Criação de Jogos</li>
                <li className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Novas Tecnologias</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h4 className="mb-3 font-bold text-white">Habilidades</h4>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "HTML/CSS", "C#", "Unity", "React", "Node.js"].map((skill) => (
                  <span key={skill} className="rounded-lg bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs text-orange-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (id === "academic") {
    return (
      <div className="window-scroll p-6">
        <div className="mb-8">
          <div className="terminal-label">~/formação</div>
          <h2 className="text-3xl font-black text-white">Trajetória Acadêmica</h2>
        </div>
        <div className="space-y-6">
          {academicItems.map((item, index) => (
            <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-zinc-800">
              <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04]">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500">{item.period}</span>
                <h3 className="mt-1 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.place}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "career") {
    return (
      <div className="window-scroll p-6">
        <div className="mb-8">
          <div className="terminal-label">~/carreira</div>
          <h2 className="text-3xl font-black text-white">Experiência Profissional</h2>
        </div>
        <div className="space-y-6">
          {careerItems.map((item, index) => (
            <div key={index} className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-orange-500/30">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">{item.role}</h3>
                  <p className="text-zinc-400">{item.company}</p>
                </div>
                <span className="rounded-full bg-orange-500/10 px-4 py-1 text-xs font-bold text-orange-500 border border-orange-500/20">
                  {item.period}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "terminal") {
    return (
      <div className="flex h-full flex-col bg-[#2c001e] font-mono text-sm text-white shadow-inner">
        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
          <div className="flex items-center gap-2">
            <Terminal size={14} /> <span>ubuntu@portfolio: ~</span>
          </div>
        </div>
        <div className="window-scroll p-4 space-y-4">
          <p className="text-green-400">login success: welcome to gabriel-os v1.0.4</p>
          <div className="space-y-2">
            <p><span className="text-orange-500">➜</span> <span className="text-cyan-400">~</span> help</p>
            <div className="grid grid-cols-2 gap-2 text-zinc-400">
              <div>about -- ver perfil</div>
              <div>projects -- ver trabalhos</div>
              <div>contact -- redes sociais</div>
              <div>clear -- limpar terminal</div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-orange-500">➜</span>
            <span className="text-cyan-400">~</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function DesktopWindow({
  win,
  focused,
  onClose,
  onMinimize,
  onFocus,
  onMove,
}: {
  win: WindowState;
  focused: boolean;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  onMove: (id: AppId, x: number, y: number) => void;
}) {
  const dragRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);

  if (win.minimized) return null;

  return (
    <section
      className={`desktop-window ${focused ? "is-focused" : ""}`}
      style={{ left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.z }}
      onMouseDown={() => onFocus(win.id)}
    >
      <header
        className="window-titlebar"
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest('.window-controls')) return;
          dragRef.current = { startX: event.clientX, startY: event.clientY, baseX: win.x, baseY: win.y };
          (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragRef.current) return;
          const nextX = Math.max(92, dragRef.current.baseX + event.clientX - dragRef.current.startX);
          const nextY = Math.max(36, dragRef.current.baseY + event.clientY - dragRef.current.startY);
          onMove(win.id, nextX, nextY);
        }}
        onPointerUp={() => {
          dragRef.current = null;
        }}
      >
        <div className="window-controls">
          <button aria-label="Fechar" className="control close" onClick={() => onClose(win.id)}><X size={12} /></button>
          <button aria-label="Minimizar" className="control minimize" onClick={() => onMinimize(win.id)}><Minus size={12} /></button>
          <button aria-label="Maximizar" className="control maximize" onClick={() => onFocus(win.id)}><Maximize2 size={11} /></button>
        </div>
        <strong>{win.title}</strong>
        <div className="w-20" />
      </header>
      <WindowContent id={win.id} />
    </section>
  );
}

export default function Home() {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "readme", title: "README.md", x: 118, y: 92, width: 760, height: 560, z: 3, minimized: false, maximized: false },
  ]);
  const [zCounter, setZCounter] = useState(10);
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
  const currentTime = useMemo(() => formatTime(), []);

  const openApp = (id: AppId) => {
    const app = apps.find((item) => item.id === id)!;
    setZCounter((z) => z + 1);
    setWindows((current) => {
      const exists = current.find((win) => win.id === id);
      if (exists) {
        return current.map((win) =>
          win.id === id ? { ...win, minimized: false, z: zCounter + 1 } : win,
        );
      }
      return [
        ...current,
        { id, title: app.title, ...app.defaultWindow, z: zCounter + 1, minimized: false },
      ];
    });
  };

  const focusWindow = (id: AppId) => {
    setZCounter((z) => z + 1);
    setWindows((current) => current.map((win) => (win.id === id ? { ...win, z: zCounter + 1 } : win)));
  };

  const moveWindow = (id: AppId, x: number, y: number) => {
    setWindows((current) => current.map((win) => (win.id === id ? { ...win, x, y } : win)));
  };

  return (
    <main className="ubuntu-desktop" style={{ backgroundImage: `url(${wallpaperUrl})` }}>
      <div className="desktop-grain" />
      <header className="top-panel">
        <div className="flex items-center gap-2">
          <AppWindow size={16} />
          <strong>Portfólio Ubuntu</strong>
        </div>
        <div className="font-mono text-xs tracking-wide text-zinc-200">{currentTime}</div>
        <div className="flex items-center gap-3 text-zinc-200">
          <Wifi size={15} />
          <Volume2 size={15} />
          <Power size={15} />
        </div>
      </header>

      <aside className="ubuntu-dock" aria-label="Aplicativos do portfólio">
        {apps.map((app) => {
          const Icon = app.icon;
          const running = windows.some((win) => win.id === app.id && !win.minimized);
          return (
            <button className="dock-icon" key={app.id} onClick={() => openApp(app.id)} title={app.dockLabel}>
              <span className={`icon-surface bg-gradient-to-br ${app.accent}`}><Icon size={24} /></span>
              <small>{app.dockLabel}</small>
              {running && <i />}
            </button>
          );
        })}
      </aside>

      <section className="desktop-shortcuts" aria-label="Atalhos na área de trabalho">
        {apps.slice(0, 5).map((app) => {
          const Icon = app.icon;
          return (
            <button key={app.id} onClick={() => openApp(app.id)}>
              <span className={`bg-gradient-to-br ${app.accent}`}><Icon size={26} /></span>
              <strong>{app.dockLabel}</strong>
            </button>
          );
        })}
      </section>

      <div className="mobile-hint">
        <strong>Modo responsivo ativo.</strong> Toque nos ícones para abrir as janelas. Em telas maiores, arraste as barras das janelas.
      </div>

      {windows.map((win) => (
        <DesktopWindow
          key={win.id}
          win={win}
          focused={win.z === Math.max(...windows.map((item) => item.z))}
          onClose={(id) => setWindows((current) => current.filter((item) => item.id !== id))}
          onMinimize={(id) => setWindows((current) => current.map((item) => item.id === id ? { ...item, minimized: true } : item))}
          onFocus={focusWindow}
          onMove={moveWindow}
        />
      ))}

      <footer className="desktop-footer">
        <Code size={16} /> Base editável criada para você trocar textos, projetos, certificados, links e vídeo depois.
      </footer>
    </main>
  );
}
