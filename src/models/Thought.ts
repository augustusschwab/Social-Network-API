import { Schema, Types, model, Document, ObjectId } from 'mongoose';

// Reaction TypeScript Interface
interface IReaction extends Document{
    reactionId: ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,
};

// Thought TypeScript Interface
interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions?: IReaction[],
};

// Schema to create reaction model
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (v: any) => v.toLocaleString()
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

// Schema to create thought model
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (v: any) => v.toLocaleString()
        },
        username: {
            type: String,
            required: true,
        },
        reactions:[reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);


// A virtual property 'reactionCount' that gets the amount of reactions per post.
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions?.length;
});

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

export default Thought;