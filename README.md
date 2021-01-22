# Prova de Backend

O projeto inicial é um cadastro de usuários em memória muito simples e sem utilizar nenhuma lib. Apesar de o código estar em qualidade baixa, o projeto está funcional. O que se espera é que o candidato melhore este código de uma maneira que possamos avaliar suas habilidades e competências.

### Rodando o projeto

`node src/index.js`

## O que será avaliado?

A idéia é deixar o candidato bem livre pra reimplementar o código da maneira que mais lhe for conveniente e que mais demonstre suas habilidades. Está liberado o uso de libs de terceiros, bancos de dados, autenticação, etc.

1. Qualidade de código
2. Uso de patterns adequados
3. Estratégia de validação de dados
4. Testes unitários

## O que é desejado (não obrigatório) na entrega?

1. Adição de Banco de dados
2. Utilização de docker
3. Autenticação
4. Utilização de typescript

## Como será feita a entrega?

Deverá ser realizado um fork deste repositório e no formulário enviado você deverá responder com o link deste fork.

## Como testar?

1. Tenha o docker instalado na maquina
2. Rode o comando `docker-compose up --build`

## Endpoints da aplicação?

1. POST /v1/users
   body:
   name: string
   username: string
   email: string

2. GET /v1/users

3. PUT /v1/users
   body:
   name: string
   username: string
   email: string

4. DELETE /v1/users/:id
   params:
   id: string
