
<!--sun Shanpeng--> 
<template>
    <div class='contentBox'>
        <!-- qr pay -->
        <div class="mainCont">

          <div class="pay-input-box">
            <p>
            请选择类型：
            </p>
            <el-select style="width:50%;margin-bottom:10px" v-model="selectValue" placeholder="请选择" @change="changeSelect">
              <el-option
                v-for="item in selectList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="pay-input-box" v-show="selectValue=='BY_MONEY'">
            <p>
            请选择法币：
            </p>
            <el-select  style="width:50%;margin-bottom:10px" v-model="fiatValue" placeholder="请选择法币" @change="changeSelectValue">
              <el-option
                v-for="item in fiatList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="pay-input-box" v-show="selectValue=='BY_AMOUNT'">
            <p>
            请选择币种：
            </p>
            <el-select  style="width:50%;margin-bottom:10px" v-model="currencyValue" placeholder="请选择币种" @change="changeSelectValue">
              <el-option
                v-for="item in currencyList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="pay-input-box" v-show="selectValue=='BY_MONEY'">
            <p>
            请输入金额：
            </p>
          <el-input  style="margin-bottom: 10px; width: 50%;" v-model="money" @input="changeSelectValue" placeholder="请输入金额"></el-input>
          </div>
          <div class="pay-input-box" v-show="selectValue=='BY_AMOUNT'">
            <p>
            请输入数量：
            </p>
          <el-input style="width: 50%;"  v-model="num" placeholder="请输入数量"  @input="changeSelectValue"></el-input>
          </div>
          <div class="pay-input-box">
            <p>
            商家用户：
            </p>
          <el-input style="width: 50%;margin-bottom:10px;"  v-model="merchantUser" placeholder="请输入商家用户"></el-input>
          </div>
        </div>
        <div class="calculate-style">
          预计支付：{{coinInfo.amount}} {{coinInfo.coinName}} （参考汇率： 1{{coinInfo.coinName}}  ≈  {{coinInfo.price}} {{coinInfo.currency}}）
        </div>
        <div class="calculate-tip">
          支付金额与汇率请以实际支付时为准
        </div>
        <div>

        </div>
        <div style="display:flex;">
          <el-button type="primary" @click="pay" style="margin: 10px auto;">提交订单</el-button>
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
              selectList: [{
                name: '金额购买',
                value: 'BY_MONEY'
              },{
                name: '数量购买',
                value: 'BY_AMOUNT'
              }],
              fiatList: [{
                name: 'CNY',
                value: 'CNY'
              }],
              currencyList: [{
                name: 'BTC',
                value: 'BTC'
              },{
                name: 'ETH',
                value: 'ETH'
              },{
                name: 'TRX',
                value: 'TRX'
              },{
                name: 'USDT',
                value: 'USDT'
              }],
              selectValue: 'BY_MONEY',
              fiatValue: 'CNY',
              currencyValue: 'USDT',
              money: 0,
              num: 0,
              merchantUser: '',
              loading: false,
              coinInfo: {},
            }
        },
        created() {  
        },
        mounted(){
          this.getCoinPrice()
        },
        computed: {
            
        },
        methods: {
          changeSelect() {
          this.fiatValue = 'CNY'
          this.currencyValue = 'USDT'
          this.money = 0
          this.num = 0
          this.getCoinPrice()
          },
          changeSelectValue() {
            this.getCoinPrice()
          },
          getCoinPrice() {
            let params = {
            }
            if(this.selectValue == 'BY_MONEY') {
              params = {
                orderType: this.selectValue,
                currency: this.fiatValue,
                money: this.money ? this.money : 0,
              }
            } else {
              params = {
                orderType: this.selectValue,
                coinName: this.currencyValue,
                amount: this.num ? this.num : 0,
              }
            }
            post('/user/getCoinPrice',params).then(res => {
              if(res.code == 200) {
                this.coinInfo = res.data
              }
            })
          },
          pay() {
            if(this.loading) {
              return
            }
            let params = {
            }
            if(this.selectValue == 'BY_MONEY') {
              params = {
                merchantUser: this.merchantUser,
                orderType: this.selectValue,
                currency: this.fiatValue,
                money: this.money,
              }
            } else {
              params = {
                merchantUser: this.merchantUser,
                orderType: this.selectValue,
                coinName: this.currencyValue,
                amount: this.num,
              }
            }
            this.loading = true
            post('/user/pay', params ).then(res => {
              if(res.code == 200) {
                this.loading = false
                this.selectValue= 'BY_MONEY'
                this.fiatValue= 'CNY'
                this.currencyValue= 'USDT'
                this.money= 0
                this.num= 0
                this.merchantUser= ''
                this.coinInfo={}
                this.$router.push({path:`/pay?${res.data.orderCode}`})

              } else {
                this.loading = false
                this.$notify({
                  message: res.msg,
                  type: "warning"
                });
              }
            })
          }
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
        margin: 28px 0;
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
    }
    .pay-tip p {
      margin-bottom: 5px;
      color: #666;
    }
    .pay-input-box {
      display: flex;
      align-items: center;

    }
    .pay-input-box>p {
      width: 90px;
    }
    .calculate-style {
      color: #666;
      font-size: 12px;
    }
    .calculate-tip {
      color: #666;
      font-size: 12px;
    }
</style>
