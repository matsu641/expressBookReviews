const express = require('express');             // Expressフレームワーク
const jwt = require('jsonwebtoken');            // JWT（トークン）ライブラリ
let books = require("./booksdb.js");            // 本のデータベースを読み込み
const regd_users = express.Router();            // サブルーター（"/customer"以下のルート用）

// 登録済みユーザーを保存する配列（例: {username, password}）
let users = [];                                

//7. write code to check is the username is valid
//既存のユーザーのログイン
// auth_users.js
const isValid = (username) => {
    return !users.some(user => user.username === username); // ←存在しないときtrue
  };
  

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//このファイル内のデータや関数を外部でも使えるようにしている
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
