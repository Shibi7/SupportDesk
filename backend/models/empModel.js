const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const empSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add an password"],
    },
    staffId:{
        type:String,
        default : randomUUID(),
    },
    department:{
        type:String,
        required:true,
        enum:['phone','Laptop','TV'],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Emp", empSchema);
