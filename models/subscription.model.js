import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"], 
        trim: true, 
        minLength: [3, "Name must be at least 3 characters"], 
        maxLength: [100, "Name must be at most 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be at least 0"]
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        default: "USD"
    }, 
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"]
    }, 
    category: {
        type: String,
        enum: ["business", "entertainment", "general", "health", "science", "sports", "technology"], 
        required: [true, "Category is required"]
    }, 
    paymentMethod: {
        type: String,
        trim: true,
        required: [true, "Payment method is required"]
    }, 
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active"
    }, 
    startDate: {
        type: Date,
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date must be in the past"
        },
        required: [true, "Start date is required"]
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            }, 
            message: "Renewal date must be after start date"
        },
        required: [true, "Start date is required"]
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: [true, "User is required"], 
        index: true
    }
}, { timestamps: true });

// autocalculate renewal date
subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1, 
            weekly: 7, 
            monthly: 30,
            yearly: 365, 
        }; 

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

        //auto update the status if the renewal date has passed
        if (this.renewalDate < new Date()) {
            this.status = "expired";
        }

        next();
    }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;