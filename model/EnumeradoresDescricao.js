var { Servicos, Ambientes } = require("./Enumeradores")

var servicosDescricao = function(servico){
    switch (parseInt(servico)) {
        case Servicos.COMPLETO:
            return "Completo";
        case Servicos.ELETRICA:
            return "Elétrica";
        case Servicos.HIDRAULICA:
            return "Hidráulica";
        case Servicos.MARCENARIA:
            return "Marcenária";
        case Servicos.MARMORES:
            return "Mármores";
        case Servicos.PINTURA:
            return "Pintura";
        case Servicos.VIDROS:
            return "Vidros";
        default:
            return "Serviço desconhecido"; // Caso o serviço não seja encontrado
    }
};

var AmbientesDescricao = function(Ambiente){
    switch (Ambiente) {
        case Ambientes.COMPLETO:
            return "Completo";
        case Ambientes.SALA:
            return "Sala";
        case Ambientes.COZINHA:
            return "Cozinha";
        case Ambientes.QUARTO:
            return "Quarto";
        case Ambientes.GARAGEM:
            return "Garagem";
        case Ambientes.QUINTAL:
            return "Quintal";
        case Ambientes.VARANDA:
            return "Varanda";
        default:
            return "Ambiente desconhecido"; // Caso o ambiente não seja encontrado
    }
};


module.exports = {
    AmbientesDescricao,
    servicosDescricao
}