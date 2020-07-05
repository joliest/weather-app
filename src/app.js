const path = require('path');
const express = require('express'); // returns a function
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js')

const app = express();

const port = process.env.PORT || 3000;

const PUBLIC_FOLDER = path.join(__dirname, '../public'); // returns path/src
const viewsPath = path.join(__dirname, './template/views');
const partialsPath = path.join(__dirname, './template/partials');

// static directories
app.use(express.static(PUBLIC_FOLDER));

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
    res.render('index', {
        // value you want the view to access
        title: 'Weather App',
        name: 'Joli Estampador'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        // value you want the view to access
        title: 'About',
        name: 'Joli Estampador'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        // value you want the view to access
        title: 'Help',
        name: 'Joli Estampador'
    })
})

app.get('/help/*', (req, res) => {
    res.render('_404', {
        title: 'Help',
        name: 'Joli Estampador',
        error: 'Unable to find article'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    req.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        } 
        forecast(latitude, longitude, (error, {current = ''}) => {
            if (error) {
                return res.send({
                    error
                })
            }
              
            res.send({
                forecast: current,
                location: location,
                address: req.query.address
            })
        })
    });
})

// handling 404
app.get('*', (req, res) => {
    res.render('_404', {
        title: 'Error',
        name: 'Joli Estampador',
        error: 'Page not found'
    })
});

// start server up, single time
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});