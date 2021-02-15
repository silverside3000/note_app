const express = require('express');
const app = express();
const dbURI = 'mongodb://localhost/movies';///mongo dp connection
const mongoose = require('mongoose');
const Note = require('./models/notes');

mongoose.connect(dbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


app.get('/add_note', (req, res) =>{
    const note = new Note({
        title: 'Nikel Back(How you remind me)',
        body: 'Never made it as a wise man, I could\'nt cut it as poor man stealing, I\'m tired of living like a blind man, I\'m sick and sad what about a sense of feeling'
    });
    note.save()
    .then((result) =>{res.send(result)})
    .catch((err) =>{console.log(err)});
});

app.post('/', (req, res) =>{
    //console.log(req.body);
    const note = new Note({
        title: req.body.title,
        body: req.body.message
    });
    note.save()
    .then((result) =>{res.redirect('/ ')})
    //.then((result) =>{res.send(result)})
    .catch((err) =>{console.log(err)});/**/
});

app.get('/del_note/:id', (req, res) =>{
    //console.log('id => ' + req.params.id);
    var id = req.params.id;
    Note.findByIdAndDelete(id)
    .then((result) =>{res.redirect('/')})
    .catch((err) =>{console.log(err)}); /**/
})

app.get('/all_notes', (req, res) =>{
    Note.find()
    .then((result) =>{res.send(result)})
    .catch((err) =>{console.log(err)});
})

app.get('/single_note/:id', (req, res) =>{
    var id = req.params.id;
    Note.findById(id)
    .then((result) =>{res.send(result)})
    //.then((result) =>{res.send(result)})
    .catch((err) =>{console.log(err)});
})

app.get('/', (req, res) =>{
    Note.find()
    .then((result) =>{res.render('index', {title: 'Eduonix project', notes: result}) })
    .catch((err) =>{console.log(err)});

    
});

/*app.use((req, res)  => {
	res.status(404).render('404', {title: 'Error 404'});
});*/
