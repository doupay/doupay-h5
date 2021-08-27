
<!--sun Shanpeng--> 
<template>
  <div class="contentBox">
    <div class="pay-content">
      <div class="pay-success">
        <img v-if="initObj.result" src="../../images/success.png" alt="">
        <img v-else src="../../images/error.png" alt="">
      </div>
      <div class="pay-text">{{$t('langInfo.pay.orderTimeOut')}}</div>
      <p class="pay-text1">{{$t('langInfo.pay.timeOutTip')}}</p>
    </div>
    <div class="pay-deal">
      <div class="item">
        <div>{{$t('langInfo.success.payResult')}}</div>
        <div class="p1">{{$t('langInfo.pay.orderTimeOut')}}</div>
      </div>
      <div class="item">
        <div>{{$t('langInfo.success.order')}}</div>
        <div class="p1">{{initObj.orderCode}}</div>
      </div>
      <div class="item">
        <div>{{$t('langInfo.success.payCount')}}</div>
        <div class="p1">{{initObj.amountPaid}}{{initObj.coinName}}</div>
      </div>
      <!-- <div class="item">
        <div>金额</div>
        <div class="p1">{{initObj.result}}</div>
      </div> -->
    </div>
  </div>
</template>


<script>
import { QRNormal } from 'react-qrbtf'
import VueQArt from 'vue-qart'
import bitcoin from '../../images/bitcoin-coin.svg';
import Clipboard from "clipboard";
import {post} from '../../api/api.js'
// import alertModel from './alert/alertModel.vue'
import Cookies from 'js-cookie'
    export default {
        filters: { 
            
        },
        components:{
            VueQArt,
            QRNormal
        },
        data() {
            return {
              initObj: {}
            }
        },
        created() {  
            
            
        },
        mounted(){
          console.log(this.$route)
          this.initObj = this.$route.query
        },
        computed: {
            
        },
        methods: {

        },
        // watch:{
        //         dialogVisible(val, oldVal){//监听上传图片隐藏，给file 赋值 
        //             if(val == false){
        //                 $("#file_uploade").val("")
        //             }
        //         }
        //     },
    }

</script>
<style scoped>
    .payBox {
        text-align: center;
        margin: 46px 0;
    }
    .payMoney {
        color: #999;
        font-size: 16px;
    }
    .payNumber {
        font-size: 24px;
        color: #f87c07;
        /* margin-top: 12px; */
    }
    .qr-box {
        margin-top: 17px;
    }
    .input-box {
        margin: 20px auto 0 auto;
        width: 269px;
    }
    .input-item {
        width: 269px;
        height: 48px;
        border: 1px solid #cbd7f3;
        border-radius: 4px;
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
    }
    .input-item .icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .input-item img {
        width: 20px;
        height: 20px;
    }
    .use-wallet {
        font-size: 14PX;
        color: #3366cc;
        margin-top: 24px;
        cursor: pointer;
    }
    .contentBox >>> .el-dialog__header {
        padding: 0;
    }
    .contentBox >>> .el-dialog {
        border-radius: 10px;
    }
    .header-title {
        width: 100%;
        height: 50px;
        text-align: center;
        position: relative;
        line-height: 50px;
        color: #565d6e;
        font-size: 16px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .header-title .close {
        width: 30px;
        height: 30px;
        position: absolute;
        right: 18px;
        top: 9px;
        cursor: pointer;
    }
    .dialog-time {
        /* width: 318px; */
        height: 48px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #edf3ff;
        color: #3c6cde;
        padding: 0 20px 0 10px;
    }
    .dialog-list {
        margin-top: 23px;
    }
    .dialog-list .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #565d6e;
        margin-bottom: 10px;
        font-weight: bold;
    }
    .copy-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .copy-link {
        display: flex;
        align-items: center;
        width: 460px;
        height: 52px;
        background: #edf3ff;
        color: #3c6cde;
        border-radius: 100px;
        justify-content: center;
    }
    .continue-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    .continue-content img {
        width: 61px;
        height: 61px;
        margin: 0 auto;
    }
    .continue-content .continue-p1 {
        font-size: 24px;
        color: #fb4c5c;
        margin-top: 15px;
        font-weight: bold;
    }
    .continue-content .continue-p2 {
        font-size: 14px;
        color: #565d6e;
        line-height: 1.5;
        width: 287px;
        margin: 20px auto 0 auto;
    }
    .continue-btn {
        width: 320px;
        height: 56px;
        border-radius: 100px;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        line-height: 56px;
        background-image: linear-gradient(to right, #6c98ff , #3e6ddf);
        cursor: pointer; 
    }
    .amount-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 12px;
      position: relative;
    }
    .amount-box .icon {
      width: 25px;
      height: 25px;
      margin-left: 10px;
      cursor: pointer;
    }
    .pay-tip {
      font-size: 14px;
      margin-bottom: 50px;
      background: #fff;
    }
    .pay-tip p {
      margin-bottom: 5px;
      color: #666;
    }
    .pay-content {
      margin: 20px 0;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
    }
    .pay-success img {
      width: 100%;
      height: 100%;
    }
    .pay-text {
      text-align: center;
      margin-top: 10px;
      font-weight: bold;
      font-size: 20px;
      
    }
    .pay-text1 {
      text-align: center;
      margin-top: 10px;
      color: #666666b8;
    }
    .pay-deal {
    }
    .pay-deal .item{
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      color: #666;
    }
    .pay-deal .item .p1{
      color: #333;
    }
</style>
