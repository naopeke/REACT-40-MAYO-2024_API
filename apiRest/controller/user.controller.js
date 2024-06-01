const { pool } = require('../database');

const registerUser = async (req, res, next) => {
    try {
        let sql = 'INSERT INTO user (name, last_name, email, photo, password) '+
                  'VALUES (?, ?, ?, ?, ?)';
        let params = [
            req.body.name,
            req.body.last_name,
            req.body.email,
            req.body.photo,
            req.body.password
        ]
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


const authenticateUser = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM apiBooks.user ' +
                    'WHERE email="' + req.body.email +
                    '" AND password="' + req.body.password + '"';
        let [result] = await pool.query(sql);
        console.log(result);

        //si existe este bbdd, send this userdata
        if(result.length > 0){
            const userData = {
                id_user: result[0].id_user,
                name: result[0].name,
                last_name: result[0].last_name,
                email: result[0].email,
                photo: result[0].photo
            };
            res.send(userData);
            console.log('Login ok');
        } 
    
    } catch(err){
            console.log(err);
            next(err);
    }
    }


const getUser = async (req, res, next) =>{
    try {
     let sql = 'SELECT * From apiBooks.user WHERE apiBooks.id_user = ?';
        console.log(sql);

        let [result] = await pool.query(sql);
            res.send(result);
    } catch {
        console.log(err);
        next(err);
    }

}

const editUser = async (req, res, next) => {
    try {
        console.log(req.body);
        let params = [
                    req.body.name,
                    req.body.last_name,
                    req.body.email,
                    req.body.photo,
                    req.body.password,
                    req.body.id_user,
                    ];

        let sql = 'UPDATE apiBooks.user SET name = COALESCE(?, name), ' +
                'last_name = COALESCE(?, last_name), ' +
                'email = COALESCE(?, email), ' +
                'photo = COALESCE(?, photo), ' +
                'password = COALESCE(?, password) ' +
                'WHERE id_user = ?';
            

        console.log(sql);
        let [result] = await pool.query(sql, params);
        res.send(result);
            
    } catch(err) {
        console.log(err);
        next(err);
    }
} 




module.exports = {
    registerUser,
    authenticateUser,
    getUser,
    editUser
};