const express = require('express');
const multer = require('multer');
const router = express.Router();

const DIR = './public/vacation_images/';



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname.toLowerCase())
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


const vacationController = require('../controllers/VacationController');


router.get('/getAllVacations', vacationController.getAllVacations);
router.post('/addVacation', upload.single('VacationImage'), vacationController.addVacation);
router.post('/admin/edit/:vacID', upload.single('VacationImage'), vacationController.editVacation);
router.get('/deleteVacation', vacationController.deleteVacation);
router.get('/filterVacations', vacationController.filterVacations);


module.exports = router;