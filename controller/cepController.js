const axios = require('axios')
var buscarDados = async(req,res)=>{
    try{
        debugger
        var cep = req.body.cep;
        console.log("cep: ", cep)
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        console.log("response: ", response)
        res.status(200).json({ Cep: response.data }); // Apenas os dados do ViaCEP
        
    }
    catch(error){
        console.error("Erro: ", error)
        res.status(500).json(error)
    }
}

module.exports = {
    buscarDados
}