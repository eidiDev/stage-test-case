# Stage Case Test API

API para gestão de processos empresariais desenvolvida em **NestJS + PostgreSQL + TypeScript**.

Esta aplicação foi construída para simular um cenário real de gestão de processos organizacionais, permitindo controle de Processos, Áreas, Ferramentas, Pessoas e Documentos.

---

## 🚀 Tecnologias Utilizadas

- NestJS ^10.3.0
- TypeScript ^5.3.3
- PostgreSQL
- TypeORM ^0.3.20
- @dataui/crud ^5.3.4
- JWT Authentication (@nestjs/jwt ^10.2.0)
- Class Validator ^0.14.0

---

## 📦 Funcionalidades

A API possui:

- CRUD de Usuários (`/users`)
- CRUD de Áreas (`/areas`)
- CRUD de Ferramentas (`/tools`)
- CRUD de Pessoas (`/people`)
- CRUD de Documentos (`/documents`)
- CRUD de Processos (`/process`)
- Autenticação JWT (`/auth`)

> A maioria dos CRUds foi implementada utilizando a biblioteca **@dataui/crud**, garantindo padronização e produtividade.

---

## 🔐 Autenticação

- Login via JWT.
- Apenas a rota `POST /users` (criação de usuário) não exige token.
- Todas as demais rotas exigem: Authorization: Bearer SEU_TOKEN.


Usuários foram criados apenas para controle de autenticação e **não possuem relação com as entidades do domínio do sistema**.

---

## 🧩 Estrutura Base das Entidades

Todas as entidades do sistema fazem `extends` de uma entidade base contendo os seguintes campos padrão:

### Default Entity

- `uuid: string`
- `is_active: boolean`
- `created_at: date`
- `updated_at: date`

Esses campos são automaticamente gerenciados pela aplicação.

---

## 🔗 Relações Entre Entidades

### Processos (Entidade Central)

Relacionamentos:

### ManyToMany
- Processos ↔ Ferramentas
- Processos ↔ Pessoas
- Processos ↔ Documentos

### OneToMany
- Área → Processos  
(Uma Área pode conter vários Processos)

---

## 🛠 Endpoints

### Usuários
- `{POST} /users`
- `{GET} /users`
- `{GET} /users/:uuid`
- `{PATCH} /users/:uuid`
- `{PUT} /users/:uuid`
- `{DELETE} /users/:uuid`

### Autenticação
- `{POST} /auth`

### Áreas
- `{POST} /areas`
- `{GET} /areas`
- `{GET} /areas/:uuid`
- `{PATCH} /areas/:uuid`
- `{PUT} /areas/:uuid`
- `{DELETE} /areas/:uuid`

### Ferramentas
- `{POST} /tools`
- `{GET} /tools`
- `{GET} /tools/:uuid`
- `{PATCH} /tools/:uuid`
- `{PUT} /tools/:uuid`
- `{DELETE} /tools/:uuid`

### Pessoas
- `{POST} /people`
- `{GET} /people`
- `{GET} /people/:uuid`
- `{PATCH} /people/:uuid`
- `{PUT} /people/:uuid`
- `{DELETE} /people/:uuid`

### Documentos
- `{POST} /documents`
- `{GET} /documents`
- `{GET} /documents/:uuid`
- `{PATCH} /documents/:uuid`
- `{PUT} /documents/:uuid`
- `{DELETE} /documents/:uuid`

### Processos
- `{POST} /process`
- `{GET} /process`
- `{GET} /process/:uuid`
- `{PATCH} /process/:uuid`
- `{PUT} /process/:uuid`
- `{DELETE} /process/:uuid`

---

## 📁 DTOs e Regras de Negócio

Todas as entidades possuem:

- DTO de criação
- DTO de atualização
- Validações com `class-validator`
- Tipagem forte com TypeScript

---

## ⚙️ Pré-requisitos

- Node.js >= 18
- PostgreSQL
- Git

---

## 🧪 Instalação

Clone o projeto:

```bash
git clone https://github.com/seu-usuario/stage-case-test-api.git

Entre na pasta do projeto:

cd stage-case-test-api

Instale as dependências:

npm install

Crie um arquivo .env baseado no .env.example e configure as variáveis de ambiente:

DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
JWT_SECRET=

▶️ Executando a Aplicação

Modo desenvolvimento:

npm run start:dev

Modo produção:

npm run build
npm run start:prod
🗄️ Migrations

Gerar migration:

npm run migration:generate

Rodar migration:

npm run migration:run
📊 Status do Projeto

✔ CRUD completo

✔ Autenticação JWT

✔ Relacionamentos ManyToMany e OneToMany

✔ Estrutura base reutilizável (Default Entity)

❌ Ainda não possui deploy

👨‍💻 Autor

Lucas Eidi
📧 lucaseidikumagai@gmail.com

GitHub:
https://github.com/eidiDev