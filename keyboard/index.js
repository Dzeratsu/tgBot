import {Markup} from "telegraf";


export const MainMenu= () => {
    return Markup.keyboard([
        ['Получить консультацию', 'Контакты'],
        ['Информация о составах']
    ]).resize()
}

export const type = () => {
    return Markup.inlineKeyboard([
        Markup.button.callback('Огнезащита древесины', '0'),
        Markup.button.callback('Антисептирование', '1'),
        Markup.button.callback('Декор', '2')
        ],
        {columns: 2})
}

export const ogneBio = () => {
    return Markup.inlineKeyboard([
        Markup.button.callback('«Pirilax®»-Classic', 'p0'),
        Markup.button.callback('«Pirilax®»-Lux', 'p1'),
        Markup.button.callback('«Pirilax®»-Prime', 'p2'),
        Markup.button.callback('«Pirilax®»-Terma', 'p3'),
        Markup.button.callback('«ОЗОН®-007»', 'p4'),
        Markup.button.callback('«МИГ®-09»', 'p5'),
    ], {columns:2})
}
export const antisep = () => {
    return Markup.inlineKeyboard([
        Markup.button.callback('«Nortex®»-Doctor', 'a0'),
        Markup.button.callback('«Nortex®»-Lux', 'a1'),
        Markup.button.callback('«Нортекс®»-Транзит', 'a2'),
        Markup.button.callback('«Нортекс®»-Доктор ЗИМНИЙ', 'a3'),
        Markup.button.callback('Невымываемый антисептик «Nortex®»-Alfa', 'a4'),
    ], {columns:2})
}

export const decor = () => {
    return Markup.inlineKeyboard([
        Markup.button.callback('«KRASULA®» для древесины', 'd0'),
        Markup.button.callback('«KRASULA® Aqua»', 'd1'),
        Markup.button.callback('«KRASULA® для древесины тика»', 'd2'),
        Markup.button.callback('«KRASULA® для бань и саун»', 'd3'),
        Markup.button.callback('«KRASULA® масло для полков»', 'd4'),
    ], {columns:1})
}

export const zayvka = () => {
    return Markup.inlineKeyboard([
        Markup.button.callback('Звонок', 'z0'),
        Markup.button.callback('Сообщение в телеграмм', 'z1')
    ], {columns:2})
}

export const arrAction = ['0','1','2','p0','p1','p2','p3','p4','p5','a0','a1','a2','a3','a4','d0','d1','d2','d3','d4','z0','z1']