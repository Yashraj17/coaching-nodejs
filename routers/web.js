var express  = require("express");
const { route } = require("express/lib/application");
const { Dashboardview, ManageStudent, DeleteStudent, NewAdmission, ViewStudent, ApproveStudent, DeactiveStudent, InsertAdmin, AdminLogin, logout } = require("../controllers/AdminController");
const StudentController = require("../controllers/studentController");
var router = express.Router();
var auth = require('../Middleware/auth')


router.get('/',function (req,res) {
    res.render('home')
})
router.get('/apply',function (req,res) {
    res.render('applyStudent')
})

router.post('/apply',StudentController.insert);

//admin routes

router.get("/admin/dashboard",auth.isAuthorized,Dashboardview);
router.get("/admin/manage-students",auth.isAuthorized,ManageStudent);
router.get("/admin/student/:id/view/",auth.isAuthorized,ViewStudent);
router.get("/admin/new-admission",auth.isAuthorized,NewAdmission);
router.get("/admin/student-approve/:id",auth.isAuthorized,ApproveStudent);
router.get("/admin/deactive/:id",auth.isAuthorized,DeactiveStudent);
router.get("/admin/delete/:id",auth.isAuthorized,DeleteStudent);
router.get('/admin/register',InsertAdmin)
router.get('/admin/login',function (req,res) {res.render('login')})
router.post('/admin/login',AdminLogin)
router.get('/admin/logout',logout)

module.exports = router;