import express from 'express'
import {TOKEN, PORT} from './config/config.js'
import router from './routes/index.js'
import {Telegraf} from "telegraf";
import {SayHi, contacts} from "./DB/message.js";
import {MainMenu, type, ogneBio, antisep, decor, zayvka, arrAction} from "./keyboard/index.js";


const app = express()
const bot = new Telegraf(TOKEN)

app.use(router)

app.listen(PORT, () => {
    console.log(`Сервер для телеграмм бота запущен на порту: ${PORT}`)
})
app.use(function (req, res) {
    res.status(404).send('page not found')
})


bot.start(ctx => {
    ctx.replyWithHTML(SayHi.text, MainMenu())
})
bot.hears('give_me_chat_id', ctx => ctx.reply(ctx.message.chat.id))
bot.hears('Контакты', ctx => {
    ctx.replyWithHTML(`${contacts.text}.\n\n` +
        `Телефон: <b>${contacts.phone}</b>\n` +
        `Email: <b>${contacts.email}</b>\n` +
        `Сайт: https://www.nort-udm.ru  \n` +
        `Или вы можете написать нашему менеджеру в рабочее время @npo_nort`
    )
})
bot.hears('Информация о составах', ctx => {
    ctx.replyWithHTML('<b>Выберите товарную группу:</b>', type())
})
bot.hears('Получить консультацию', ctx => {
    ctx.replyWithHTML('<b>Какой способ связи вам будет удобнее:</b>', zayvka())
})
//arrAction
bot.action(['0','1','2', 'z0', 'z1'], ctx => {
    if(ctx.callbackQuery.data === '0'){
      ctx.replyWithHTML('<b>Выберите интересующий вас биопирен®:</b>', ogneBio())
    }
    else if(ctx.callbackQuery.data === '1'){
        ctx.replyWithHTML('<b>Выберите интересующий вас антисептик:</b>', antisep())
    }else if (ctx.callbackQuery.data === 'z0'){
        ctx.reply('работа с текстом')
    }else if (ctx.callbackQuery.data === 'z1'){
        ctx.reply('работа с сообщениями')
    }
    else {
        ctx.replyWithHTML('<b>Выберите интересующий вас защитно декоративный состав:</b>', decor())
    }
})
bot.action(['z0, z1'], ctx => {
    if (ctx.callbackQuery.data === 'z0'){
           ctx.reply('работа с текстом')
    }else {
        let zayvka = {
            'name': ctx.message.from.first_name,
            'id': ctx.message.from.id
        }
        console.log(zayvka)
    }
})
bot.on('sticker', ctx => {
    ctx.reply('Приятно, что Вы отправляете мне стикеры :)')
})
bot.launch()

//ctx.telegram.sendMessage('5144269138', 'Василий')/> //