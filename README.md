![MeetFlow Logo](https://i.imgur.com/0CUyn4O.jpeg)

# 🚀 MeetFlowAPI - Simplifique seus Agendamentos 📅

Bem-vindo ao repositório do backend do MeetFlow! Este é o servidor que suporta a plataforma de agendamento moderna, conectando profissionais e clientes para simplificar o processo de agendamento de serviços.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Plataforma de execução de JavaScript assíncrono baseado no motor V8 do Chrome.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Fastify**: Framework web extremamente rápido e eficiente para Node.js.
- **Jest**: Framework de testes em JavaScript.
- **Plop**: Ferramenta para geração de arquivos.
- **JWT (JSON Web Tokens)**: Método padrão da indústria para realizar autenticação em APIs web.
- **Zod**: Biblioteca para validação de esquemas de dados.
- **Redis**: Banco de dados em memória para cache.
- **date-fns**: Biblioteca JavaScript para manipulação de datas.

## 🏗️ Arquitetura e Padrões

O projeto foi desenvolvido utilizando a arquitetura clean, seguindo os princípios SOLID. Foram aplicados design patterns como Chain of Responsibility. A arquitetura é baseada em componentes genéricos para reaproveitamento em diferentes domínios.

## 🚀 Funcionalidades

### Usuário
- Criar usuário
- Criptografar senha

### Agenda
- Criar agenda personalizada por semana
- Definir horários de funcionamento
- Busca paginada em todos os domínios

### Autenticação
- Autenticação de usuários

### Agendamento
- Criar um agendamento
- Aceitar ou recusar agendamento
- Status personalizado e regras entre eles

### Serviços
- Criação de serviços personalizados mediante a valores

### Disponibilidade
- Gerar disponibilidade do profissional com base no horário de início e fim da sua jornada
- Baseado no tempo informado pelo mesmo como duração do serviço

# Colaboradores 🤝🤝

| Foto                                                       | Nome                                                 |
| ---------------------------------------------------------- | ---------------------------------------------------- |
| <img src="https://github.com/miqueiasmartinsf.png" width="100"> | [Miquéias Martins](https://github.com/miqueiasmartinsf) |
| <img src="https://github.com/renansouz.png" width="100"> | [Renan Souza](https://github.com/renansouz) |
| <img src="https://github.com/WesleyR10.png" width="100"> | [Wesley Ribas](https://github.com/WesleyR10) |

## 🚀 Como Instalar e Executar o Projeto
1. Clone este repositório utilizando o comando:
    ```bash
   https://github.com/renansouz/MeetFlowAPI-OBC.git
2. Acesse o diretório do projeto:
   ```bash
   cd MeetFlowAPI-OBC
3. Instale as dependências utilizando o npm:
   ```bash
   npm install
4. Após a instalação das dependências, inicie o servidor:
   ```bash
    npm start
