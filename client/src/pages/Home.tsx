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
            <strong>Video storytelling</strong> em andamento....
          </div>
        </section>
        <aside className="space-y-4">
          <img className="h-56 w-full rounded-3xl object-cover shadow-2xl shadow-orange-950/40" src={readmePanelUrl} alt="Painel visual do README" />
          <div className="video-card">
            <div className="play-button">▶</div>
            <div>
              <p className="font-bold text-white">Storytelling.mp4</p>
              <p className="text-sm text-zinc-300">Área reservada para seu vídeo de apresentação. em andamento.....</p>
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
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
              {projects.map((project) => (
                <button className="project-tile text-left" key={project.name} onClick={() => setSelectedProject(project)}>
                  <img src={project.image} alt={project.name} />
                  <div className="p-4">
                    <span>{project.type}</span>
                    <h3>{project.name}</h3>
                    <p>{project.status}</p>
                  </div>
                </button>
              ))}
            </div>
            <aside className="project-detail">
              <span className="terminal-label">specs.selected</span>
              <h3>{selectedProject.name}</h3>
              <p className="mb-4">{selectedProject.description}</p>
              
              <div className="mb-4 flex gap-2 border-b border-white/10">
                {(['info', 'repo', 'demo', 'files'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveProjectTab(tab)}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider transition ${
                      activeProjectTab === tab
                        ? 'border-b-2 border-orange-500 text-orange-300'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {tab === 'info' && 'Info'}
                    {tab === 'repo' && 'Repo'}
                    {tab === 'demo' && 'Demo'}
                    {tab === 'files' && 'Files'}
                  </button>
                ))}
              </div>
              
              {activeProjectTab === 'info' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
                  </div>
                </div>
              )}
              
              {activeProjectTab === 'repo' && (
                <div className="space-y-2 text-sm">
                  <p className="text-zinc-300">Link do repositorio:</p>
                  <a href="#" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300">
                    <Github size={14} /> Ver codigo
                  </a>
                </div>
              )}
              
              {activeProjectTab === 'demo' && (
                <div className="space-y-2 text-sm">
                  <p className="text-zinc-300">Demonstracao ao vivo:</p>
                  <a href="#" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300">
                    <ExternalLink size={14} /> Abrir demo
                  </a>
                </div>
              )}
              
              {activeProjectTab === 'files' && (
                <div className="space-y-2 text-sm">
                  <p className="text-zinc-300">Arquivos do projeto:</p>
                  <div className="space-y-1 text-xs text-zinc-400">
                    <p>src/</p>
                    <p>public/</p>
                    <p>package.json</p>
                    <p>README.md</p>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </main>
      </div>
    );
  }

  if (id === "about") {
    const softSkills = [
      "Letramento Digital",
      "Pensamento crítico",
      "Trabalho em equipe",
      "Adaptabilidade",
      "Comprometimento",
      "Vontade de Aprender",
      "Resolução de problemas",
      "Empatia",
      "Accountability",
    ];
    const hardSkills = [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Python",
      "Pacote Office",
      "Aprendizado Continuo",
      "UI design",
      "C#",

    ];
    return (
      <div className="window-scroll p-6">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="profile-card">
            <div className="avatar-orb">SN</div>
            <h2>Sobre mim</h2>
            <p>
              Sou um jovem dedicado ao conhecimento e sempre tive muitos sonhos e objetivos. Desde criança, me via jogando videogame e admirava o fato de que muitos desses projetos, mesmo sendo jogos, conseguiam impactar e entreter outras pessoas de forma positiva. Por isso, desde cedo surgiu em mim a vontade de criar meu próprio jogo. Foi através desse interesse que conheci a programação, algo que abriu meus olhos para o mundo da tecnologia. Com o tempo, percebi que, além de desenvolver jogos, também poderia criar sistemas e soluções capazes de impactar positivamente a vida das pessoas. Assim, acabei me encontrando na programação e desenvolvendo ainda mais minha paixão pela tecnologia.
            </p>
            <div className="mt-5 space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a className="social-link" href={link.href} key={link.label} target="_blank" rel="noreferrer">
                    <Icon size={18} /> {link.label}
                  </a>
                );
              })}
            </div>
          </section>
          <section className="space-y-4">
            {["O que me move"].map((title, index) => (
              <article className="about-note" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>
                  O que me move é a vontade de aprender, criar e desenvolver coisas que possam impactar positivamente a vida das pessoas. Desde criança, a tecnologia e os jogos despertaram minha curiosidade, e foi através disso que descobri a programação. Hoje, o que mais me motiva é saber que posso transformar ideias em projetos reais, seja criando jogos, sistemas ou soluções úteis, enquanto continuo evoluindo profissionalmente e adquirindo novos conhecimentos
                  </p>
              </article>
            ))}
             {["Como eu trabalho"].map((title, index) => (
              <article className="about-note" key={title}>
                <span>0{index + 2}</span>
                <h3>{title}</h3>
                <p>
                  Trabalho de forma focada e centrada, sempre sendo muito atento às tarefas e aos detalhes. Desde cedo, aprendi a me responsabilizar pelo que faço e entendi a importância de dar o meu melhor em tudo que realizo. Acredito que amadurecer e assumir responsabilidades ao longo da vida contribuíram para que eu desenvolvesse essa postura mais comprometida e dedicada.
                </p>
              </article>
            ))}
             {["O que estou buscando"].map((title, index) => (
              <article className="about-note" key={title}>
                <span>0{index + 3}</span>
                <h3>{title}</h3>
                <p>
                  O que estou buscando é me aprimorar cada vez mais para ter a capacidade de transformar em realidade os projetos que já planejei, sejam jogos, softwares ou outras ideias voltadas à tecnologia. No âmbito profissional, busco adquirir experiência, desenvolver minhas habilidades e crescer continuamente, dando preferência à área de tecnologia, mas sem me limitar apenas a ela, pois também valorizo oportunidades que possam agregar aprendizado e evolução pessoal e profissional.
                </p>
              </article>
            ))}
          </section>
        </div>
        
        <div className="mt-8 border-t border-white/10 pt-8">
          <h3 className="mb-6 text-xl font-bold text-white">Competências</h3>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-orange-300">Soft Skills</h4>
              <div className="space-y-2">
                {softSkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 text-sm text-zinc-200">
                    <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-orange-300">Hard Skills</h4>
              <div className="space-y-2">
                {hardSkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 text-sm text-zinc-200">
                    <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "academic") {
    return (
      <div className="window-scroll p-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="terminal-label">academic.my --certificates</div>
            <h2 className="text-3xl font-black text-white">Instituições, cursos e certificados</h2>
          </div>
          <Award className="text-orange-300" size={34} />
        </div>
        <div className="timeline">
          {academicItems.map((item) => (
            <article className="timeline-item" key={item.title}>
              <div>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <strong>{item.place}</strong>
                <p>{item.details}</p>
              </div>
              <button>Adicionar certificado</button>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (id === "career") {
    return (
      <div className="window-scroll p-6">
        <div className="career-header">
          <div>
            <div className="terminal-label">linkedin.local/profile</div>
            <h2>Trajetória profissional</h2>
            <p>Um app inspirado no LinkedIn, mas com linguagem mais direta e visual.</p>
          </div>
          <Briefcase size={38} />
        </div>
        <div className="space-y-4">
          {careerItems.map((item) => (
            <article className="career-item" key={item.role}>
              <div className="career-dot" />
              <div>
                <span>{item.period}</span>
                <h3>{item.role}</h3>
                <strong>{item.company}</strong>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="window-scroll terminal-window p-6 font-mono text-sm leading-7 text-emerald-100">
      <p><span className="text-orange-300">portfolio@ubuntu</span>:~$ help</p>
      <p>Comandos conceituais disponíveis:</p>
      <p>open README.md — abre sua apresentação principal</p>
      <p>open Projetos — mostra cases e especificações</p>
      <p>open academic.my — lista instituições e certificados</p>
      <p>open Linkedin.local — mostra trajetória profissional</p>
      <br />
      <p className="text-zinc-400">Dica: este terminal pode virar um easter egg com comandos reais no futuro.</p>
    </div>
  );
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
