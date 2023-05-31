import { body } from "express-validator";

export const registerValidation = [
    body("email", "Неверная почта").isEmail(),
    //body("password").isLength({ min: 3 }),
];
