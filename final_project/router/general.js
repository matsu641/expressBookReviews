const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//res.status(200)はアクセスが成功したよ！というサイン
//.send(...)の中に入るのはclientにデータを送る関数
//req -> クライアントサイドからのURL
//res -> 返すオブジェクト

//6. Post endpoint
//username と password をリクエストボディから受け取る
//同じ username がすでに存在していたらエラーを返す
//成功したらユーザー情報を保存して成功メッセージを返す
public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// 1. Get the book list available in the shop
//GET http://localhost:5000/でアクセスされたときだけ呼ばれる
public_users.get('/', function (req, res) {
    return res.status(200).send(JSON.stringify(books, null, 4));
});
  
// 2. Get book details based on ISBN（本の番号）
//GET http://localhost:5000/isbn/:isbnでアクセスされたときだけ呼ばれる
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn //URLからisbnを取得
  const book = books[isbn]

  if (book) {
    return res.status(200).send(book);   // 料理（本）を返す
  } else {
    return res.status(404).json({ message: "Not Found" }); // 見つからないときの返事
  }
 });
  
// 3. Get book details based on author
//GET http://localhost:5000/author/:authorでアクセスされたときだけ呼ばれる
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// 4. Get all books based on title
//GET http://localhost:5000/title/:titleでアクセスされたときだけ呼ばれる
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(200).send(book);
});

// 5. Get book review
//GET http://localhost:5000/review/:isbnでアクセスされたときだけ呼ばれる
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
