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
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    // ユーザーが存在するかチェック
    const user = users.find(u => u.username === username && u.password === password);
  
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    // JWT作成
    const accessToken = jwt.sign(
      { username: user.username },
      "access", // index.js と一致させる必要がある
      { expiresIn: "1h" }
    );
  
    // セッションに保存
    req.session.authorization = {
      accessToken,
      username: user.username
    };
  
    return res.status(200).json({ message: "User successfully logged in", token: accessToken });
  });
  

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

});

//このファイル内のデータや関数を外部でも使えるようにしている
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
