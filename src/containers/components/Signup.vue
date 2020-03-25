<template>
  <div style="display: flex;justify-content: center;margin-top:30px;background:white;padding:40px">
      <div style="width:52%;">
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >     
    <!-- :rules="rules" -->
      <el-form-item label="昵称" prop="name">
        <el-input type="text" v-model="ruleForm['name']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nick_name">
        <el-input type="text" v-model="ruleForm['nick_name']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm['password']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password_confirmation">
        <el-input type="password" v-model="ruleForm['password_confirmation']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
    <div>{{tip}}</div>
    <div id="sc" style="margin-left:80px;margin-top:0;"></div>
  </div>
  </div>
</template>
<script>
import { apiGeetest,createUser } from "@/request/api";
import Z from '@/util/localStorage.js'
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        nick_name: "",
        password:"",
        password_confirmation: ""
      },
      tip:'未注册'
      // rules: {
      //   // pass: [{ validator: validatePass, trigger: "blur" }],
      //   // checkPass: [{ validator: validatePass2, trigger: "blur" }],
      //   // age: [{ validator: checkAge, trigger: "blur" }]
      //   name: [],
      //   nick_name: [],
      //   password:[],
      //   password_confirmation:[]
      // }
    };
  },
  methods: {
    submitForm(formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
        this.newUser()
        // } else {
        //   console.log("error submit!!");
        //   return false;
        // }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    newUser(){
      createUser(this.ruleForm).then(res=>{
        console.log('user',res)  
        this.tip = '注册成功'+JSON.stringify(res)    
        if(res.msg){
          this.$message({
          message:res.msg,
          type:'success'
          })
        }else if(res.token){
          Z.setStorage('token',res.token)
        //注册成功返回res { id: 3, token: "a8ZTTSl1tgpKttxgNBMag6lagTF2URAV" }--将token存入本地
        }
      }).catch(error=>{
        console.log(error,'注册失败')
        this.tip = '注册失败'
      })
    }
  },
  mounted(){
    // apiGeetest().then(res=>{//TODO 此请求500
    //     console.log('geetest',res)
    //   }).catch(error=>{
    //     console.log(error)
    //   })  
    }
  }
</script>