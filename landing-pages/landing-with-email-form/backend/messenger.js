const mailer = require('nodemailer');

const sendMail = async (props) => {
    const date = new Date().toLocaleString();

    // const transporter = mailer.createTransport({
    //     host: "smtp.mail.ru",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: "testmail.tut@mail.ru",
    //         pass: "rfzRI$tGtU32"
    //     }
    // });
    const transporter = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "test.tut9999@gmail.com",
            pass: "}8E$AXMD"
        }
    });

    const mailOptions = {
        // auth.user
        // from: "testmail.tut@mail.ru",
        from: "test.tut9999@gmail.com",
        // emails to which the letter will be received can be specified separated by commas
        to: "test@test.test",
        subject: "Заявка с портала",
        text: `
        Данные пользователя:
            Имя: ${props.name}
            Телефон: ${props.tel}
            Почта: ${props.email}
        Данные осужденного:
            Имя: ${props.convictName}
            Дата рождения: ${props.convictDate}
            Регион: ${props.region}
            Учреждение: ${props.institution}
            Статья: ${props.article}
            Наличие ущерба: ${props.damage}
            Срок: ${props.term}
            Окончания срока: ${props.termEnd}
            Время: ${date}
        `,
        ...((props.file && props.file[0]) ? { attachments: [
                {
                    filename: props.file[0].name,
                    content: props.file[0]
                }
        ]} : {}),
    };

    return new Promise(((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    }));

};

module.exports = sendMail;
