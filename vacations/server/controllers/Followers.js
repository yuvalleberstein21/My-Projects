const con = require('../DB/database');



exports.getAllFollowers = async (req, res) => {

    await con.query("SELECT * FROM followers", (err, result) => {
        if (err) return res.json(err)
        return res.status(200).json(result)
    })
}
exports.getUsersFollowers = async (req, res) => {
    const userId = req.query.id;
    let vacations = [];
    let followers = [];
    let user = {};

    let vacationsRes = await new Promise((resolve, reject) => {
        con.query(`SELECT * FROM vacations`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }).then(rows => Array.from(rows));
    vacations = vacationsRes;

    let followersRes = await new Promise((resolve, reject) => {
        con.query(`SELECT * FROM followers`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }).then(rows => Array.from(rows));
    followers = followersRes;

    vacations.map(v => {
        let res = followers.find(user => user.vacationsID == v.vacID && user.userID == userId);
        v.isFollow = res ? true : false;
    });

    let usersRes = await new Promise((resolve, reject) => {
        con.query(`SELECT id,name,lastName,email,role FROM users WHERE id = ?`, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }).then(rows => Array.from(rows));
    if (Array.isArray(usersRes) && usersRes.length > 0) {
        user = usersRes[0];
    }

    let usersOB = {};
    usersOB.info = user;

    usersOB.vacations = vacations;

    res.send(usersOB);

}

exports.adminPanelFollowers = async (req, res) => {
    con.query(`SELECT v.vacID, v.destination, COUNT(f.userID) as followers_count FROM vacations v LEFT JOIN followers f ON v.vacID = f.vacationsID GROUP BY v.vacID, v.destination`, (err, result) => {
        if (err) return res.json(err)
        return res.status(200).json(result)
    });
};


exports.followVacation = async (req, res) => {
    const id = req.query.id;
    const vacID = req.query.vacID;

    await con.query(
        "SELECT * FROM followers WHERE userID = ? AND vacationsID = ?",
        [id, vacID],
        (err, result) => {
            if (err) {
                res.json({ message: err });
            } else {
                if (result.length > 0) {
                    con.query(
                        "DELETE FROM followers WHERE userID = ? AND vacationsID = ?",
                        [id, vacID],
                        (err, result) => {
                            if (err) {
                                res.json({ message: err });
                            } else {
                                res.json({ message: "User unfollowed vacation successfully" });
                                console.log("Follower record deleted successfully!");
                            }
                        }
                    );
                } else {
                    con.query(
                        "INSERT INTO followers(userID, vacationsID) VALUES (?, ?)",
                        [id, vacID],
                        (err, result) => {
                            if (err) {
                                res.json({ message: err });
                            } else {
                                res.json({ message: "User followed vacation successfully" });
                                console.log("New follower added successfully!");
                            }
                        }
                    );
                }
            }
        }
    );
};













