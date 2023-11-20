const express = require('express');
const router = express.Router();
const product_Collection = require('../models/product_Collection');
const niche_Collection = require('../models/niche_Collection');
const size_Collection = require('../models/size_Collection');

// *************** size ****************************
router.get('/show_all_sizes', (req, res) => {
    niche_Collection.find()
    .then(sizes => res.json(sizes))
    .catch(err => res.json({ error: 'Error in: book_route:show_all_sizes:catch() ' +err }) )
})

router.post('/add_size', (req, res) => {
    const { option } = req.body;
    if(!option) res.json({ error: 'fill the size option'});

    size_Collection.findOne({ option })
    .then(size => {
        if(size) res.json({ error: 'already exist' });
        else{
            const newSize = new size_Collection({ 
                option,
                created_at: new Date().toUTCString()
            })
            newSize.save()
            .then(savedSize => res.json({ message: `${savedSize.option} size is successfuly saved` }))
            .catch(err => res.json({ error: 'Error in: product_route:add_size:newSize.save() ' +err }))
        }
    })
})

router.get('/delete_all_sizes', (req, res) => {
    niche_Collection.find()
    .then(sizes => sizes.forEach(size => {
        size_Collection.findByIdAndDelete(size._id)
        .then(() => res.json('all sizes successfuly deleted'))
    }))
    .catch(err => res.json('error delete_all_sizes: | ' +err))
})

router.post('/delete_size', (req, res) => {
    const { id } = req.body;
    if(!id) res.json({ error: 'there is no size id'});

    size_Collection.findByIdAndDelete(id)
    .then(() => res.json({ message: 'successfuly deleted' }) )
    .catch(err => res.json({ error: 'there is no size with that id :' +err }) )
})

// *************** niche of product ****************
router.get('/show_all_niches', (req, res) => {
    niche_Collection.find()
    .then((niches) => {
        if(!niches) res.json({error: 'no niches available'})
        else res.json(niches)
    })
    .catch(err => res.json({ error: 'Error in: product_route:show_all_niches:catch() ' +err }) )
})

router.post('/add_niche', (req, res) => {
    const { name, imageId } = req.body;
    if(!name) res.json({ error: 'there is no niche name'});

    niche_Collection.findOne({ name })
    .then(niche => {
        if(niche) res.json({ error: 'already exist' });
        else{
            const newNiche = new niche_Collection({ 
                name,
                image: imageId,
                created_at: new Date().toUTCString()
            })
            newNiche.save()
            .then(savedNiche => res.json({ message: `${savedNiche.name} niche is successfuly saved` }))
            .catch(err => res.json({ error: 'Error in: product_route:add_niche:newNiche.save() ' +err }))
        }
    })
})

router.get('/delete_all_niches', (req, res) => {
    niche_Collection.find()
    .then(niches => niches.forEach(niche => {
        niche_Collection.findByIdAndDelete(niche._id)
        .then(() => res.json('all niches successfuly deleted'))
    }))
    .catch(err => res.json('error delete_all_niches: | ' +err))
})
router.post('/delete_niche', (req, res) => {
    const { id } = req.body;
    if(!id) res.json({ error: 'there is no niche id'});

    niche_Collection.findByIdAndDelete(id)
    .then((deleted_niche) => res.json({ message: 'successfuly deleted', deleted_niche }) )
    .catch(err => res.json({ error: 'there is no niche with that id :' +err }) )
})

// *************** Products ****************
router.post('/add_products', (req, res) => { 
    const { name, imagesId, sizesId, price, old_price, nicheId } = req.body;
    let { alt } = req.body;
    
    if(!name || imagesId.length === 0 || sizesId.length === 0 || !nicheId || !price || !category) res.json({ error: 'fill all the necessary fields' })

    const soldRate = Math.floor((old_price - price) * (100/old_price));

    if(!alt) alt = name;

    product_Collection.findOne({ name })
    .then(product => {
        if(product) res.json({ message: 'Already exist', product })
        else{
            const newProduct = new product_Collection({

                name,
                images: imagesId,
                price,
                size: sizesId,
                old_price,
                soldRate,
                alt,
                created_at: new Date().toUTCString(),
                niche: nicheId
            });
            newProduct.save()
            .then((saved_product) => res.json({ 
                message: `${saved_product.name}, is saved`, 
                saved_product
            }))
            .catch(err => res.json({ error: 'Error in: product_route:add_products:newProducts.save() :' +err }))
        }
    })
})

router.post('/show_products', (req, res) => {
    const { niche } = req.body;

    if(niche){
        product_Collection.find({ niche })
        .then(products => {
            if(products) res.json(products);
            else res.json({noProduct: 'no products is available within that niche'})
        })
        .catch(err => res.json({ error: err }))
    }
    else{
        product_Collection.find()
        .then(products => {
            if(products) res.json(products);
            else res.json({noProduct: 'no products is available' })
        })
        .catch(err => res.json({ error: err }))
    }
})

// to check later
router.get('/delete_all_products', (req, res) => { 
    product_Collection.find()
    .select('_id name images')
    .then(products => products.forEach(async (product) => {
        await product_Collection.findByIdAndDelete(product._id)
    }))
    .then(() => res.json('all products removed') )
    .catch(err => res.json(err))
})

// check later
router.post('/search_products', (req, res) => {
    const { search_string } = req.body;

    if(!search_string) return res.json({empty_error: 'search Empty'})

    const search_str_Lower = search_string.toLowerCase();

    product_Collection.find()
    .then(products => {
        let productsFound = []

        products.map(product => {
            const productName = product.name.toLowerCase();

            if(productName.startsWith(search_str_Lower)){
                return productsFound.push(product)
            }
        })

        if(productsFound.length === 0){
            return res.json({error: 'No product for that search'})
        }
        return res.json(productsFound)
    })
})

router.get('/get_product/:id', (req, res) => {
    product_Collection.findById(req.params.id)
    .then(product => {
        if(!product) res.json('no product with this id');
        else res.json(product);
    })
    .catch(err => console.log({ error: `get_product: ${+err}` }))
})

module.exports = router;