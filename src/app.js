//? Modules
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import methodOverride from 'method-override';
//? Routers
import pageRouter from './routers/pageRouter.js';
import apiRouter from './routers/apiRouter.js';
import tasksRouter from './routers/taskRouter.js';
import userRouter from './routers/userRouter.js';
// Helpers
import connectToDb from './helpers/Database/ConnectToDb.js';

//? Definitions
const app = express();
const __dirname = path.resolve() + '//src';
dotenv.config()
const PORT = process.env.PORT || 5000;

// set engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));


//? Routes
app.use('/', pageRouter);
app.use('/api', apiRouter);
app.use('/tasks', tasksRouter)
app.use('/users', userRouter)

// TODO : routes'ları burada teker teker vermektense bunları bir main route üzerinde toplayıp burayı temiz tutabilirsin.
// TODO : oluşturulan endpoint'ler için postman_collection yerine swagger-autogen kullanabilirsin
// TODO : referance projeme buradan erişebilirsin -> https://github.com/xgaslan/nodejs-middleware


connectToDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
});
