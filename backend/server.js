const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_URL } = require('./keys');
const cors = require('cors');

// to see images stored in that path -- after this line of code you can see the images by typing "localhost:8000/static/nameOfTheFile"
app.use("/static/images", express.static("./uploads/images"));

//App config
const PORT = process.env.PORT || 8000
app.use(cors())

// Mongodb Config
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected'))
.catch(err => console.log('Caught', err.stack));

mongoose.connection.on('connected', ()=> console.log('Connected to presta4youDB DataBase'))
mongoose.connection.on('error', (err) => console.log(`ERROR: ${err}`))

//general MiddleWare
app.use(express.json())

//routes
app.use('/api', require('./routes/admin_route'));
app.use('/api', require('./routes/image_route'));
app.use('/api', require('./routes/reservation_route'));

// listen to port
app.listen(PORT, () => console.log(`server running on PORT:${PORT}`))