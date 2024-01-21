// Déclaration des modules à importer
const express = require('express')
const app = express()

// Utilisation de middleware globaux
app.use(express.json()); // Permet de parser automatiquement le json en entrée

// Déclaration des routers principaux qui utilisent les sous-routers
const booksRouter = require('./routers/books')
app.use('/books', booksRouter);

const reviewRouter = require('./routers/reviews')
app.use('/reviews', reviewRouter)

const usersRouter = require('./routers/users')
app.use('/users', usersRouter)

// Déclaration globale du middleware d'erreur, on assume que le paramètre error, possède certains attributs
app.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({success: false, message: error.message, status: error.status})
})

// On oublie pas d'exporter pour tester
module.exports = app