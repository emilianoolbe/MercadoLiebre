const apiService = require('../service/apiService');

//Controlador
const controller = {
    product : async (req, res) => {
        let product = await apiService.productByPk(req.params.id)
        //Las api retornan JSON
        return res.json(product);
    },
};

module.exports = controller;