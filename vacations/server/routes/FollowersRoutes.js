const express = require('express');
const router = express.Router();


const followersControllers = require('../controllers/Followers');


router.get('/getAllFollowers', followersControllers.getAllFollowers);
router.get('/getUsersFollowers', followersControllers.getUsersFollowers);
router.get('/followVacation', followersControllers.followVacation);
router.get('/adminPanelFollowers', followersControllers.adminPanelFollowers);



module.exports = router;