/*author: Andrei Erokhin*/
import express from 'express'
import fs from 'fs'
import {TOKEN, PORT, ADMIN} from './config/config.js'
import router from './routes/index.js'
import {Telegraf} from "telegraf";
import {SayHi, contacts} from "./DB/message.js";
import {MainMenu, type, ogneBio, antisep, decor, zayvka, arrAction} from "./keyboard/index.js";
import {Markup} from "telegraf";

const app = express()
const bot = new Telegraf(TOKEN)

app.use(router)

app.listen(PORT, () => {
    console.log(`Сервер для телеграмм бота запущен на порту: ${PORT}`)
})
app.use(function (req, res) {
    res.status(404).send('page not found')
})

let item;
fs.readFile('DB/item.json', function (err, data){
    if(!err){
        item = JSON.parse(data)
    }
})
class Mask{
    constructor (tovar){
        this.name = tovar.name;
        this.description = tovar.description;
        this.photo = tovar.photo;
        this.link = tovar.link
    }
    get info() {
        return this.infoMask()
    }
    photo() {
        return this.photo
    }
    link() {
        return this.link
    }
    infoMask(){
        return `<b>${this.name}</b>\n` +
            `${this.description}\n`
    }
}

bot.use(Telegraf.log())
bot.start(ctx => {
    ctx.replyWithHTML(SayHi.text, MainMenu())
})
bot.hears('give_me_chat_id', ctx => ctx.reply(ctx.message.chat.id))
bot.hears('give_me_callback', ctx => ctx.reply(ctx.message))
bot.hears('\ud83d\udcbb Контакты', ctx => {
    ctx.replyWithHTML(`${contacts.text}.\n\n` +
        `Телефон: <b>${contacts.phone}</b>\n` +
        `Email: <b>${contacts.email}</b>\n` +
        `Сайт: https://www.nort-udm.ru  \n` +
        `Или вы можете написать нашему менеджеру в рабочее время @npo_nort`
    )
})
bot.hears('\ud83d\udcd6 Информация о составах', ctx => {
    ctx.replyWithHTML('<b>Выберите товарную группу:</b>', type())
})
bot.hears('\ud83d\udc68\u200d\ud83d\udcbc Получить консультацию', ctx => {
    ctx.replyWithHTML('<b>Какой способ связи вам будет удобнее:</b>', zayvka())
})

bot.action(arrAction,  ctx => {
    if(ctx.callbackQuery.data === '0'){
      ctx.replyWithHTML('<b>Выберите интересующий вас биопирен®:</b>', ogneBio())
    }
    else if(ctx.callbackQuery.data === '1') {
        ctx.replyWithHTML('<b>Выберите интересующий вас антисептик:</b>', antisep())
    }
    else if(ctx.callbackQuery.data === '2'){
            ctx.replyWithHTML('<b>Выберите интересующий вас защитно декоративный состав:</b>', decor())
        }
    else if (ctx.callbackQuery.data === 'z0') {
            return ctx.reply(
                'Отправьте нам пожалуйста ваши контакты, кнопкой ниже',
                Markup.keyboard([
                    Markup.button.contactRequest('Отправить контакты'),
                    Markup.button.callback('Отказаться', 'esc')
                ]).resize(), {remove_keyboard: true}
            )
        }
    else if (ctx.callbackQuery.data === 'z1'){
        let data = new Date()
        let time = data.getHours() + ":" + data.getMinutes() + " / " + data.getDate() + ":"+ data.getMonth() + 1 + ":" + data.getFullYear()
        let zayvka = {
            'username': ctx.callbackQuery.from.username,
            'id': ctx.callbackQuery.from.id,
            'date': time
        }
        ctx.reply('В ближайшее время наш менеджер свяжется с вами.')
        ctx.telegram.sendMessage(ADMIN, zayvka)
    }

    else if (ctx.callbackQuery.data === 'esc') {
        return ctx.replyWithHTML('Отказаться', MainMenu())
    }
///////Блок товаров////
    else if(ctx.callbackQuery.data === 'p0'){
        let compound = new Mask(item.classic)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'p1'){
        let compound = new Mask(item.lux)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'p2'){
        let compound = new Mask(item.terma)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'p3'){
        let compound = new Mask(item.prime)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'p4'){
        let compound = new Mask(item.ozon)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'p5'){
        let compound = new Mask(item.mig)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'a0'){
        let compound = new Mask(item.doctor)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'a1'){
        let compound = new Mask(item.nlux)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'a2'){
        let compound = new Mask(item.tranzit)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'a3'){
        let compound = new Mask(item.winter)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'a4'){
        let compound = new Mask(item.alfa)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'd0'){
        let compound = new Mask(item.krasula)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'd1'){
        let compound = new Mask(item.aqua)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'd2'){
        let compound = new Mask(item.tika)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'd3'){
        let compound = new Mask(item.banya)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
    else if(ctx.callbackQuery.data === 'd4'){
        let compound = new Mask(item.polki)
        return ctx.replyWithHTML(compound.info, ctx.replyWithPhoto({url:compound.photo}, {caption: `\ud83c\udf10 ${compound.link}`}))
    }
/////Конец блока товаров/////
})

bot.on('sticker', ctx => {
    ctx.reply('Приятно, что Вы отправляете мне стикеры :)')
})
bot.on('contact', ctx => {
        return ctx.reply('Спасибо, в ближайшее время мы свяжемся с вами', MainMenu(), ctx.telegram.sendMessage(ADMIN, ctx.message.contact),
            {
                reply_markup: {
                    remove_keyboard: true
                }
            }
        )
})

bot.hears('Отказаться', ctx => ctx.reply("Вы можете отправить контакты позже!", MainMenu()))
bot.launch()
