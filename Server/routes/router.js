import express from "express"
import cors from "cors"
import { addEnquiry, deleteEnquiryDetails, fetchEnquiryDetails, updateEnquiryDetails } from "../controllers/addEnquiry.js"
import { userRegister } from "../controllers/userRegister.js"
import { userLogin } from "../controllers/userLogin.js"

const router = express.Router()

router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended:true }))

// -------------- REGISTRATION API ---------------

router.post("/userRegister", userRegister)

// -------------- LOGIN API ---------------

router.post("/userLogin", userLogin)

// -------------- SALES SECTION API ---------------

router.get("/allEnquiryDetails/:salesName", fetchEnquiryDetails)
router.put("/update-sales-enquiryResponse", updateEnquiryDetails)
router.post("/addEnquiryDetails", addEnquiry)
router.put("/delete-sales-enquiryDetails", deleteEnquiryDetails)

export default router