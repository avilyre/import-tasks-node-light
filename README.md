# ⛁ import-tasks-node-light
> Projeto simples em Node.js para gerenciamento e importação de tarefas via CSV.

### Guia de Uso — import-tasks-node-light

Este guia descreve como usar a API e os scripts fornecidos no projeto: iniciar o servidor, importar tarefas via CSV e como consumir as rotas disponíveis.

Resumo rápido
- Servidor HTTP disponível em `http://localhost:8080`.
- Dois scripts principais: `npm run dev` (ambiente de desenvolvimento) e `npm run import` (importador CSV).

Pré-requisitos
- Node.js 18 ou superior.

Iniciar o servidor
1. Instale dependências: `npm install`.
2. Rode o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor escuta por padrão na porta `8080`.

Importar tarefas a partir do CSV
1. Garanta que o servidor esteja rodando.
2. Execute:

```bash
npm run import
```

O script lê `import/task-list.csv` e envia requisições `POST` para `POST /tasks` para criar cada tarefa.

API — Endpoints e uso
Base URL: `http://localhost:8080`

- GET `/tasks`
  - O que faz: retorna a lista de tarefas.
  - Query params: `search` (opcional) — filtra tarefas por `title` ou `description` que contenham o texto.
  - Sucesso: `200` com JSON array de tarefas.

- POST `/tasks`
  - O que faz: cria uma nova tarefa.
  - Body (JSON):

```json
{
  "title": "string",
  "description": "string"
}
```
  - Sucesso: `201` (sem body).
  - Erros: `400` se `title` ou `description` estiverem ausentes.

- PUT `/tasks/:id`
  - O que faz: atualiza título e descrição da tarefa identificada por `:id`.
  - Body (JSON): mesmo formato do `POST`.
  - Sucesso: `204` (sem body).
  - Erros: `400` para dados inválidos.

- PATCH `/tasks/:id/complete`
  - O que faz: alterna o estado de conclusão da tarefa (marca/desmarca).
  - Sucesso: `204` (sem body).
  - Erros: `404` se a tarefa não existir.

- DELETE `/tasks/:id`
  - O que faz: remove a tarefa especificada.
  - Sucesso: `204` (sem body).

Exemplos rápidos (curl)

Listar todas as tarefas:

```bash
curl http://localhost:8080/tasks
```

Buscar tarefas (com filtro):

```bash
curl "http://localhost:8080/tasks?search=leitura"
```

Criar tarefa:

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Comprar leite","description":"Ir ao mercado"}'
```

Atualizar tarefa:

```bash
curl -X PUT http://localhost:8080/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Novo título","description":"Descrição atualizada"}'
```

Marcar/desmarcar como completa:

```bash
curl -X PATCH http://localhost:8080/tasks/<id>/complete
```

Deletar:

```bash
curl -X DELETE http://localhost:8080/tasks/<id>
```

CSV para importação
- Local do arquivo: `import/task-list.csv`.
- Formato esperado: duas colunas por linha (sem cabeçalho após a primeira linha): `title,description`.
- O script `npm run import` envia cada linha como um `POST /tasks` para o servidor.

Comportamento e códigos de status (resumo)
- `200` — sucesso com retorno de dados (GET).
- `201` — criado (POST).
- `204` — operação concluída sem conteúdo (PUT, PATCH, DELETE bem-sucedidos).
- `400` — requisição inválida (dados ausentes ou malformados).
- `404` — recurso não encontrado.

Dicas rápidas
- Sempre inicie o servidor antes de rodar `npm run import`.
- Verifique a porta (`8080`) caso já exista outro serviço usando-a.
- O arquivo `database.json` contém os dados persistidos localmente.

Próximos passos (opcional)
- Adicionar `npm run start` para produção.
- Incluir testes automatizados para as rotas.
