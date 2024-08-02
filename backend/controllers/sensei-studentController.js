const SenseiStuModel = require("../models/sensei-student-model");
const bcrypt = require("bcryptjs");
const { cloudinary } = require("../config/cloudinary.JS");



const registerStu = async (req, res) => {
    try {
        const { studentname, date } = req.body;
        const certificate = req.files.certificate ? req.files.certificate[0] : null;

        if (!studentname || !date || !certificate) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Upload certificate to Cloudinary
        const certificateUpload = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
            uploadStream.end(certificate.buffer);
        });

        let student = await SenseiStuModel.findOne({ studentname: studentname });

        if (student) {
            return res.status(400).json({
                message: "Student already exists",
                success: false
            });
        }

        const userId = req.user && req.user._id;
        if (!userId) {
            return res.status(400).json({
                message: "User ID not found in request",
                success: false,
            });
        }

        student = await SenseiStuModel.create({
            studentname: studentname,
            date: date,
            certificate: certificateUpload.secure_url,
            Added_by: userId,
        });

        return res.status(200).json({
            message: "Student added successfully",
            student,
            success: true,
        });
    } catch (error) {
        console.error('Error registering student:', error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

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

const updateStudent = async (req, res) => {
    try {
        const {studentname, date, certificate } = req.body;
        const file = req.file;
        //clousdinney 

        const updateData = {studentname, date, certificate };

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
