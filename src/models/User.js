//const mongoose = require('mongoose');
const {Schema,model} = require('mongoose');


const UserSchema = new Schema({
    username: {type:String, required:true, unique: true},//unique 를 통해 중복을 제어할 수 있다.
    name : {
        first : {type:String, required:true},
        last : {type:String, required:true}
    },
    age : Number,
    email : String
}, { timestamps: true})
//timestamp를 적게 되면 언제 생성되고 수정되었는지 알 수 있다.


const User = model('user',UserSchema);//이걸 몽구스가 알아먹는다고 생각하면 된다 alias라고 생각하면 편함
module.exports = { User }