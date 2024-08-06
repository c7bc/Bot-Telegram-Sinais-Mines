# Telegram Bot de Sinais

![Bot Banner](https://via.placeholder.com/728x90.png?text=Telegram+Bot+de+Sinais)

Este projeto é um bot do Telegram para envio de sinais do jogo Mines. O bot gera números aleatórios, calcula uma porcentagem de acerto e envia mensagens formatadas para um canal específico do Telegram.

## Funcionalidades

- Geração de números aleatórios
- Cálculo de porcentagem de acerto
- Envio de mensagens formatadas para um canal do Telegram
- Mensagem de sinal finalizado com links para plataforma

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Telegram Bot API
- date-fns
- dotenv

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

## Instalação

1. Clone o repositório:

    ```sh
    git clone https://github.com/devnerii/Bot-Telegram-Sinais-Mines
    cd Bot-Telegram-Sinais-Mine
    ```

2. Instale as dependências:

    ```sh
    npm install
    ```

3. Configure as variáveis de ambiente:

    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```env
    TELEGRAM_BOT_TOKEN=seu-token-do-bot
    CHAT_ID=seu-id-do-canal
    LINK_SITE=https://www.link.com
    PLATFORM_LINK=https://www.plataforma.com
    ```

## Uso

Para iniciar o bot, execute:

```sh
npm start
```

## Contato
Autor: Daniel Neri
Email: dnnxzz70@gmail.com
LinkedIn: [Meu Perfil](https://www.linkedin.com/in/daniel-neri-51a7b12b3/)