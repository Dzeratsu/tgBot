import express, {request} from 'express'
import {TOKEN, PORT} from './config/config.js'
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
/*bot.use(Telegraf.log())*/
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

bot.command('contact', (ctx)=> {
    const keyboard = Markup.keyboard([
        Markup.contact.Request.Button('give me your phone')
    ])
    return ctx.reply("test", Extra.markup(keyboard).markdown())
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
            'text': 'Это сообщение получит менеджер, тут есть время оставление заявки, а так же имя профиля',
            'username': ctx.callbackQuery.from.username,
            'id': ctx.callbackQuery.from.id,
            'Дата': time
        }
        ctx.reply('В ближайшее время наш менеджер свяжется с вами. PS впринципе можно сделать сканирование времени отправки и если сообщение не в период нашего рабочего времени давать сообщение о времени работы и со скольки до скольки мы работаем. НО может быть баг с часовыми поясами, вообщем надо подумать пока не обещаюпос')
        ctx.telegram.sendMessage(ctx.callbackQuery.from.id, zayvka)
    }
})

bot.on('sticker', ctx => {
    ctx.reply('Приятно, что Вы отправляете мне стикеры :)')
})
bot.on('contact', ctx => {
        return ctx.reply('Спасибо, в ближайшее время мы свяжемся с вами', MainMenu(),
            {
                reply_markup: {
                    remove_keyboard: true
                }
            }
        )
})
bot.on('callback_query', ctx =>  {
    return ctx.reply('123', MainMenu, {
        reply_markup: {
            remove_keyboard: true
        }
    })
})

bot.hears('Спасибо, в ближайшее время мы свяжемся с вами', ctx => ctx.reply( MainMenu()))
bot.launch()

//ctx.telegram.sendMessage('5144269138', 'Василий')/> //