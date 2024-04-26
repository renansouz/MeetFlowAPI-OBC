<div align="center">
  <img width="500px" src="https://i.imgur.com/oLCyMZ2.jpeg" />
</div>

# 🚀 MeetFlowAPI - Simplifique seus Agendamentos 📅

Bem-vindo ao repositório do backend do MeetFlow! Este é o servidor que suporta a plataforma de agendamento moderna, conectando profissionais e clientes para simplificar o processo de agendamento de serviços.

Vídeo da plataforma visão **profissional**: [Assistir ao Vídeo](https://drive.google.com/file/d/1JHy77S6143YvVVfh6O1YcEgPKBkcTOqw/view?usp=sharing) <br/>
Vídeo da plataforma visão **cliente**: [Assistir ao Vídeo](https://drive.google.com/file/d/17N7H0Q7FM0NAguozGfd5DBo0JyY1USiX/view?usp=sharing) <br/><br/>

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Plataforma de execução de JavaScript assíncrono baseado no motor V8 do Chrome.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Fastify**: Framework web extremamente rápido e eficiente para Node.js.
- **Jest**: Framework de testes em JavaScript.
- **Plop**: Ferramenta para geração de arquivos.
- **JWT (JSON Web Tokens)**: Método padrão da indústria para realizar autenticação em APIs web.
- **Zod**: Biblioteca para validação de esquemas de dados.
- **Redis**: Banco de dados em memória para cache.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **date-fns**: Biblioteca JavaScript para manipulação de datas.
- **@aws-sdk/client-s3**: SDK da AWS para interação com o serviço S3 (usado para armazenamento de imagens).
- **Passport-google**: Middleware de autenticação para Node.js que suporta autenticação com Google.
- **Fastify/passport**: Plugin Fastify para integração com Passport.js.

## 🏗️ Arquitetura e Padrões

O projeto foi desenvolvido utilizando a arquitetura clean, seguindo os princípios SOLID. Foram aplicados design patterns como Chain of Responsibility. A arquitetura é baseada em componentes genéricos para reaproveitamento em diferentes domínios.

## 🚀 Funcionalidades

### Integrações
- Upload de imagens para a Cloudflare utilizando o Fastify-multipart e o @aws-sdk/client-s3.
- Autenticação com o Google utilizando o Passport-google e o Fastify/passport.
- Integração com o Google Calendar para adicionar eventos automaticamente quando um agendamento é aceito.

### Usuário
- Criar usuário
- Criptografar senha
- Atualizar dados
- Upload de fotos
- Buscar por profisional e categoria

### Agenda
- Criar agenda personalizada
- Definir horários de funcionamento

### Autenticação
- Autenticação de usuários
- Autenticação com o google

### Agendamento
- Criar um agendamento
- Aceitar ou recusar agendamento
- Status personalizado

### Serviços
- Criação de serviços personalizados mediante a valores

### Disponibilidade
- Gerar disponibilidade do profissional com base no horário de início e fim da sua jornada, incluindo ou não horário de almoço.
- Baseado no tempo informado pelo mesmo como duração do serviço

## 🚀 Como Instalar e Executar o Projeto
1. Clone este repositório utilizando o comando:
    ```bash
   git clone https://github.com/renansouz/MeetFlowAPI-OBC.git
2. Acesse o diretório do projeto:
   ```bash
   cd MeetFlowAPI-OBC
3. Instale as dependências utilizando o npm:
   ```bash
   npm install
4. Altere o arquivo .env.example para .env e insira as chaves:
5. Construa o projeto:
   ```bash
   npm run build
6. Após a construção do projeto, inicie o servidor:
   ```bash
   npm start

# Colaboradores 🤝🤝

| Foto                                                       | Nome                                                 |
| ---------------------------------------------------------- | ---------------------------------------------------- |
| <img src="https://github.com/miqueiasmartinsf.png" width="100"> | [Miquéias Martins](https://github.com/miqueiasmartinsf) |
| <img src="https://github.com/renansouz.png" width="100"> | [Renan Souza](https://github.com/renansouz) |
| <img src="https://github.com/WesleyR10.png" width="100"> | [Wesley Ribas](https://github.com/WesleyR10) |


