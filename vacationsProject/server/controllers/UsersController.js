const con = require('../DB/database');
const bcrypt = require('bcryptjs');



exports.register = (req, res) => {
    const { name, lastName, email, password } = req.body;

    con.query("SELECT email FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) return res.json(err)
        if (result.length > 0) return res.send({ message: "User already exists !" });;

        let hashedPassword = await bcrypt.hash(password, 8);
        con.query("INSERT INTO users (name,lastName, email, password) VALUES (?, ?, ?,?)", [name, lastName, email, hashedPassword],
            (err, result) => {
                if (err) return res.json(err);
                const userId = result.insertId;
                return res.status(200).send({ userId });
            }
        )
    })
}


exports.login = async (req, res) => {

    const { email, password } = req.body;
    con.query("SELECT * FROM users WHERE email =?", email, (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {

                    req.session.user = result
                    res.send(result);
                }
                else {
                    res.send({ message: "Wrong email/password combination !" });
                }
            })
        }
        else {
            res.send({ message: "User doen't exist" });
        }
    });
}


exports.logout = async (req, res) => {
    const userId = req.query.id;
    await con.query(`UPDATE users SET id = NULL WHERE id = ${userId}`, (err, result) => {
        if (err) console.log(err);
        return res.send(result)
    });
}



