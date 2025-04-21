const { request, response } = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const axios = require("axios")

const {AmbientesDescricao, servicosDescricao} = require("../model/EnumeradoresDescricao")
dotenv.config();  // Carrega as variáveis de ambiente do arquivo .env
// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'grautereformasorcamento@gmail.com',  
        pass: 'gxlo rdrj voiy vbaj'
    }
});


var enviarDados = async(req, res) =>{
    try {
        debugger
        console.log("transporter : ", transporter)
        console.log("reqbody: ", req.body)
        const arquivo = req.file ? req.file.filename : "Nenhum arquivo enviado";

        console.log("Dados recebidos:", req.body);
        console.log("Arquivo recebido:", arquivo);

        var destinatarios = []
        destinatarios.push('grautereformasorcamento@gmail.com');
        destinatarios.push('Fantonivitor@gmail.com');
        destinatarios.push('joaovitores82@gmail.com');        
        destinatarios.push('wilsonducattijr@gmail.com');        
        // Configuração do e-mail
        var Ambientes = req.body.ambientes
        var Servicos = req.body.servicos
        var AmbientesDesc =Ambientes.split(",").map(x=>AmbientesDescricao(x.trim()))
        var ServicosDesc = Servicos.split(",").map(x=>servicosDescricao(x.trim()))

        var mensagem = `
            <p><strong>Orçamento Solicitado pelo Responsável:</strong> ${req.body.nome}</p>
            
            <h3>Informações:</h3>
            <p><strong>Endereço do Orçamento:</strong> ${req.body.Endereco}</p>
            <p><strong>Número:</strong> ${req.body.numero}</p>
            <p><strong>Bairro:</strong> ${req.body.bairro}</p>
            <p><strong>CEP:</strong> ${req.body.cepRef}</p>
            
            <h3>Detalhes da Reforma:</h3>
            <p><strong>Tipo de Imóvel:</strong> ${req.body.TipoImovel}</p>
            <p><strong>Ambientes de Reforma:</strong> ${AmbientesDesc.join(", ")}</p>
            <p><strong>Serviços para Reforma:</strong> ${ServicosDesc.join(", ")}</p>
            
            <h3>Observação:</h3>
            <p>${req.body.comentarios}</p>
            
            <p>Att,<br><strong>Equipe Graute Reformas</strong></p>
        `;

        console.log("process.env.GmailGraute: ", process.env.GmailGraute)
        console.log("dest? ", destinatarios.join(', '))
        const mailOptions = {
            from: process.env.GmailGraute, // E-mail de remetente
            to: destinatarios.join(', '), // Destinatários separados por vírgula
            subject: 'Orçamento Graute Reformas',
            html: mensagem 
            
        };
        var op;
        var msgValidacao
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                op = false
                msgValidacao = 'Erro ao enviar e-mail:'
                console.log('Erro ao enviar e-mail:', error);
            } else {
                op = true
                msgValidacao = 'E-mail enviado com sucesso'
                console.log('E-mail enviado com sucesso:', info.response);
            }
        });

        res.json({ sucesso: op, mensagem: msgValidacao });
    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ sucesso: false, mensagem: "Erro interno no servidor" });
    }
    
}



module.exports = {enviarDados}