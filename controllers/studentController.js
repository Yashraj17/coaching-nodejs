const StudentCollection = require('../models/StudentModels')
 
class StudentController{
    static insert=(req,res)=>{
        const data = new StudentCollection({
            name:req.body.name,
            father_name:req.body.father_name,
            contact:req.body.contact,
            email:req.body.email,
            gender:req.body.gender,
            address:req.body.address,
            education:req.body.education,
            password:req.body.password,
        })
        data.save().then(()=>{
            console.log('data inserted successfully');
            res.redirect('/')
        }).catch(()=>{
            console.log('not inserted data');
        })
    }
}
module.exports = StudentController;