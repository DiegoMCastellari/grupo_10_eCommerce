var nodemailer =require('nodemailer');



const indexController = {
    home: (req, res, next) => {

        res.render('home', {
            usuario: req.usuarioLogueado
        });
    },
    ayuda: (req, res, next) => {
        res.render('ayuda', {
            usuario: req.usuarioLogueado
        });
    },
    contacto: (req, res, next) => {
        res.render('contacto', {
            usuario: req.usuarioLogueado
        });
    },
    sendEmail : (req, res, next)=>{
        var transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'kathleen86@ethereal.email',
                pass: 'zc8C5jYB9TnEfKpx7x'
            }
        });
        var mailOptions = {
            from: req.body.email,
            to: "kathleen86@ethereal.email",
            subjet: req.body.asunto,
            text: req.body.nombre+" "+":"+" "+req.body.msj+" "+req.body.tel
        }

        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                res.status(500).send(error.message)
            }else{
                console.log("Email Enviado");
                res.redirect('/');
            }
        })}
};

module.exports = indexController;