'use strict';

const productRepo = require('@/app/repos/productRepo');
const convertProductQuery = require('@/app/queryConverters/productQueryConverter');
const convertProductSort = require('@/app/queryConverters/productSortConverter');
const { standardformatProduct, simpleFormatProduct } = require('@/app/format/productFormat');

async function getListProduct (req, res) {
    let productPerpage = 30;
    let productCurrentPage = req.query.page || 1;
    let productQuery = convertProductQuery(req.query);
    let productSort = convertProductSort(req.query);

    let products = (
        await productRepo
            .all(productQuery)
            .sort(productSort)
            .limit(productPerpage)
            .skip((productPerpage * productCurrentPage) - productPerpage)
    ).map(simpleFormatProduct);

    let totalItem = await productRepo.count(convertProductQuery());

    return res.json({
        status: 'success',
        totalItem: totalItem,
        perPage: productPerpage,
        currentPage: productCurrentPage,
        data: products,
    });
}

async function getDetailProduct (req, res) {
    let product = standardformatProduct(req._.product);

    return res.json({
        status: 'success',
        product: product,
    });
}

module.exports = {
    getListProduct,
    getDetailProduct,
}
