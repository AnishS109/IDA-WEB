import express from "express"
import cors from "cors"
import { addEnquiry, deleteEnquiryDetails, fetchEnquiryDetails, updateEnquiryDetails } from "../controllers/addEnquiry.js"
import { userRegister } from "../controllers/userRegister.js"
import { userLogin } from "../controllers/userLogin.js"
import { addConfirmStudentDetails, fetchConfirmStudentDetails } from "../controllers/confirmStudents.js"

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
router.delete("/delete-sales-enquiryDetails", deleteEnquiryDetails)
router.post("/add-Confirmed_Student_Details", addConfirmStudentDetails)
router.get("/Confirmed_Student_Details/:salesName", fetchConfirmStudentDetails)

export default router