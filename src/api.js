//main file
const express = require("express")
const serverless = require("serverless-http")
const { collection, ObjectId } = require("../config/database")
const bodyParser = require("body-parser")
const cors = require("cors")


const app = express()
const router = express.Router()

//19th August
app.use(cors())
app.use(bodyParser.json())

router.get("/", (req, res) => {
    // res.send("User List")
    collection.find().toArray((err, result) => {
        if (err) throw err;
        res.json(result)
    })
})
router.post("/", (req, res) => {
    res.send("Create New User")
})
router
.route("/:id")
.get((req, res) => {
    res.send(`Get a User With ID: ${req.params.id}`)
})
.put((req, res) => {
    res.send(`Update a User With ID: ${req.params.id}`)
})
.delete((req, res) => {
    res.send(`Delete a User With ID: ${req.params.id}`)
})
app.use("/.netlify/functions/api", router)
module.exports.handler = serverless(app)

