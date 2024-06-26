const { pool } = require('../database');

const getBooks = async (req, res, next) => {
    // params
    let params = [];
    let sql = '';
   
    if (req.query.id_user) {
        params.push(req.query.id_user);
        sql = 'SELECT id_book, title, type, author, price, photo FROM apiBooks.book WHERE id_user = ?';
        // si existe id_book tambien, buscar con id_user y id_book
        if (req.query.id_book) {
            params.push(req.query.id_book);
            sql = 'SELECT id_book, title, type, author, price, photo FROM apiBooks.book WHERE id_user = ? AND id_book = ?';        }
    } else  {
        sql = 'SELECT id_book, title, type, author, price, photo FROM apiBooks.book';    }

    try {
        console.log(sql);
        let [result] = await pool.query(sql, params);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
}


const addBooks = async (req, res, next) => {
    try {
        const { id_user, title, type, author, price, photo } = req.body;
        let sql = 'INSERT INTO apiBooks.book (id_user, title, type, author, price, photo) VALUES (?, ?, ?, ?, ?, ?)';
        let params = [id_user, title, type, author, price, photo];

        let [result] = await pool.query(sql, params);
        console.log(result);

        if(result.insertId){
        res.send(String(result.insertId));
        } else {
        res.send('-1');
        }

    } catch(err){
        console.log(err);
        next(err);
    }
}


const updateBooks = async (req, res, next) => {
    try {
        console.log(req.body);
        const { id_user, title, type, author, price, photo } = req.body; // id_bookはreq.params.idから取得する
        const id_book = req.params.id;

        let params = [
            id_user,
            title,
            type,
            author,
            price,
            photo,
            id_book
        ];

        let sql = 'UPDATE apiBooks.book SET id_user = COALESCE(?, id_user), ' +
        'title = COALESCE(?, title), ' +
        'type = COALESCE(?, type) , ' +
        'author = COALESCE(?, author) , ' +
        'price = COALESCE(?, price), ' +
        'photo = COALESCE(?, photo) ' +
        'WHERE id_book = ?';
          

        console.log(sql);
        let [result] = await pool.query(sql, params);
            res.send(result);
            
    } catch(err){
        console.log(err);
    }
}




const deleteBooks = async (req, res, next) => {
    try {
        const id_book = req.params.id;

        let params = [id_book];
        let sql = `DELETE FROM book WHERE id_book = ?`
        console.log(sql);
        let [result] = await pool.query(sql, params);
            res.send(result);

    } catch(err){
        console.log(err);
    }
}




module.exports = {
    getBooks,
    addBooks,
    updateBooks,
    deleteBooks
};