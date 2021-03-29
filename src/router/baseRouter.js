const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const qrCodeRouter = require('./qrCodeRouter');

router.get('/', (req, res) => res.send('health check: successful'));
router.use('/users',userRouter);
router.use('/qr-codes',qrCodeRouter);


module.exports = router;

