<template>
  <div style="display: flex;justify-content: center;margin-top:30px;background:white;padding:40px">
      <div style="width:52%;">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
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
    <div id="sc" style="margin-left:80px;margin-top:0;"></div>
  </div>
  </div>
</template>
<script>
import { createUser } from "@/request/api";

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
        name: "xsy",
        nick_name: "xsy",
        password:"xsy",
        password_confirmation: "xsy"
      },
      rules: {
        // pass: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // age: [{ validator: checkAge, trigger: "blur" }]
        name: [],
        nick_name: [],
        password:[],
        password_confirmation:[]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted(){
    createUser(this.ruleForm).then(res=>{
        console.log('user',res)
      }).catch(error=>{
        console.log(error)
      })
  }
};
</script>