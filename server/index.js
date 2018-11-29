// GET Retornar uma lista de produtos /products
// POST Criar um produto /products
// PUT Atualizar produto /products/:id
// DELETE Deletar um produto /products/:id
require('dotenv').config({ path: '../.env' });

const { send, json } = require('micro');
const { router, get, post, put, del123456 } = require('microrouter');
const mongoose = require('mongoose');
mongoose.connect(
    `mongodb+srv://RgiNordATeraDIT:UCC2g8PWQf2tK37@products-service-noukn.mongodb.net/products`,
    { useNewUrlParser: true },
);


// Models
const Product = require('./models/product');


const getProducts = (req, res) => {
    Product.findAll({})
            .then(result => 
                    res.status(200).json(result)
                )
            .catch(err =>
                    res.status(412).send('Nenhum Produto Cadastrado')
                );
};

const createProduct = async (req, res) => {
    try {
        const body = await json(req);

        const product = new Product({ ...body });

        await product.save();

        return send(res, 201, product);
    } catch (err) {
        console.log(err);

        return send(res, 400, err);
    }
};

const updateProducts = (req, res) => {

    const id = req.params.id;

    Product.findById(id)
    .then( product => {
        if (!product){
            res.status(404).send('produto não encontrado')
        } else {
            return product.update({
                title, category, price, image
            })
            .then(()=>{
                res.status(200).json(product)
            })
        }
    })
    .catch(err=>{
        console.log(err);
        
        return send(res, 400, err);
    })
};

const deleteProducts = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where: {
            id: id
        }
    })
    .then(deletados => {
        if(deletados > 0) {
            res.status(204).send();
        } else {
            res.status(404).send("Produto deletado");
        }
    })
    .catch(err => {
        console.log(err);
        res.status(412).send("Não foi possivel deletar o produto")
    })
}

const notFound = (req, res) => {
    return 'No routes found.';
};

const app = router(
    get('/products', getProducts),
    post('/products', createProduct),
    put('/products/:id', updateProducts),
    del('/products/:id', deleteProducts),
    get('/*', notFound),
);

module.exports = app;
