const express =require('express')
const connectDatabase  = require('./database/db')
const router = require('./Router/router');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth',router)

app.listen(8080, async(req, res)=>{
    await connectDatabase(),
    
    console.log("server is live on the http://localhost:8080");
})