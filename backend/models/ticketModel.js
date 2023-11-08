const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema(
  {
    phone:{
      type: String,
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
    },
    Laptop:{
      type: String,
      enum: ["MV3","VFPro","JGuI","KO78"],
    },
    TV:{
      type: String,
      enum: ["HD70","Dolby55","Vison40","Meta50"],
    }
  }
)
const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: deviceSchema,
      required: [true, "Please select a product please"]
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
