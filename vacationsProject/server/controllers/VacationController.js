const con = require('../DB/database');
const fs = require('fs');
const path = require('path');



exports.getAllVacations = async (req, res) => {
    await con.query("SELECT * FROM vacations", (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    })
}

exports.addVacation = async (req, res) => {

    const destination = req.body.destination;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const price = req.body.price;
    const imageName = req.file.filename;

    con.query("INSERT INTO vacations(destination,description,startDate,endDate,price,imageName) VALUES(?,?,?,?,?,?)",
        [destination, description, startDate, endDate, price, imageName],
        (err, result) => {
            if (err) console.log(err);
            return res.status(200).json("Vacation has been created.")
        })
}

exports.editVacation = async (req, res) => {
    const vacID = req.params.vacID
    const destination = req.body.destination;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const price = req.body.price;
    const imageName = req.file ? req.file.filename : null;

    if (req.file) {
        await con.query(`UPDATE vacations SET destination=?, description=?,startDate=?,endDate=?,price=?,imageName=? WHERE vacID =?`,
            [destination, description, startDate, endDate, price, imageName, vacID], (err, result) => {
                if (err) console.log(err);
                return res.send(result)
            });
    } else {
        await con.query(`UPDATE vacations SET destination=?, description=?,startDate=?,endDate=?,price=? WHERE vacID =?`,
            [destination, description, startDate, endDate, price, vacID], (err, result) => {
                if (err) console.log(err);
                return res.send(result)
            });
    }
}

// exports.deleteImage = async (req, res) => {
//     const filename = req.params.filename;
//     const filePath = path.join(__dirname, "../public/vacation_images", filename);
//     fs.unlink(filePath, (err) => {
//         if (err) {
//             console.log(err)
//             return res.status(500).json({ message: "Failed to delete image" });
//         }
//         return res.status(200).json({ message: "Image deleted successfully" });
//     })
//     const vacID = req.query.vacID;
//     await con.query(`DELETE FROM vacations WHERE vacID= ?`, [vacID], (error, result) => {
//         if (error) console.log(error);
//         return res.send(result)
//     })
// }

exports.filterVacations = async (req, res) => {
    await con.query("SELECT * FROM vacations", (error, result) => {
        if (error) return res.json("error");
        return res.json(result)
    })
}

exports.deleteVacation = async (req, res) => {
    const filename = req.query.filename;
    const filePath = path.join(__dirname, "../public/vacation_images", filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Failed to delete image" });
        }
        return res.status(200).json({ message: "Image deleted successfully" });
    })
    const vacID = req.query.vacID;
    await con.query(`DELETE FROM vacations WHERE vacID= ?`, [vacID], (error, result) => {
        if (error) console.log(error);
        console.log(result)
    })
}

