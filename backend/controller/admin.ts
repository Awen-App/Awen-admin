import { PrismaClient } from "@prisma/client";
import {Request,Response} from 'express'
const prisma =new PrismaClient();


const checkAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const adminByEmail = await prisma.admin.findMany({
        where: {
          email: req.params.email,
        },
      });
      res.json(adminByEmail)
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  };

  


  export default{checkAdmin}