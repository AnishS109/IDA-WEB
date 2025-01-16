import express from "express"
import cors from 'cors'
import { CollegeData, CompanyData, fetchNonTechCollege, fetchNonTechCompany, fetchTechCollege, fetchTechCompany } from "../controllers/HR/companyCollege.js"
import { HRAuthorisation } from "../utils/HRauth.js"
import { addEventNotification, fetchEventData, setEventVisit } from "../controllers/HR/eventNotification.js"

const HRrouter = express.Router()

HRrouter.use(express.json())
HRrouter.use(cors())
HRrouter.use(express.urlencoded({ extended:true }))

HRrouter.post("/Company-Details",HRAuthorisation, CompanyData)
HRrouter.post("/College-Details",HRAuthorisation, CollegeData)
HRrouter.get("/Tech-Company-Details",HRAuthorisation, fetchTechCompany)
HRrouter.get("/Non-Tech-Company-Details",HRAuthorisation, fetchNonTechCompany)
HRrouter.get("/Tech-College-Details",HRAuthorisation, fetchTechCollege)
HRrouter.get("/NonTech-College-Details",HRAuthorisation, fetchNonTechCollege)

HRrouter.post("/Add-Events", HRAuthorisation, addEventNotification)
HRrouter.post("/Set-Event-Visited", HRAuthorisation, setEventVisit)
HRrouter.get("/Events-Data", HRAuthorisation, fetchEventData)

export default HRrouter