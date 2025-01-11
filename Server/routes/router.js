import express from "express"
import cors from "cors"
import { addEnquiry, deleteEnquiryDetails, fetchEnquiryDetails, updateEnquiryDetails } from "../controllers/addEnquiry.js"
import { userRegister } from "../controllers/userRegister.js"
import { userLogin } from "../controllers/userLogin.js"
import { addConfirmStudentDetails, deleteConfirmStudentDetails, fetchConfirmStudentDetails } from "../controllers/confirmStudents.js"
import { getImage, UploadImage } from "../controllers/ImageController.js"
import { fetchEnrolledStudentDetails, postEnrolledStudent } from "../controllers/enrolledStudent.js"
import { getCurrentStudentId, updateStudentEnrollment,  } from "../controllers/studentEnrollmentNumber.js"
import uploadimg from "../utils/uploadimg.js"
import { deleteCallingStudentDetails, fetchCallingStudentDetails, updateCallingDetails, CallBackData } from "../controllers/callingStudent.js"
import { callCategoryData, WillVisitedUpdateData} from "../controllers/callCategory.js"
import mailSender from "../controllers/mailSender.js"
import { salesAuthorisation } from "../utils/salesAuth.js"

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
router.put("/update-sales-enquiryResponse", salesAuthorisation, updateEnquiryDetails)
router.post("/addEnquiryDetails", addEnquiry)
router.delete("/delete-sales-enquiryDetails", salesAuthorisation, deleteEnquiryDetails)

router.post("/add-Confirmed_Student_Details", salesAuthorisation, addConfirmStudentDetails)
router.get("/Confirmed_Student_Details/:salesName", fetchConfirmStudentDetails)
router.post("/Student-Enrolled-Images",uploadimg.single("file"), UploadImage);
router.get("/file/:filename", getImage)
router.delete("/confirm-student-details-delete", salesAuthorisation, deleteConfirmStudentDetails)

router.get("/enrolled-student-details/:salesName", fetchEnrolledStudentDetails)
router.post("/Student-Enrolled-Details", postEnrolledStudent);
router.get("/Student-Enrolled-Number", getCurrentStudentId);
router.put("/Student-Enrolled-Details-Update", updateStudentEnrollment);
router.post("/Enrolled-Student-Mail-Send", mailSender());

router.get("/calling-student-details",fetchCallingStudentDetails)
router.put("/calling-student-update-details", salesAuthorisation, updateCallingDetails)
router.post("/calling-will-visited-update-details",WillVisitedUpdateData)
router.post("/calling-callback-updates",CallBackData)
router.delete("/Call-Deleting-Data", deleteCallingStudentDetails);
router.get("/Call-Category-Data", callCategoryData);




export default router