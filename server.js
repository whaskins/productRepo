const express = require("express")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/products")
const bodyParser = require("body-parser")
var app = express()
app.use(express.static(__dirname + "/public/dist/public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const ProductSchema = new mongoose.Schema({
    imageURL: {type: String},
    title: {type: String, required: true, minlength: 4},
    price: {type: Number, required: true}
})
mongoose.model("Product", ProductSchema)
var Product = mongoose.model("Product")


app.get("/products", function(req, res) {
    Product.find({}, function(err, data) {
        if (err) {
            console.log(err)
            res.json({ message: "Error", data: data })
        }
        else {
            res.json({ message: "Success", data: data })
        }
    })
})
app.get("/products/:id", function(req, res) {
    Product.findOne({_id: req.params['id']}, function(err, data) {
        if (err) {
            console.log(err)
            res.json({ message: "Error", data: data })
        }
        else {
            res.json({ message: "Success", data: data })
        }
    })
})
app.put("/products/:id", function(req, res) {
    Product.findOneAndUpdate({_id: req.params['id']}, req.body, function(err, data) {
        if (err) {
            console.log(err)
            res.json({ message: "Error", data: data })
        }
        else {
            res.json({ message: "Success", data: data })
        }
    })
})
app.post("/products", function(req, res) {
    Product.create(req.body, function(err, data) {
        if (err) {
            console.log(err)
            res.json({ message: "Error", data: data })
        }
        else {
            res.json({ message: "Success", data: data })
        }
    })
})
app.delete("/products/:id", function(req, res) {
    Product.findOneAndDelete({_id: req.params['id']}, function(err, data) {
        if (err) {
            console.log(err)
            res.json({ message: "Error", data: data })
        }
        else {
            res.json({ message: "Success", data: data })
        }
    })
})


app.listen(8000, function() {
    console.log("port 8000")
})