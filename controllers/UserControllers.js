import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10); // алгоритм шифрования пароля
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            password: req.body.password,
            passwordHash: hash,
            profession: req.body.profession,
            favoriteColor: req.body.favoriteColor,
            license: req.body.license,
            floor: req.body.floor,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        );

        // с помощью деструктизации вытавскиваем passwordHash, но ее не используем
        const { passwordHash, ...userData } = user._doc;

        res.json({ userData, token });
    } catch (error) {
        res.status(500).json("Что-то не так");
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(500).json({
                message: "Такого пользователя нет",
            });
        }

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );

        if (!isValidPass) {
            return res.status(500).json({
                message: "Не верный логин или пароль",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            userData,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Не удалось авторизоваться",
        });
    }
};
