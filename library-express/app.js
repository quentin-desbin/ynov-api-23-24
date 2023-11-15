// Déclaration des modules à importer
const express = require('express')
const app = express()
const cors = require('cors')
const OpenApiValidator = require('express-openapi-validator')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

// Déclaration du swagger document pour être servi en statique
const swaggerDocument = YAML.load('./open-api.yaml')

// Utilisation de middleware globaux
app.use(cors()); // Autorise toutes les requêtes de tout origine
app.use(express.json()); // Permet de parser automatiquement le json en entrée

// Middleware d'openAPI
app.use(
    OpenApiValidator.middleware({
        apiSpec: './open-api.yaml',
        ignoreUndocumented: true
    })
)

// Déclaration des routers principaux qui utilisent les sous-routers
const booksRouter = require('./routers/books')
app.use('/books', booksRouter);

const reviewRouter = require('./routers/reviews')
app.use('/reviews', reviewRouter)

const loginRouter = require('./routers/login')
app.use('/login', loginRouter)

// Par défaut quand on appellera "/" on veut servir en statique la doc OpenAPI
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Déclaration globale du middleware d'erreur, on assume que le paramètre error, possède certains attributs
app.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({success: false, message: error.message, status: error.status})
})

// On oublie pas d'exporter pour tester
module.exports = app