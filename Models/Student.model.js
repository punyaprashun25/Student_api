const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    roll_no: {
        type: Number,
        required: true
    },
    email_id:{
        type:String,
        required:true
    }
});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;