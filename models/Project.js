const { Schema, models, model } = require('mongoose');

const projectSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    shortDescription: { type: String }, // Added field
    client: { type: String },
    projectcategory: [{ type: String }],
    tags: [{ type: String }],
    livepreview: { type: String },
    status: { type: String }
  },
  {
    timestamps: true //this will automatically manage createdAt and UpdatedAt
  }
);

export const Project =
  models.Project || model('Project', projectSchema, 'projects');
