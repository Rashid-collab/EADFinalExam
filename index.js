const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs')

// mongoose.connect('mongodb://localhost:27017/', {dbName: 'RecepiManagment'})
// .then(function(){
//     console.log('Connected')
// })
// .catch(function(err){
//     console.log(JSON.stringify(err))
// })



app.use(express.urlencoded()) 

app.get('/', (req, res) => {
    res.render('CreateRecepi')
});

app.post('/CreateRecepi', async (req, res) => {
    console.log(req.body)
    const product = await Product.create(req.body);
    if (!product) {
      return res.redirect('/CreateRecepi');
    }
    res.redirect('/CreateRecepi');
})

app.get('/CreateRecepi', function(req, res) {
    res.render('CreateRecepi');
})

app.get('/EditRecepi/pid', async function(req, res) {
    try {
        const recipe = await Recipe.findById(req.params.pid);
        if (!recipe) {
          return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(recipe);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
      res.redirect('EditRecepi/pid');
})

app.get('/ViewRecepi', async function(req, res) {
    //const products =  await Product.find();
    res.render('ViewRecepi');
})

app.listen('3005', function(){
    console.log('app listening on port 3005!');
})