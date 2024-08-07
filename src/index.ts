import TelegramBot from 'node-telegram-bot-api';
import { format, utcToZonedTime } from 'date-fns-tz'; // Atualizado para importar o utcToZonedTime
import * as dotenv from 'dotenv';
import { randomInt } from 'crypto';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN!;
const chatId = process.env.CHAT_ID!;
const LINK_SITE = process.env.LINK_SITE!;
const PLATFORM_LINK = process.env.PLATFORM_LINK!;

// Verifica se as variáveis de ambiente estão definidas
if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN não está definido nas variáveis de ambiente');
}
if (!chatId) {
    throw new Error('CHAT_ID não está definido nas variáveis de ambiente');
}
if (!LINK_SITE) {
    throw new Error('LINK_SITE não está definido nas variáveis de ambiente');
}
if (!PLATFORM_LINK) {
    throw new Error('PLATFORM_LINK não está definido nas variáveis de ambiente');
}

process.env.NTBA_FIX_319 = '1';

const bot = new TelegramBot(token, { polling: true });

// Função para gerar números aleatórios
async function generateRandomNumbers(): Promise<number[]> {
    const resultados = Array.from({ length: 25 }, (_, i) => i + 1);
    const aposta: number[] = [];
    while (aposta.length < 5) {
        const num = randomInt(1, 26);
        if (!aposta.includes(num)) {
            aposta.push(num);
        }
    }
    return aposta;
}

// Função para gerar uma porcentagem de acerto
function getAccuracyPercentage(): string {
    const random = Math.random() * 100;
    if (random < 85) return (Math.random() * (100 - 85) + 85).toFixed(2);
    return random.toFixed(2);
}

// Função para formatar a mensagem
function formatMessage(aposta: number[], bb: number, tt: number, nh: string, accuracy: string): string {
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

    return formattedMessage.replace(/([_\*\[\]\(\)\~\`\>\#\+\-\=\|\{\}\.\!])/g, '\\$1');
}

// Função para deletar a mensagem
async function deleteMessage(chatId: string, messageId: number): Promise<void> {
    try {
        await bot.deleteMessage(chatId, messageId);
    } catch (error) {
        console.error('Error deleting message:', error);
    }
}

// Função principal
async function main(): Promise<void> {
    const timeZone = 'America/Sao_Paulo'; // Define o fuso horário de São Paulo

    while (true) {
        try {
            const aposta = await generateRandomNumbers();
            const bb = randomInt(3, 6);
            const tt = randomInt(1, 5);

            const na = randomInt(2, 4);
            const nh = utcToZonedTime(Date.now() + na * 60000, timeZone); // Converte para o fuso horário de São Paulo
            const nhFormatted = format(nh, 'HH:mm', { timeZone });

            const accuracy = getAccuracyPercentage();
            const msg = formatMessage(aposta, bb, tt, nhFormatted, accuracy);

            const searchingMessage = await bot.sendMessage(chatId, `Buscando sinal (${accuracy}%) 🔎…`);

            await new Promise(resolve => setTimeout(resolve, 5000));

            await deleteMessage(chatId, searchingMessage.message_id);

            await bot.sendMessage(chatId, msg, {
                parse_mode: 'MarkdownV2',
                disable_web_page_preview: true,
                reply_markup: {
                    inline_keyboard: [[{ text: 'JOGAR MINES 💎', url: LINK_SITE }]]
                }
            });

            const timeUntilNh = nh.getTime() - Date.now();
            await new Promise(resolve => setTimeout(resolve, timeUntilNh));

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

            const sleepTime = randomInt(30, 61) * 1000;
            await new Promise(resolve => setTimeout(resolve, sleepTime));
        } catch (error) {
            console.error(error);
        }
    }
}

main();
