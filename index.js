const TelegramBot = require('node-telegram-bot-api');
const { format } = require('date-fns');
require('dotenv').config();  // Carrega as variáveis de ambiente

// Substitua pelo seu Token do bot do Telegram
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const chatId = process.env.CHAT_ID;  // ID do canal
const LINK_SITE = process.env.LINK_SITE;
const PLATFORM_LINK = process.env.PLATFORM_LINK;

// Função para gerar números aleatórios
async function generateRandomNumbers() {
    const { default: randomInt } = await import('random-int');
    const resultados = Array.from({ length: 25 }, (_, i) => i + 1);
    const aposta = [];
    while (aposta.length < 5) {
        const num = resultados[Math.floor(Math.random() * resultados.length)];
        if (!aposta.includes(num)) {
            aposta.push(num);
        }
    }
    return aposta;
}

// Função para gerar uma porcentagem de acerto
function getAccuracyPercentage() {
    const random = Math.random() * 100;
    if (random < 85) return (Math.random() * (100 - 85) + 85).toFixed(2);
    return random.toFixed(2);
}

// Função para formatar a mensagem
function formatMessage(aposta, bb, tt, nh, accuracy) {
    const dc = Array.from({ length: 25 }, (_, i) => aposta.includes(i + 1) ? '💎' : '🟦');
    let formattedMessage = `
✅ ENTRADA CONFIRMADA ✅

Silent Mines 💣

💣 Bombas:  ${bb}

`;
    for (let i = 0; i < 25; i += 5) {
        formattedMessage += `         ${dc.slice(i, i + 5).join(' ')}\n`;
    }
    formattedMessage += `
⏰ Válido até: ${nh}
📈  Chance de acerto: ${accuracy}%
🎯 Tentativas: ${tt}x`;

    // Escapando caracteres reservados no Markdown do Telegram
    return formattedMessage.replace(/([_\*\[\]\(\)\~\`\>\#\+\-\=\|\{\}\.\!])/g, '\\$1');
}

// Função para deletar a mensagem
async function deleteMessage(messageId) {
    try {
        await bot.deleteMessage(chatId, messageId);
    } catch (error) {
        console.error('Error deleting message:', error);
    }
}

// Função principal
async function main() {
    while (true) {
        try {
            const aposta = await generateRandomNumbers();
            const { default: randomInt } = await import('random-int');
            const bb = randomInt(3, 5);
            const tt = randomInt(1, 4);

            // Definindo o tempo nh entre 2 a 3 minutos
            const na = randomInt(2, 3);
            const nh = new Date(Date.now() + na * 60000);
            const nhFormatted = format(nh, 'HH:mm');

            const accuracy = getAccuracyPercentage();
            const msg = formatMessage(aposta, bb, tt, nhFormatted, accuracy);

            // Enviar mensagem de busca de sinal
            const searchingMessage = await bot.sendMessage(chatId, `Buscando sinal (${accuracy}%) 🔎…`);

            // Espera por 5 segundos
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Deletar a mensagem de busca de sinal
            await deleteMessage(searchingMessage.message_id);

            // Enviar mensagem de sinal
            await bot.sendMessage(chatId, msg, {
                parse_mode: 'MarkdownV2',
                disable_web_page_preview: true,
                reply_markup: {
                    inline_keyboard: [[{ text: 'JOGAR MINES 💎', url: LINK_SITE }]]
                }
            });

            // Calcular o tempo até nh e aguardar
            const timeUntilNh = nh.getTime() - Date.now();
            await new Promise(resolve => setTimeout(resolve, timeUntilNh));

            // Mensagem de sinal finalizado
            const finalMessage = `
✅ Sinal finalizado\\. Se cadastre na plataforma 👇🏼
`;
            await bot.sendMessage(chatId, finalMessage, {
                parse_mode: 'MarkdownV2',
                disable_web_page_preview: true,
                reply_markup: {
                    inline_keyboard: [[{ text: 'PLATAFORMA AQUI🎰', url: PLATFORM_LINK }]]
                }
            });

            // Espera de 30 a 60 segundos antes de buscar um novo sinal
            const sleepTime = randomInt(30, 60) * 1000;
            await new Promise(resolve => setTimeout(resolve, sleepTime));
        } catch (error) {
            console.error(error);
        }
    }
}

main();
