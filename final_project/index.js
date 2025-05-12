const express = require('express');     // expressという外部モジュールを読み込む
const jwt = require('jsonwebtoken');     // JWT 認証用ライブラリ
const session = require('express-session')   // セッション管理ミドルウェア

//二つのルート
const customer_routes = require('./router/auth_users.js').authenticated;    // log in 認証が必要なルートを定義
const genl_routes = require('./router/general.js').general; //一般ルートを定義（ログイン不要）

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
