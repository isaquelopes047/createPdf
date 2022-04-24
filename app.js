const express = require("express");
const pdf = require("html-pdf");
const ejs = require("ejs");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/formulario', (req, res) => {
    res.render('index');
});

app.get('/pdf', (req, res) => {
    res.render('sucess');
    ejs.renderFile("./views/index.ejs", {}, (err, html) => {
        if (err) {
            console.log(err)
        } else {

            pdf.create(html, {}).toFile("./meuPdf.pdf", (err, res) => {
                if (err) {
                    console.log('erro');
                } else {
                    console.log(res);
                }
            })

        }
    })
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


















/* const express = require("express")
const app = express();
const pdf = require("html-pdf");
const ejs = require("ejs");

app.set('view engine', 'ejs');
app.set('views', './views');

app.get("formulario", (req, res) => {
    res.render('index');
})

app.get("pdf", (req, res) => {
    var nome = "Isaque";
    ejs.renderFile("./meuarquivo.ejs", { nome: nome }, (err, html) => {
        if (err) {
            console.log(err)
        } else {

            pdf.create(html, {}).toFile("./meuPdf.pdf", (err, res) => {
                if (err) {
                    console.log('erro');
                } else {
                    console.log(res);
                }
            })

        }
    })
})

const port = 8080;
app.listen(port, (erro) => {
    if (erro) console.log(erro)
    else console.log(`Servidor aberto em: http://localhost:${port}/formulario`)
})













 */