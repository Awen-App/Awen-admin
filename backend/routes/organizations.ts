import organization from '../controller/organization'
import express from 'express';
const route=express.Router();

route.get('/organizations',organization.getAllOrg);
route.post('/organizations',organization.postOrg);
route.get('/organizations/:email',organization.getOneOrgByEmail)
route.delete('/organizations/:id',organization.deleteOrganizationById)
route.get('/organization/:category',organization.getOrganizationByCategory)
export default route;