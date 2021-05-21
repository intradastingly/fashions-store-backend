export {};
const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  // productID: {},
  shipmentCompany: { type: String, required: true },
  deliveryTime: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
});

module.exports = mongoose.model("shipping", shippingSchema);
