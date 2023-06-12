import express from "express"
import cors from 'cors'
import routeUser from './routes/userRoutes'
import causeRoute from "./routes/causeRoutes";
import organizationRoute  from './routes/organizations'
import donationRoute from './routes/donationRoutes'
const app=express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(routeUser)

app.use(causeRoute)

app.use(organizationRoute)

app.use(donationRoute)


app.listen(3001,()=>{
    console.log("server listen to port 3001")
})
const main=()=>{
    console.log("learninig prisma")
}

main()
