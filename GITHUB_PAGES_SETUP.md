# Como fazer deploy no GitHub Pages

Este guia explica como colocar seu portfólio Ubuntu Desktop no GitHub Pages e fazê-lo funcionar com o domínio do GitHub.

## Pré-requisitos

- Uma conta no GitHub
- Git instalado no seu computador
- Node.js e pnpm instalados

## Passo 1: Criar um repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nomeie o repositório como `ubuntu-portfolio` (ou qualquer outro nome)
3. Deixe como **público** (necessário para GitHub Pages)
4. Clique em "Create repository"

## Passo 2: Preparar o projeto para GitHub Pages

Na raiz do projeto, você já tem o `vite.config.ts` configurado para GitHub Pages. A configuração detecta automaticamente quando está sendo buildado para GitHub Pages e ajusta o `base` path.

## Passo 3: Fazer o primeiro commit e push

```bash
# Inicializar git (se não estiver inicializado)
git init

# Adicionar o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/ubuntu-portfolio.git

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit: Ubuntu Desktop Portfolio"

# Fazer push para a branch main
git branch -M main
git push -u origin main
```

## Passo 4: Configurar GitHub Actions para deploy automático

Crie um arquivo `.github/workflows/deploy.yml` na raiz do projeto:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build for GitHub Pages
        run: GITHUB_PAGES=true pnpm build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/public
```

## Passo 5: Ativar GitHub Pages nas configurações do repositório

1. Vá para **Settings** do seu repositório
2. Na barra lateral, clique em **Pages**
3. Em "Build and deployment", escolha:
   - **Source**: Deploy from a branch
   - **Branch**: gh-pages
   - **Folder**: / (root)
4. Clique em "Save"

## Passo 6: Fazer um novo commit para disparar o deploy

```bash
# Fazer uma pequena alteração (por exemplo, adicionar um comentário)
# Depois:
git add .
git commit -m "Trigger GitHub Pages deployment"
git push
```

O GitHub Actions vai automaticamente:
1. Fazer o build do projeto com `GITHUB_PAGES=true`
2. Enviar os arquivos para a branch `gh-pages`
3. Publicar no GitHub Pages

## Acessar seu portfólio

Após alguns minutos, seu portfólio estará disponível em:

```
https://SEU_USUARIO.github.io/ubuntu-portfolio/
```

Por exemplo, se seu usuário é `joao-silva`, o URL será:
```
https://joao-silva.github.io/ubuntu-portfolio/
```

## Usar um domínio personalizado (opcional)

Se você tiver um domínio próprio, pode apontar para o GitHub Pages:

1. Vá para **Settings > Pages** do seu repositório
2. Em "Custom domain", digite seu domínio (ex: `portfolio.com`)
3. Clique em "Save"
4. Configure os registros DNS do seu domínio:
   - **Para subdomínio** (ex: `portfolio.example.com`):
     - Tipo: CNAME
     - Valor: `seu-usuario.github.io`
   
   - **Para domínio raiz** (ex: `example.com`):
     - Tipo: A
     - Valores: 
       - 185.199.108.153
       - 185.199.109.153
       - 185.199.110.153
       - 185.199.111.153

Aguarde até 24 horas para a propagação do DNS.

## Atualizar o portfólio depois

Sempre que você fizer mudanças no código:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

O GitHub Actions vai automaticamente fazer o build e deploy novamente.

## Solução de problemas

**O site não aparece ou mostra erro 404:**
- Verifique se a branch `gh-pages` foi criada em Settings > Pages
- Confirme que o arquivo `GITHUB_TOKEN` está sendo usado corretamente no workflow
- Aguarde alguns minutos para o deploy completar

**Os estilos ou imagens não carregam:**
- Isso geralmente significa que o `base` path não foi configurado corretamente
- Verifique se `GITHUB_PAGES=true` está sendo passado no build do workflow
- Limpe o cache do navegador (Ctrl+Shift+Delete)

**Erro ao fazer push:**
- Confirme que você tem permissão de push no repositório
- Verifique se o token do GitHub está configurado corretamente
