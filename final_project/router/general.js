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
//新規ユーザー登録
//username と password をリクエストボディから受け取る
//同じ username がすでに存在していたらエラーを返す
//成功したらユーザー情報を保存して成功メッセージを返す
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        return res.status(400).json({ message: "Username and password are required" });
    }

    //既存のusernameが存在しているかどうか確認
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        return res.status(409).json({ message: "Username already exists" });
      }
    
      // ユーザーを追加
      users.push({ username, password });
    
      return res.status(200).json({ message: "User successfully registered. Now you can login." });
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
    return res.status(200).send(book);   // 本を返す
  } else {
    return res.status(404).json({ message: "Not Found" }); // 見つからないときの返事
  }
 });
  
// 3. Get book details based on author
//GET http://localhost:5000/author/:authorでアクセスされたときだけ呼ばれる
public_users.get('/author/:author',function (req, res) {
    const authorLookingFor = req.params.author //URLからauthorを取得
    const results = [] //特定の作家の本をまとめた配列

    //作家の本が見つかったら配列にpush
    for (let isbn in books) {
        if (books[isbn].author === authorLookingFor) {
          results.push({ isbn: isbn, ...books[isbn] }); //...はそのままbooks[isbn] の中をコピーしてappendするという意味
        }
      }
  
    if (results.length > 0) {
      return res.status(200).json(results);   // 本を返す
    } else {
      return res.status(404).json({ message: "Not Found" }); // 見つからないときの返事
    }
});

// 4. Get all books based on title
//GET http://localhost:5000/title/:titleでアクセスされたときだけ呼ばれる
public_users.get('/title/:title',function (req, res) {
    const titleLookingFor = req.params.title //URLからauthorを取得
    const results = [] //特定の作家の本をまとめた配列

    //titleに該当する作家の本が見つかったら配列にpush
    for (let isbn in books) {
        if (books[isbn].title === titleLookingFor) {
          results.push({ isbn: isbn, ...books[isbn] }); //...はそのままbooks[isbn] の中をコピーしてappendするという意味
        }
      }
  
    if (results.length > 0) {
      return res.status(200).json(results);   // 本を返す
    } else {
      return res.status(404).json({ message: "Not Found" }); // 見つからないときの返事
    }
});

// 5. Get book review
//GET http://localhost:5000/review/:isbnでアクセスされたときだけ呼ばれる
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn //URLからisbnを取得
    const book = books[isbn]
  
    if (book) {
      return res.status(200).send(book.reviews);   // 本を返す
    } else {
      return res.status(404).json({ message: "Not Found" }); // 見つからないときの返事
    }
});

module.exports.general = public_users;
