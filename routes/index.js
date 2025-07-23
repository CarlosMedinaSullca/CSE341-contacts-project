const router = require('express').Router();
const contacts = require('./contacts');

router.use('/', require('./swagger'));

router.use('/contacts', contacts);

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World']
    res.send('Hello World')

})

module.exports = router;