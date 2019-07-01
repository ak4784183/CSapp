const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
var cors = require('cors');

// 配置日期
const moment=require('moment');


// 配置路由
const adminHomeRouter=require('./routes/adminHome');
const adminNewsRouter=require('./routes/adminNews');
const homeRouter = require('./routes/home');
const addRouter = require('./routes/add');
const addnewsRouter=require('./routes/addnews');
const updateRouter = require('./routes/update');
const updatenewsRouter=require('./routes/updatenews');
const loginRouter = require('./routes/login');
const regRouter = require('./routes/register');
const delRouter=require('./routes/delete');
const delNewsRouter=require('./routes/deleteNews');
const userRouter=require('./routes/seeuser');
const seeNewsRouter=require('./routes/seeNews');
const picRouter=require('./routes/setpic');
const searchRouter=require('./routes/seach');
const collectRouter=require('./routes/collection');
const recollectRouter=require('./routes/recollect');
const buyRouter = require('./routes/buy');
const chargeRouter = require('./routes/charge');
const addmoneyRouter = require('./routes/addmoney');
const psdRouter = require('./routes/changepsd');
const app = express();
app.locals.moment=moment;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(session({
  secret:"123456",
  name:"sessionId",
  cookie:{maxAge:60*1000},
  rolling:true,
  store:new MongoStore({
    url:"mongodb://localhost:27017/app"  //session保存到指定的数据库
  })
}));
//CORS跨域
app.use(cors({
    origin:['http://localhost:8082','http://localhost:8083','http://localhost:8084'],
    methods:['GET','POST','OPTION'],
    alloweHeaders:['Conten-Type', 'Authorization']
}));
// 指定的路由可以跨域访问


app.use(bodyParser());
app.use(cookieParser("123456"));
app.use('/adminHome',adminHomeRouter);
app.use('/adminNews',adminNewsRouter);
app.use('/home', homeRouter);
app.use('/add', addRouter);
app.use('/addnews',addnewsRouter);
app.use('/update', updateRouter);
app.use('/updatenews',updatenewsRouter);
app.use('/login', loginRouter);
app.use('/register', regRouter);
app.use('/delete',delRouter);
app.use('/deleteNews',delNewsRouter)
app.use('/seeuser',userRouter);
app.use('/seenews',seeNewsRouter);
app.use('/setpic',picRouter);
app.use('/search',searchRouter);
app.use('/collection',collectRouter);
app.use('/recollect',recollectRouter);
app.use('/buy',buyRouter);
app.use('/charge',chargeRouter);
app.use('/addmoney',addmoneyRouter);
app.use('/changepsd',psdRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 配置mongoose地址
mongoose.connect("mongodb://localhost/app", {
  useNewUrlParser: true,
  useFindAndModify: false
});
//提示数据库连接成功
const con = mongoose.connection;
con.on('open', function () {
  console.log("数据库连接成功");
})

app.listen(4000);

module.exports = app;
