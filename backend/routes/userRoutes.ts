import User from '../controller/user'
import express from 'express';
const route=express.Router();

route.get('/users/:email',User.checkUser)
route.get('/users',User.getAllUsers)
route.post('/users',User.addUser)
route.delete("/deleteu/:id",User.deleteUser);
export default route;