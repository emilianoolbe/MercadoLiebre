const apiService = require('../services/apiServices');

//Controlador
const controller = {
    product : async (req, res) => {
        let product = await apiService.productByPk(req.params.id)
        //Las api retornan JSON
        return res.json(product);
    },
    checkout: async (req, res) => {
        let order = await apiService.order.checkoutCart(req.body, req.session.userLogged.id);
        res.json({ok: true, status: 200, order: order});
    },
    //Order
    totalGain: async() => {
        let total = await apiService.order.totalGain()
    }
};

module.exports = controller;