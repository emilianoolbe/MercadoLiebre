const apiService = require('../service/apiService');

//Controlador
const controller = {
    product : async (req, res) => {
        let product = await apiService.productByPk(req.params.id)
        //Las api retornan JSON
        return res.json(product);
    },
    checkout: async (req, res) => {
        let order = await apiService.checkoutCart(req.body, req.session.userLogged.id);
        res.json({ok: true, status: 200, order: order});
    }
};

module.exports = controller;