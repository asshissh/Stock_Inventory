const express = require("express");
const router = express.Router();
const wrapAsync = require('../middlewares/wrapAsync')
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { sendWhatsAppMessage } = require("../controller/chatController");



router.get('/:companyId',isAuthenticated,wrapAsync(sendWhatsAppMessage));
router.post('/:companyId',isAuthenticated,wrapAsync(sendWhatsAppMessage))

module.exports = router;