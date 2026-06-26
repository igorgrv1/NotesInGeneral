# Better Auth Demo

Demo minimalista de autenticação com **Next.js App Router**, **Better Auth**, **GitHub OAuth** e **SQLite local**.

---

## Pré-requisitos

- Node.js 18+ e npm
- Uma conta GitHub para criar um OAuth App

---

## 1. Criar OAuth App no GitHub

1. Acesse: [github.com/settings/developers](https://github.com/settings/developers)
2. Clique em **New OAuth App**
3. Preencha:
   - **Application name:** Better Auth Demo
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
4. Copie o **Client ID** e gere um **Client Secret**

---

## 2. Configurar variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Edite `.env.local` e preencha:

```env
BETTER_AUTH_SECRET=um-segredo-aleatorio-longo-aqui
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=seu_client_id_aqui
GITHUB_CLIENT_SECRET=seu_client_secret_aqui
```

> **Dica:** gere um secret seguro com `openssl rand -base64 32`

---

## 3. Instalar dependências

```bash
npm install
```

---

## 4. Criar as tabelas no banco SQLite

```bash
npx @better-auth/cli migrate
```

Isso cria o arquivo `better-auth.sqlite` com as tabelas `user`, `session`, `account`, etc.

---

## 5. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## Fluxo de uso

| Rota | Descrição |
|------|-----------|
| `/` | Home — exibe estado da sessão (logado / não logado) |
| `/sign-in` | Página de login com botão "Entrar com GitHub" |
| `/api/auth/[...all]` | Handler do Better Auth (não acessar diretamente) |

1. Acesse `/` — aparece "Você não está logado"
2. Clique em **Fazer Login** → vai para `/sign-in`
3. Clique em **Entrar com GitHub** → redireciona para GitHub OAuth
4. Após autorizar, volta para `/` mostrando nome e e-mail do usuário
5. Clique em **Sair** para encerrar a sessão

---

## Estrutura de arquivos

```
better-auth-demo/
├── app/
│   ├── api/auth/[...all]/route.ts   # Handler Better Auth
│   ├── sign-in/page.tsx             # Página de login
│   ├── page.tsx                     # Home com estado de sessão
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── auth.ts                      # Configuração servidor (Better Auth)
│   └── auth-client.ts               # Client React
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Dependências principais

| Pacote | Papel |
|--------|-------|
| `better-auth` | Auth framework (servidor + cliente) |
| `better-sqlite3` | Driver SQLite nativo |
| `next` | Framework React (App Router) |
| `tailwindcss` | Estilização |
