const { Schema, models, model } = require('mongoose');

const productSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }],
    afilink: { type: String },
    price: { type: String }, // you can use Number
    status: { type: String }
  },
  {
    timestamps: true //this will automatically manage createdAt and UpdatedAt
  }
);

export const Shop = models.Shop || model('Shop', productSchema, 'shops');
