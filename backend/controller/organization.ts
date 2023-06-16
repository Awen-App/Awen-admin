import { PrismaClient } from "@prisma/client";
import {Request,Response} from 'express'
const prisma =new PrismaClient();

//------------------------get all organizations------------------------
const getAllOrg=async(req:Request,res:Response)=>{
    try{
        const organizations=await prisma.organization.findMany();
        res.status(200).json(organizations)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}
//------------------------post one organization-------------------------
const postOrg=async(req:Request,res:Response)=>{
    try{
        const organizations=await prisma.organization.create({
            data:{
            orgId:req.body.orgId,
            orgName:req.body.orgName,
            orgEmail: req.body.orgEmail,
            description:req.body.description,
            category:req.body.category,
            orgImg:"https://1000logos.net/wp-content/uploads/2020/08/Anonymous-Logo.png",
            rip:req.body.rip
            },
          });
        console.log(req.body)
        res.status(201).json(organizations)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
//--------------------get organization by email---------------------------------
const getOneOrgByEmail=async(req:Request,res:Response)=>{
    try {
        const one= await prisma.organization.findMany({where:{orgEmail:req.params.email}})
        res.status(200).json(one)
    } catch (error) {
        res.status(500).json(error)
    }
}
//--------------------delete organization by ID---------------------------------
const deleteOrganizationById = async (req: Request, res: Response) => {
    try {
      const orgId = req.params.id;
  
      // Check if the organization exists
      const existingOrganization = await prisma.organization.findUnique({
        where: {
          orgId,
        },
      });
  
      if (!existingOrganization) {
        return res.status(404).json({ error: 'Organization not found' });
      }
  
      // Check if there are any associated causes
      const associatedCauses = await prisma.cause.findMany({
        where: {
          authorId: orgId,
        },
      });
  
      if (associatedCauses.length > 0) {
        return res.status(400).json({ error: 'Cannot delete organization with associated causes' });
      }
  
      // Check if there are any associated donations
      const associatedDonations = await prisma.donation.findMany({
        where: {
          cause: {
            authorId: orgId,
          },
        },
      });
  
      if (associatedDonations.length > 0) {
        return res.status(400).json({ error: 'Cannot delete organization with associated donations' });
      }
  
      // Check if there are any associated messages
      const associatedMessages = await prisma.message.findMany({
        where: {
          OR: [
            { Conversation: { orgName: orgId } },
            { Conversation: { userEmail: orgId } },
          ],
        },
      });
  
      if (associatedMessages.length > 0) {
        return res.status(400).json({ error: 'Cannot delete organization with associated messages' });
      }
  
      // Delete the organization
      const deletedOrganization = await prisma.organization.delete({
        where: {
          orgId,
        },
      });
  
      res.status(200).json({
        message: 'Organization deleted successfully',
        deletedOrganization,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting organization' });
    }
  };
  //-------------------get Organization By category----------------
  const getOrganizationByCategory = async (req: Request, res: Response) => {
    try {
    
  console.log(req.params.category)
      // Retrieve organizations with the specified category
      const organizations = await prisma.organization.findMany({
        where: {
          category:req.params.category
        }
      });
  
      res.status(200).send(organizations);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving organizations by category' });
    }
  };
  
  
  
  

export default {getAllOrg,postOrg,getOneOrgByEmail,deleteOrganizationById,getOrganizationByCategory}
