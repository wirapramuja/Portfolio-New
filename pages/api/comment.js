import { mongooseConnect } from '@/lib/mongoose';
import { Comment } from '@/models/Comment';

export default async function handle(req, res) {
  //if authenticated, connect to mongodb

  await mongooseConnect();

  const { method } = req;

  if (method === 'POST') {
    try {
      const { name, email, title, contentpera, parent } = req.body;

      let commentDoc;

      if (parent) {
        //if parent comment id is provided, create a child comment
        commentDoc = await Comment.create({
          name,
          email,
          title,
          contentpera,
          parent: parent
        });

        //update parent comments's children array
        await Comment.findByIdAndUpdate(parent, {
            $push: {chiildren: commentDoc._id}
        })
      } else {
        // otherwise, create a root
        commentDoc = await Comment.create({
            name, email, title, contentpera
        })
      }

      res.status(201).json(commentDoc) //response wtih 201 created status
    } catch (error) {
        console.error('Error creating comment:', error)
        res.status(500).json({error: 'Failed to create'})
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
