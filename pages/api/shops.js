import { mongooseConnect } from "@/lib/mongoose";
import { Shop } from "@/models/Shop";

export default async function handle(req, res) {

    await mongooseConnect()

    const {method} = req

    if (method === 'GET') {
      if (req.query?.id) {
        //fetch a single Shop by id
        const shop = await Shop.findById(req.query.id);
        res.json(shop);
      }  else if (req.query?.slug) {
        // fetch Shop by slug

        const shopslug = await Shop.find({ slug: req.query.slug });
        res.json(shopslug.reverse());
      } else {
        //fetch all Shops
        const shops = await Shop.find();
        res.json(shops.reverse());
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
}