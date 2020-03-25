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
        <el-form-item label="昵称" prop="name">
          <el-input type="name" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div>{{userinfo}}--{{res}}</div>
      <div id="sc" style="margin-left:80px;margin-top:0;"></div>
    </div>
  </div>
</template>
<script>
import { apiLogin,apiUser} from "@/request/api";
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
        password:"",
      },
      // rules: {
      //   pass: [{ validator: validatePass, trigger: "blur" }],
      //   checkPass: [{ validator: validatePass2, trigger: "blur" }],
      // }
      // userinfo:'未登录',
      res:''
    };
  },
  computed:{
    userinfo:{
      get(){
        return this.$store.state.isLogin ? '已登' : '未登'
      },
      set(v){
        this.$store.commit('changeIsLogin',v)
      }
    }
  },
  methods: {
    submitForm(formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
          // alert("submit!");
          this.onLoad(this.ruleForm)
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onLoad(p){
      apiLogin(p).then(res=>{
        console.log('login',res)       
        if(res.token){
          Z.setStorage('token',res.token)
          this.getMyselfInfo()
        }else{
            this.$message({
            message:res.msg+'hahaha',
            type:'error'
          })
        }
      })     
    },
    getMyselfInfo(){
      apiUser().then(res=>{//加了token就是自己的user信息
        console.log(res)
        this.userinfo = true
        this.$store.commit('setAvatarName',res.name)
        this.$store.commit('setwalletAddress',res.address)
        this.res = JSON.stringify(res)
      }).catch(error=>{
        console.log(error)
      })
    }
  },
  created(){
    // this.onLoad()
  },
  mounted() {
    // window.onload = function() {
    //   var ic = new smartCaptcha({
    //     renderTo: "#sc",
    //     width: 300,
    //     height: 42,
    //     default_txt: "点击按钮开始智能验证",
    //     success_txt: "验证成功",
    //     fail_txt: "验证失败，请在此点击按钮刷新",
    //     scaning_txt: "智能检测中",
    //     success: function(data) {
    //       console.log(NVC_Opt.token);
    //       console.log(data.sessionId);
    //       console.log(data.sig);
    //     },
    //     fail: function(data) {
    //       console.log("ic error");
    //     }
    //   });
    //   ic.init();
    // };
    // this.$axios.get('/api/stocks/ISLA', {
    //     // params: {
    //     //   ID: 12345
    //     // }
    //   })
    //   .then(function (res) {
    //     console.log(res,'原生');
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
  }
};
</script>