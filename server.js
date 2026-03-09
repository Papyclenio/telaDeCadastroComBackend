import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import fs from "fs";

const app = express();
const porta = 8000;
const path = "./src/banco/dado.json";

app.use(express.json());
app.use(cors())

async function criptSenha(passWord) {
    const hast = await bcrypt.hash(passWord, 10);
    return hast
}

app.get("/", (req, res) => {
  fs.readFile(path, "utf-8", (err, dado) => {
    try {
      const dadoConv = JSON.parse(dado);
      res.status(200).json(dadoConv);
    } catch (error) {
      res.status(500).send("DEU ERRO");
      console.log("DEU ERRO", Error);
    }
  });
});

app.post("/cadastro", (req, res) => {
  fs.readFile(path, "utf-8", async (erro, dado) => {
    try {
      const {nome, email, passWord } = req.body;
      
        const sehaHash = await criptSenha(passWord);
        let useri = {
          nome: nome,
          email: email,
          passWord: sehaHash,
          dataCriacaoi: new Date(),
        };
        let daddoConv = JSON.parse(dado);
        daddoConv.user.push(useri);
        let dadoConvJSON = JSON.stringify(daddoConv, null, 2);
      fs.writeFile(path, dadoConvJSON, "utf-8", (erru) => {
        try {
          res.status(201).send("Usuario criado com sucesso!");
        } catch (error) {
          console.log(error);

          res.status(500).send("erro ao criar o usuario!");
        }
      });
    } catch (error) {
      console.log(erro);
    }
  });
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}/`);
});
