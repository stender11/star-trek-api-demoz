const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 8000
// require('dotenv').config()
const MongoClient = require("mongodb").MongoClient
const connectionString = "mongodb+srv://adam-admin:q8P75NfYLRY9BUP6@cluster0.oqtqtlq.mongodb.net/?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())

MongoClient.connect(connectionString)
    .then(client => {
        console.log("Connected to Database")
        const db = client.db("aliens")
        const infoCollection = db.collection("alienData")

    app.get("/", (request, response) => {
        response.sendFile(__dirname + "/index.html")
    })

    app.get("/api/:alienName", (request, response) => {
        const aliensName = request.params.alienName.toLowerCase()
            infoCollection.find({name: aliensName}).toArray()
            .then(results => {
                console.log(results)
                response.json(results[0])
            })
            .catch(error => console.error(error))
    })

})
.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})
