const db = require('./models')
const app = require('./app')

db.instance.sync({force: true}).then(async () => {
    console.log('Database connected and synchronized')

    await db.books.create({title: "Default Book", date: "2022-12-05"})

    app.listen(3000, () => {
        console.log('Server running on port 3000 !')
    })
}).catch((e) => {
    console.error(e)
});