import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: false, // уникальный, не может повторяться два раза
        },
        password: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        profession: {
            type: String,
        },
        floor: {
            type: String,
        },
        favoriteColor: {
            type: Array,
        },
        license: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
