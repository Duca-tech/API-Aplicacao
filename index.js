const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const routeEmail = require("./routes/emailRoute")
const routeCep = require("./routes/cepRoute");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

var {views} = require("./rotinas/rotasViews")
// Configuração do Multer para salvar arquivos na pasta "uploads"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Pasta onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para evitar conflitos
    }
});

const upload = multer({ storage: storage });


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../", "front", "public")));


// Chat em tempo real
io.on("connection", (socket) => {
    console.log("Novo usuário conectado");
    
    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
    });
    
    socket.on("disconnect", () => {
        console.log("Usuário desconectado");
    });
});
// app.get('/', (req, res) => {
//     res.sendFile(views("index.html"));
// });

// app.get('/Servicos', (req,res)=>{
//     res.sendFile(views("Servicos.html"))
// })

// Use a rota do email
app.use('/email', routeEmail);
app.use('/cep', routeCep)


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

module.exports = { app, io, server };
