const fs = require("fs");
const path = require("path");

const caminhoPastaupload = path.join(__dirname, "..", "uploads");

async function deletarArquivoAposEnvio(nomeArquivo) {
  try {
    const caminhoCompleto = path.join(caminhoPastaupload, nomeArquivo);

    if (fs.existsSync(caminhoCompleto)) {
      fs.unlinkSync(caminhoCompleto);
      console.log("✅ Arquivo excluído com sucesso:", nomeArquivo);
    } else {
      console.log("⚠️ Arquivo não encontrado:", nomeArquivo);
    }
  } catch (error) {
    console.error("❌ Erro ao tentar excluir o arquivo:", error.message);
  }
}

module.exports = {
  deletarArquivoAposEnvio
};
