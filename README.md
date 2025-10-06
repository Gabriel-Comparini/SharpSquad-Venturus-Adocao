# Projeto de um Sistema de Adoção - Venturus (Backend)

## 📜 Descrição

O projeto de adoção de animais ofertado e apoiado pela empresa **[Venturus](https://www.instagram.com/venturusoficial/)** teve seu backend feito pela equipe _**Sharp Squad**_. O projeto tem como objetivo proporcionar uma comunicação mais simples entre sistemas de bancos de dados e os centros de adoção de animais.

## 💻 Tecnologias

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" width="100"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg" width="100"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="100"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" width="100"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original.svg" width="100"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg" width="100"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/insomnia/insomnia-original.svg" width="100"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" width="100"/>
</p>

## 🛠️ Requisitos

Para você conseguir ter êxito na clonagem e execução de nosso projeto, você deve ter um ambiente de desenvolvimento preparado para isso. <br>

#### 1. Tenha o [Git](https://git-scm.com) instalado em sua máquina[Necesário para clonar o repositório remoto com o local]

#### 2. Obtenha o [Node](https://www.nodejs.tech/pt-br/download) [necessário para a execução do servidor]

#### 3. Para testar as requisições, tenha o [Insomnia](https://insomnia.rest/download) ou o [Postman](https://www.postman.com/downloads/) [há a extensão do Postman na IDE do VS Code caso não queira instalar propriamente a aplicação]

## 🪟 Comandos do Console

Com o Git e o Node já instalados, execute os seguintes comandos abaixo:

```bash
# Clone o repositório: 
git clone https://github.com/Gabriel-Comparini/SharpSquad-Venturus-Adocao.git
```

```bash
# Instale as dependências:
npm install
```

```bash
# Rode o projeto:
npm run start
```

## 👨‍💻 Equipe Sharp Squad

| **Nomes** | **Cargos** | **Githubs** |
|-----------|------------|-----------|
| Breno Velentim | Gerente/Dev Fullstack | [Breno Valentim](https://github.com/Breno-V) |
| Fabrício Krull | Dev Backend | [Fabrício Krull](https://github.com/Fabricio-Krull) |
| Gabriel Comparini | Dev Fullstack | [Gabriel Comparini](https://github.com/Gabriel-Comparini)
| João Crepaldi | Dev Frontend | [João Crepaldi](https://github.com/JooCrepaldi)

## 🏫 Bibliotecas utilizadas

### [BCrypt](https://www.npmjs.com/package/bcrypt) 🌊

O BCrypt é uma biblioteca na qual facilita a criptografia e descriptografia de dados. A escolha de utilizar BCrypt ao invés de Encrypt.js foi um manuseio mais simples de criptografar dados seníveis como senhas e emails.

### [Faz-um-Pix](https://www.npmjs.com/package/faz-um-pix) 💰

A biblioteca faz um pix foi crucial para utilizarmos os dados proferidos pelo usuários para desenvolver um link de chave pix e um QR Code para facilitar o meio de transações financeiras.

### [Dotenv](https://www.npmjs.com/package/dotenv) 🔐

O Dotenv é a mais conhecida das bibliotecas e de suma importância para criar variáveis de um ambiente de desenvolvimento que contenham dados sensíveis, como chaves de APIs e senhas.
