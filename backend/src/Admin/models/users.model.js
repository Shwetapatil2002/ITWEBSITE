import mongoose from "mongoose";
import { image } from "pdfkit";

const userSchema = new mongoose.Schema({
  image:{
    type:String,
    default:null
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["employee", "superAdmin", "thirdParty"],
    required: true 
  },
  designation: { 
    type: String,
    enum: ["HR", "Project Manager", "Team Lead", "Team Member"],
    required: function () { 
      return this.role === "employee"; 
    }
  },
  image : {
    type : String,
    required : true
  },
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "companies", 
    required: function () { 
      return this.role === "thirdparty"; 
    }
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    minlength: 10, 
    maxlength: 15 
  },
  status: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  },
  lastLogin: { 
    type: Date, 
    default: Date.now 
  },
  totalAmount: { 
    type: Number, 
    default: 0 
  },
  totalBonus: { 
    type: Number, 
    default: 0 
  },
  paymentHistory: [
    {
      amount: { 
        type: Number, 
        required: true 
      },
      bonus: { 
        type: Number, 
        default: 0 
      },
      paymentDate: { 
        type: Date, 
        required: true, 
        default: Date.now 
      }
    }
  ]
});

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "assignedTo"
});

const User = mongoose.model("User", userSchema);
export default User;
