const express = require("express");
const router = express.Router();

router.post("/login", async (request, response, next) => {
   response.status(200).json({jwt : "test"}); 
});

module.exports = router;