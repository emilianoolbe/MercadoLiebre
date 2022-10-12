//Importo path + fs
const path = require('path');
const fs = require('fs');

const Product = {

    //Path of Json
    filleName: path.join(__dirname, '../dataBase/productos.json'),

    fileNameImg: path.join(__dirname, '../../public/imgagenes/img-products%'),


    //Reading all products
    getData : function () { return JSON.parse(fs.readFileSync(this.filleName, 'utf-8')) },

    //Get all products
    findAllProducts : function() { return this.getData(); },

    //Search a product by ID
    finProductByPk : function (id) { 
        let allProducts = this.findAllProducts();
        let productFound = allProducts.find((element) => element.id == id);
        return productFound;
     },

     //Search a product by 'key'
    findProductByField: function (field, text){
        let allProducts = this.findAllProducts();
        let productFound = allProducts.find((eachElement) => eachElement[field] == text);
        return productFound;
    },

    //Id Generator
    generateId: function() {
        let allProducts = this.findAllProducts();
        let lastProduct = allProducts.pop();
        lastProduct ? lastProduct.id + 1 : 1;
    },

    //Create a new product
    newProduct : function(getData){
        let allProducts = this.findAllProducts();
        let newProduct = {  
            id : this.generateId(),
            ...getData
        }

        allProducts.push(newProduct);
        fs.writeFileSync(this.filleName, JSON.stringify(allProducts, null , 4), 'utf-8');
        return true;
    },

    //Delete a product
    deleteProduct: function(id){
        let allProducts = this.findAllProducts();
        let finalProducts = allProducts.filter((eachElement) => eachElement.id != id);
        fs.writeFileSync(this.filleName, JSON.stringify(finalProducts, null, 4), 'utf-8');
        return true;
    },

    //Update a product
    uptdateProduct: function(id, getData){
    
        for (let eachElement of this.findAllProducts()){
            if (eachElement.id == id) {
                eachElement = getData;
                break;
            }
        }
        fs.writeFileSync(this.filleName, JSON.stringify(this.findAllProducts(), null, 4), 'utf-8');
        return true;
    },
};

module.exports = Product;
