# Como editar seu portfólio Ubuntu Desktop

**Autor:** Manus AI

Este guia explica como alterar a base do seu portfólio depois que o projeto foi criado. A estrutura foi pensada para você editar quase tudo em um único arquivo principal, sem precisar entender toda a arquitetura do projeto. O site funciona como um **desktop Ubuntu interativo**, com uma dock lateral, barra superior, atalhos e janelas que representam aplicativos do seu portfólio.

> A regra geral é simples: os textos, projetos, certificados, experiências e links ficam no arquivo `client/src/pages/Home.tsx`. A aparência global, como cores, tamanhos, janelas, dock e responsividade, fica no arquivo `client/src/index.css`.

## Onde alterar cada parte

| Parte do site | Onde editar | O que procurar no arquivo |
|---|---:|---|
| README principal | `client/src/pages/Home.tsx` | `if (id === "readme")` |
| Projetos | `client/src/pages/Home.tsx` | `const projects = [` |
| Sobre mim | `client/src/pages/Home.tsx` | `if (id === "about")` |
| Links de trabalho | `client/src/pages/Home.tsx` | `const socialLinks = [` |
| academic.my | `client/src/pages/Home.tsx` | `const academicItems = [` |
| Trajetória tipo LinkedIn | `client/src/pages/Home.tsx` | `const careerItems = [` |
| Nome dos aplicativos na dock | `client/src/pages/Home.tsx` | `const apps = [` |
| Wallpaper e imagens geradas | `client/src/pages/Home.tsx` | `wallpaperUrl`, `projectPreviewUrl`, `readmePanelUrl` |
| Cores, janelas e dock | `client/src/index.css` | classes como `.ubuntu-dock`, `.desktop-window`, `.top-panel` |

## Como editar o README

No arquivo `client/src/pages/Home.tsx`, procure o trecho `if (id === "readme")`. É nele que ficam o texto inicial, as tags profissionais e a área reservada para vídeo. Você pode trocar `Seu Nome` pelo seu nome real, ajustar a descrição profissional e substituir o texto do bloco de storytelling.

Se quiser adicionar um vídeo real, a sugestão é trocar a área visual `Storytelling.mp4` por um `iframe` do YouTube ou Vimeo. Um exemplo de substituição seria inserir um bloco como este dentro do card de vídeo:

```tsx
<iframe
  className="h-56 w-full rounded-2xl"
  src="https://www.youtube.com/embed/ID_DO_VIDEO"
  title="Storytelling profissional"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
```

## Como adicionar ou editar projetos

Os projetos ficam no array `const projects = [`. Cada projeto tem nome, tipo, status, imagem, descrição e stack. Para adicionar um projeto novo, copie um bloco existente e altere os valores. A estrutura esperada é esta:

```tsx
{
  name: "Nome do projeto",
  type: "Web App",
  status: "Em destaque",
  image: "URL_DA_IMAGEM",
  description: "Resumo do problema, solução, seu papel e resultado.",
  stack: ["React", "TypeScript", "API"],
}
```

| Campo | Função | Sugestão de escrita |
|---|---:|---|
| `name` | Nome mostrado no gerenciador de arquivos | Use nomes curtos e memoráveis. |
| `type` | Categoria do projeto | Exemplos: `Web App`, `Automação`, `Dados`, `UX`, `API`. |
| `status` | Selo narrativo | Exemplos: `Case técnico`, `Protótipo`, `Em produção`. |
| `image` | Capa visual | Use uma URL pública de imagem ou imagem enviada para armazenamento do projeto. |
| `description` | Especificações exibidas ao clicar | Explique problema, solução, tecnologias e impacto. |
| `stack` | Tecnologias ou competências | Mantenha de 3 a 6 tags por projeto. |

## Como editar o app Sobre mim

O app `Sobre mim` fica no trecho `if (id === "about")`. Ele foi dividido em uma área de perfil e três notas: **O que me move**, **Como eu trabalho** e **O que estou buscando**. A ideia é que essa seção tenha uma voz mais pessoal do que um currículo tradicional.

Para editar os links profissionais, procure `const socialLinks = [` e altere os campos `href`. Por exemplo, troque `https://www.linkedin.com/` pelo link real do seu LinkedIn, `https://github.com/` pelo seu GitHub e `mailto:seuemail@exemplo.com` pelo seu e-mail.

## Como editar o academic.my

A seção acadêmica usa o array `const academicItems = [`. Cada item representa uma instituição, curso, certificado, faculdade ou escola. Você pode duplicar blocos para adicionar formações novas.

```tsx
{
  title: "Nome do curso ou formação",
  place: "Nome da instituição",
  period: "2024 — 2026",
  details: "Descrição do curso, certificado, carga horária ou aprendizado relevante.",
}
```

Se quiser transformar o botão **Adicionar certificado** em link real, substitua o botão no trecho `academic` por um elemento `<a>` apontando para a URL pública do certificado.

## Como editar a trajetória tipo LinkedIn

A trajetória profissional fica em `const careerItems = [`. Cada item representa uma experiência de trabalho, freelance, projeto, estágio, participação em comunidade ou marco profissional. A escrita deve ser objetiva, mas com um pouco mais de personalidade do que um currículo comum.

| Campo | O que colocar |
|---|---|
| `role` | Cargo, função ou papel desempenhado. |
| `company` | Empresa, cliente, projeto ou contexto. |
| `period` | Período da experiência. |
| `text` | Responsabilidades, tecnologias, entregas e resultados. |

## Como mudar nomes e apps da dock

A dock lateral é controlada pelo array `const apps = [`. Cada app tem `id`, `title`, `dockLabel`, ícone, cor e posição/tamanho padrão da janela. Se quiser mudar apenas o nome que aparece na dock, altere `dockLabel`. Se quiser mudar o título da janela, altere `title`.

| Campo | Impacto visual |
|---|---|
| `dockLabel` | Nome pequeno abaixo do ícone na barra lateral. |
| `title` | Texto na barra superior da janela aberta. |
| `accent` | Gradiente do ícone. |
| `defaultWindow` | Posição e tamanho inicial da janela em telas grandes. |

## Sugestões para evoluir o projeto

A base atual já entrega a metáfora de desktop e os principais aplicativos que você pediu. Depois de inserir suas informações reais, há algumas melhorias que podem deixar a experiência ainda mais marcante.

| Ideia | Por que vale a pena | Complexidade |
|---|---:|---:|
| Comandos reais no terminal | Permite digitar `open readme` ou `ls projects` e navegar como em Linux. | Média |
| Modo “instalar certificado” | Clicar em certificados e abrir uma janela com PDF, carga horária e validação. | Média |
| Janela de projeto detalhada | Em vez de trocar o painel lateral, abrir cada projeto em uma janela própria. | Média |
| Tema claro/escuro | Criar alternância entre Ubuntu dark e uma versão clara editorial. | Baixa |
| Mini sistema de notificações | Mostrar notificações do tipo “README aberto” ou “Novo projeto selecionado”. | Baixa |
| Área de contato como app | Criar um app `Contato.mail` com e-mail, agenda e formulário visual. | Média |

## Cuidados ao editar

Evite apagar os identificadores dos apps, como `readme`, `projects`, `about`, `academic` e `career`, porque eles conectam os botões da dock ao conteúdo das janelas. Também é melhor manter os textos entre aspas e, quando usar apóstrofos ou caracteres especiais, conferir se o editor não quebrou a sintaxe do TypeScript.

Sempre que fizer uma alteração maior, rode o comando abaixo na pasta do projeto para confirmar que tudo continua compilando:

```bash
pnpm build
```

Se o build passar, a base técnica está consistente. Se aparecer erro, normalmente ele vai indicar o arquivo e a linha onde algum texto, vírgula, chave ou colchete foi alterado de forma incorreta.
