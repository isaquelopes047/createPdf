const express = require("express");
const pdf = require("html-pdf");
const ejs = require("ejs");
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/formulario', (req, res) => {
    res.render('criarDados');
});

app.post('/pdf', (req, res) => {

    const { nome, date, modelo, serie, imei, numeroChip, numeroPatrimonio, problema,
    modeloNovo, usado, serieNovo, imeiNovo, numeroChipNovo, numeroPatrimonioNovo } = req.body;

    ejs.renderFile("./views/pdfCRIADO.ejs", {
        nome: nome,
        date: date,
        modelo: modelo,
        serie: serie,
        imei: imei,
        numeroChip: numeroChip,
        numeroPatrimonio: numeroPatrimonio,
        problema: problema,
        modeloNovo: modeloNovo,
        usado: usado,
        serieNovo: serieNovo,
        imeiNovo: imeiNovo,
        numeroChipNovo: numeroChipNovo,
        numeroPatrimonioNovo: numeroPatrimonioNovo
    }, (err, html) => {
        if (!err) {
            pdf.create(html, {}).toFile("./Arquivos/meuPdf.pdf", (err, res) => {
                if (err) console.log(err);
                else {
                    console.log("PDF gerado com sucesso!",res);
                }
            })
        }
        else { console.log(err) }
    })
    res.redirect('sucess');
});

app.get('/sucess', (req, res) => {
    let filePath = "./Arquivos/meuPdf.pdf";
    res.download(filePath);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}/formulario`);
});