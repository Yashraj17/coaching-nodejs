const StudentCollection = require('../models/StudentModels')
const AdminModel =require('../models/AdminModel')

async function Dashboardview(req,res){
    const students = await StudentCollection.countDocuments({status:2});
    console.log(students);
    res.render('admin/dashboard',{students:students});
}

function ManageStudent(req,res){
    StudentCollection.find({status:2},function (error,response) {
        res.render('admin/manageStudent',{data:response});
    })}
function ViewStudent(req,res){
    var id =req.params.id;
    StudentCollection.findOne({"_id":id},function (error,response) {
        res.render('admin/viewStudent',{student:response});
    })
    
}
function NewAdmission(req,res){
    StudentCollection.find({status:1},function (error,response) {
        res.render('admin/manageStudent',{data:response});
    })
    
}
async function  ApproveStudent(req,res){
    var id = req.params.id;
     await StudentCollection.findOneAndUpdate({"_id":id},{status:2},{new: true})

    res.redirect(`/admin/student/${id}/view/`);
}
async function  DeactiveStudent(req,res){
    var id = req.params.id;
     await StudentCollection.findOneAndUpdate({"_id":id},{status:1},{new: true})

    res.redirect(`/admin/student/${id}/view/`);
}
function DeleteStudent(req,res){
    var del_id = req.params.id;
    StudentCollection.remove({"_id":del_id},function (error) {
        if (error) {
            throw error
        } else {
            res.redirect('/admin/new-admission')
        }
    })
}
function InsertAdmin(req,res) {
    var admin = new AdminModel({
        name:'admin',
        email:'admin@gmail.com',
        password:'1234'
    })
    admin.save();
    res.redirect('/admin/dashboard')
}

async function  AdminLogin(req,res){
    try {
        const {email,password} = req.body;
        console.log(email);
        const result = await AdminModel.findOne({email:email});
        console.log(result);
        if (result != null) {
            if (result.email == email && result.password == password) {
                req.session.user_id = result._id;
                res.redirect('/admin/dashboard')
            }
            else{
                res.send('worng password')
            }
        } else {
            res.send('wrong email and password')
        }
    } catch (error) {
        console.log(error.message);
    }
}
function logout(req,res){

    req.session.destroy(function(error){
        if (error) {
            console.log('session not deleted');
        }
        else{
            console.log('session deleted successfully');
            res.redirect('/admin/login')
        }
    })
}

module.exports ={
    Dashboardview,
    ManageStudent,
    DeleteStudent,
    NewAdmission,
    ViewStudent,
    ApproveStudent,
    DeactiveStudent,
    InsertAdmin,
    AdminLogin,
    logout,
}