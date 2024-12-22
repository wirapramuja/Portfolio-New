import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project";

export default async function handle(req, res) {


    //if authenticated, connect to mongodb
    await mongooseConnect()

    const {method} = req;

    if (method === 'GET') {
        if (req.query?.id) {
            //fetch a single project by id
            const project = await Project.findById(req.query.id)
            res.json(project)
        } else if (req.query?.projectcategory){
            //fetch project by category
            const projectcate = await Project.find({projectcategory: req.query.projectcategory})
            res.json(projectcate)
        } else if (req.query?.slug) {
            // fetch project by slug

            const projectslug = await Project.find({slug: req.query.slug})
            res.json(projectslug.reverse())
        } else {
            //fetch all projects
            const projects = await Project.find()
            res.json(projects.reverse())
        }
    }  else {
        res.status(405).json({message: 'Method not allowed'})
    }
}