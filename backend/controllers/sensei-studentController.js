const jwt = require("jsonwebtoken");
const SenseiStuModel = require("../models/sensei-student-model");
const bcrypt = require("bcryptjs");

const registerStu = async (req, res) => {
    try {
        const {studentname, photo, certificate } = req.body;
        if (!studentname || !photo || !certificate ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        let Student = await SenseiStuModel.findOne({studentname: studentname});
        if (Student) {
            return res.status(400).json({
                message: "Student already exists",
                success: false
            });
        };
        Student = await SenseiStuModel.create({
            studentname : studentname,
            photo: photo,
            certificate: certificate,
            Added_by: req.id,
        })
        return res.status(200).json({
            message: "Student added successfully",
            Student,
            success: true,
            });
        } catch (error) {
        
    }
};
// allstudent show of eatch sensei  
const getStudent = async (req, res) => {
    try {
        const Added_by = req.id;  //sensei student 
        const students = await SenseiStuModel.find({ Added_by });
        if (!students) {
            return res.send(404).json({
                message: "No students found",
                success: false
            })
        }
        return res.status(200).json({
            students,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

// gey student by id 
const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await SenseiStuModel.findById(studentId);
        if (!student) {
            return res.send(404).json({
                message: "Student not found",
                success: false
            })
        }
        return res.status(200).json({
            student,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

// update student by id
const updateStudent = async (req, res) => {
    try {
        const {studentname, photo, certificate } = req.body;
        const file = req.file;
        //clousdinney 

        const updateData = {studentname, photo, certificate };

        const student = await SenseiStuModel.findByIdAndUpdate(req.params.id, updateData, {new: true});

        if (!student) {
            return res.send(404).json({
                message: "Student not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Student updated..",
            success: true,
            // student,
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = { registerStu, getStudent, getStudentById, updateStudent };
