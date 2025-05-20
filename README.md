# Bimp Chat API

A lightweight RESTful chat service built with **Fastify**, **Prisma** and **PostgreSQL**.  
The API supports Basic Authentication, text/file messages, and cursor-style pagination.  
A live, interactive specification is available through Swagger UI.

---

## ✨ Features

- **Fastify 5** server (ES Modules)
- **Prisma ORM** + PostgreSQL
- **Basic Auth** (`Authorization: Basic …`)
- File upload via `multipart/form-data`
- Stream-based file storage (`/uploads`)
- Swagger docs
- Docker-compose for local DB (optional)

---

## 📦 Prerequisites

| Tool          | Version |
|---------------|---------|
| Node.js       | ≥ 20.x  |
| npm / pnpm    | latest  |
| PostgreSQL    | 15+     |
| Docker       | optional |

---

## 🚀 Getting Started

### 1 · Clone & install

```bash
git clone https://github.com/tzhuraveel/bimp.git . 
cd bimp
npm install
```

---

## 🚀 Start API

```bash
## Run DB locally (via Docker)
1) npm run docker:local

### Run migrations (after DB is up)
2) npm run migration:run

### Start the API
3) npm run start:prod
```


