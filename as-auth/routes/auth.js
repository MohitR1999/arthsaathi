const express = require("express");
const router = express.Router();
const getDbConnectionInstance = require("../db/connector");
const { ERRORS, SUCCESSES } = require("../utils/constants");
const User = require("../models/User");
const { createUser, modifyUser } = require("../helpers/userHelper");
const CustomError = require("../errors/CustomError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connection = getDbConnectionInstance();

router.post("/login", async (request, response, next) => {
   const { email, password } = request.body;
   try {
      const results = await connection.getByEmail(email);
      if (!results.length) {
         response.status(ERRORS.NOT_FOUND.STATUS_CODE).json({ message: ERRORS.NOT_FOUND.ERROR_MSG });
      } else {
         const user = results[0];
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            response.status(ERRORS.INVALID_PASSWORD.STATUS_CODE).json({ message: ERRORS.INVALID_PASSWORD.ERROR_MSG });
         } else {
            const token = jwt.sign({ id : user.id }, process.env.JWT_SECRET);
            response.status(SUCCESSES.SUCCESS.STATUS_CODE).json({ jwt : token });
         }
      }
   } catch (error) {
      console.log(error);
      response.status(ERRORS.INTERNAL_SERVER_ERROR.STATUS_CODE).json({ message: ERRORS.INTERNAL_SERVER_ERROR.ERROR_MSG });
   }
});

router.post("/register", async (request, response, next) => {
   const { firstName, lastName, email, password } = request.body;
   try {
      const results = await connection.getByEmail(email);
      if (results.length) {
         response.status(ERRORS.DUPLICATE_USER.STATUS_CODE).json({ message : ERRORS.DUPLICATE_USER.ERROR_MSG });
      } else {
         const user = await createUser({ firstName, lastName, email, password });
         await connection.create(user);
         response.status(SUCCESSES.CREATED.STATUS_CODE).json({ message: SUCCESSES.CREATED.MESSAGE });
      }
   } catch (error) {
      if (error instanceof CustomError) {
         response.status(error.statusCode).json({ message: error.message });
      } else {
         response.status(ERRORS.INTERNAL_SERVER_ERROR.STATUS_CODE).json({ message: ERRORS.INTERNAL_SERVER_ERROR.ERROR_MSG });
      }
   }
});

module.exports = router;