const { Schema, models, model } = require('mongoose');

const PhotosSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }]
  },
  {
    timestamps: true //this will automatically manage createdAt and UpdatedAt
  }
);

export const Photo = models.Photo || model('Photo', PhotosSchema, 'photos');
