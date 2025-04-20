const express = require("express");
const router = express.Router();
const emailController = require("../controller/emailController");
const multer = require("multer")
const path = require("path")
const fs = require("fs");

const uploadDir = path.join(__dirname,"../", "uploads");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }        
        cb(null, uploadDir); // Pasta onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para evitar conflitos
    }
});
const upload = multer({ storage: storage });

// Defina a rota de envio de dados
router.post("/enviarDados", upload.single("arquivo"), emailController.enviarDados);

module.exports = router;
