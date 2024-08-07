# Telegram Bot de Sinais

[![Node.js Version](https://img.shields.io/badge/node.js-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![npm Version](https://img.shields.io/badge/npm-%3E%3D6.0.0-brightgreen)](https://www.npmjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-4.0.0-blue)](https://www.typescriptlang.org/)
[![Telegram Bot API](https://img.shields.io/badge/telegram--bot--api-latest-blue)](https://core.telegram.org/bots/api)
[![date-fns](https://img.shields.io/badge/date--fns-2.21.1-blue)](https://date-fns.org/)
[![dotenv](https://img.shields.io/badge/dotenv-8.2.0-blue)](https://www.npmjs.com/package/dotenv)
[![License](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

Este projeto é um bot do Telegram para envio de sinais do jogo Mines. O bot gera números aleatórios, calcula uma porcentagem de acerto e envia mensagens formatadas para um canal específico do Telegram.

## Funcionalidades

- Geração de números aleatórios
- Cálculo de porcentagem de acerto
- Envio de mensagens formatadas para um canal do Telegram
- Mensagem de sinal finalizado com links para plataforma

![Bot Banner](https://cdn.discordapp.com/attachments/1242470925379702835/1270571530149171271/Screenshot_2024-08-06_233432.png?ex=66b42f72&is=66b2ddf2&hm=87efa3296164757f8df7041407abda32938996dc895e092c36b95298106cc27a&)

## Tecnologias Utilizadas

- [![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
- [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
- [![Telegram Bot API](https://img.shields.io/badge/Telegram%20Bot%20API-26A5E4?logo=telegram&logoColor=white)](https://core.telegram.org/bots/api)
- [![date-fns](https://img.shields.io/badge/date--fns-00C8FF?logo=date-fns&logoColor=white)](https://date-fns.org/)
- [![dotenv](https://img.shields.io/badge/dotenv-ECD53F?logo=dotenv&logoColor=black)](https://www.npmjs.com/package/dotenv)

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
