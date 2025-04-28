const express = require('express')
const cors = require('cors');
const { db } = require('./db/db'); 
const {readdirSync} = require('fs')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const AuthRouter = require('./routes/AuthRouter');




require('dotenv').config()


const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())
app.use('/auth', AuthRouter)
const routesPath = path.join(__dirname, 'routes');


//routes
readdirSync(routesPath).map((route) => {
    app.use('/api/v1', require(path.join(routesPath, route)));
});

const server = async () => {
    await db();
    app.listen(PORT, () => {
        console.log('listen to port:', PORT)
    })
}
server()