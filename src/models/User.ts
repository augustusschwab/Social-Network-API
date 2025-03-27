import { Schema, model, Document } from 'mongoose'

// User TypeScript Interface
interface IUser extends Document {
    username: string;
    email: string;
    thoughts?: Schema.Types.ObjectId[];
    friends?: Schema.Types.ObjectId[];
};

// User MongoDB Schema
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            validate: {
                validator: function(v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: 'Please enter a valid email.'
            }
        },
        thoughts: [{type: Schema.Types.ObjectId, ref:'thought'}],
        friends: [{type: Schema.Types.ObjectId, ref: 'user'}]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Virtual property that gets the amount of friends per user.
userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
})

// Initialize User Model
const User = model('user', userSchema);

export default User;
