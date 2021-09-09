
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';

//声明使用插件
Vue.use(VeeValidate);

//指定提示文本为中文
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,

  //根据name属性映射对映的中文提示名
  attributes: {
    phone: '手机号',
    code: '验证码',
    name: '用户名',
    pwd: '密码',
    captcha: '验证码'
  }
});

VeeValidate.Validator.extend('mobile', {
  validate: value => {
    return /^1\d{10}$/.test(value);
  },

  getMessage: field => field + '必须是11位手机号码'
})
