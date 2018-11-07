// GET Retornar uma lista de produtos /products
// POST Criar um produto /products
// PUT Atualizar produto /products/:id
// DELETE Deletar um produto /products/:id
require('dotenv').config({ path: '../.env' });

const { send, json } = require('micro');
const { router, get, post } = require('microrouter');
const mongoose = require('mongoose');
mongoose.connect(
    `mongodb+srv://RgiNordATeraDIT:UCC2g8PWQf2tK37@products-service-noukn.mongodb.net/products`,
    { useNewUrlParser: true },
);


// Models
const Product = require('./models/product');


const getProducts = (req, res) => {
    return send(res, 200, [
        {
            id: new Date().valueOf(),
            category: 'Blusa',
            title: 'Regata',
            image: 'http://...',
            price: Math.random() * 2000,
        },
        {
            id: new Date().valueOf(),
            category: 'Blusa',
            title: 'Regata',
            image: 'http://...',
            price: Math.random() * 2000,
        },
        {
            id: new Date().valueOf(),
            category: 'Blusa',
            title: 'Regata',
            image: 'http://...',
            price: Math.random() * 2000,
        },
        {
            id: new Date().valueOf(),
            category: 'Blusa',
            title: 'Regata',
            image: 'http://...',
            price: Math.random() * 2000,
        },
        {
            id: new Date().valueOf(),
            category: 'Blusa',
            title: 'Regata',
            image: 'http://...',
            price: Math.random() * 2000,
        },
        {
            id: new Date().valueOf(),
            category: 'Blusa',
            title: 'Regata',
            image: 'http://...',
            price: Math.random() * 2000,
        },
    ]);
};

const createProduct = async (req, res) => {
    try {
        const body = await json(req);

        const data = new Product({ ...body });

        await data.save();

        return send(res, 201, data);
    } catch (err) {
        console.log(err);

        return send(res, 400, err);
    }
};

const notFound = (req, res) => {
    return 'No routes found.';
};

const app = router(
    get('/products', getProducts),
    post('/products', createProduct),
    get('/*', notFound),
);

module.exports = app;
