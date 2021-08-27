<!--sun Shanpeng--> 
<template>
<div class="order-page-container">
    <div class='contentBox'>
        <div class="mainCont">
          <p class="title1">{{$t('langInfo.title1')}}</p>
          <p class="title2">{{$t('langInfo.title2')}}</p>
          <el-steps>
            <el-step :title="$t('langInfo.steps1')"></el-step>
            <el-step :title="$t('langInfo.steps2')"></el-step>
            <el-step :title="$t('langInfo.steps3')"></el-step>
          </el-steps>
          <div class="pay-input-box radioClass" :class="[$i18n.locale == 'en-US'? 'label-en': '']">
            <p>
            {{$t('langInfo.order.chooseType')}}
            </p>
            <!-- 选择类型 -->
            <!-- <el-select style="width:50%;margin-bottom:10px" v-model="selectValue" @change="changeSelect">
              <el-option
                v-for="item in selectList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select> -->
            <el-radio 
              class="legalTender-radio-class"
              v-model="selectValue" 
              @change="changeSelect"
              v-for="item in selectList"
              :key="item.value"
              :label="item.value"
              border>
             {{item.name}}
            </el-radio>
          </div>
          <div class="pay-input-box" :class="[$i18n.locale == 'en-US'? 'label-en': '']" v-show="selectValue=='BY_MONEY'">
            <p>
              <!-- 选择法币 -->
            {{$t('langInfo.order.chooseLegalTender')}}
            </p>
            <!-- <el-select  style="width:50%;margin-bottom:10px" v-model="fiatValue" @change="changeSelectValue">
              <el-option
                v-for="item in fiatList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select> -->
            <el-radio 
              style="margin-bottom:10px"
              v-model="fiatValue" 
              @change="changeSelectValue"
               v-for="item in fiatList"
              :key="item.value"
              :label="item.value"
              border>
             {{item.name}}
            </el-radio>
          </div>
          <div class="pay-input-box cointype-select" :class="[$i18n.locale == 'en-US'? 'label-en': '']" v-show="selectValue=='BY_AMOUNT'">
            <p>
              <!-- 选择币种 -->
            {{$t('langInfo.order.chooseCoinType')}}
            </p>
            <!-- <el-select  style="width:50%;margin-bottom:10px" v-model="currencyValue" @change="changeSelectValue">
              <el-option
                v-for="item in currencyList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select> -->
            <el-radio 
              class="cointype-radio-class"
              v-model="currencyValue" 
              @change="changeSelectValue"
                 v-for="item in currencyList"
                 :key="item.value"
                 :label="item.value"
              border>
             {{item.name}}
            </el-radio>
          </div>
          <div class="pay-input-box" :class="[$i18n.locale == 'en-US'? 'label-en': '']" v-show="selectValue=='BY_MONEY'">
            <p>
            {{$t('langInfo.order.inputMoney')}}
            </p>
          <el-input  class="merchantUserInput" style="margin-bottom: 10px; width: 50%;" v-model="money" :placeholder="$t('langInfo.order.inputMoney')" @focus="focus" @input="changeSelectValue" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </div>
          <div class="pay-input-box" :class="[$i18n.locale == 'en-US'? 'label-en': '']" v-show="selectValue=='BY_AMOUNT'">
            <p>
            {{$t('langInfo.order.chooseInputamount')}}
            </p>
          <el-input style="width: 50%;"  v-model="num" @focus="focus" class="merchantUserInput" :placeholder="$t('langInfo.order.chooseInputamount')" @input="changeSelectValue" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </div>
          <div class="pay-input-box" :class="[$i18n.locale == 'en-US'? 'label-en': '']">
            <p>
             {{$t('langInfo.order.businessUser')}}
            </p>
          <el-input style="width: 50%;margin-bottom:10px;"  v-model="merchantUser"  class="merchantUserInput"></el-input>
          </div>
        <div class="calculate-style">
          <span>{{$t('langInfo.order.isExpectedPay')}}</span>
          <span style="color:blue;padding-right:80px;padding-left:15px;">{{amountNew}} {{coinNameNew}} </span>
          <span class="referenceRate-span">{{$t('langInfo.order.referenceRate')}}： 1{{coinNameNew}}  ≈  {{priceNew}} {{currencyNew}}  {{$t('langInfo.order.marked1')}}</span>
        </div>
        <!-- <div class="calculate-style">
          预计支付：{{coinInfo.amount}} {{coinInfo.coinName}} （参考汇率： 1 USDT  ≈  {{coinInfo.price}} {{coinInfo.currency}}）
        </div> -->
        <div class="calculate-tip">
          {{$t('langInfo.order.marked2')}}
        </div>
        <div class="submitBtn">
          <el-button type="primary" @click="pay">{{$t('langInfo.order.submitOrder')}}</el-button>
        </div>
        </div>
    </div>
    <div class="changeLang">
        <el-select v-model="langValue" placeholder="请选择" @change="chooseLang">
          <el-option
            v-for="item in optionsLang"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
              langValue: 'zh-CN',
              optionsLang: [{
                value: 'zh-CN',
                label: '中文'
              },{
                value: 'en-US',
                label: 'English'
              }],
              amountNew: null,
              coinNameNew:'',
              currencyNew: null,
              priceNew: null,
              selectList: [],
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
              coinInfo: {
                amount: null

              },
              priceChanged: null
            }
        },
        created() { 
          this.autoUpdate() 
          this.langValue = localStorage.getItem('locale')
          this.getListonfig()
        },
        mounted(){
          this.getCoinPrice()
        },
        computed: {
            
        },
        methods: {
          focus() {
            if(this.money == 0) {
              this.money = ''
            }
            if(this.num == 0) {
              this.num = ''
            }
          },
          // 切换中英文
          chooseLang(val) {
            this.$i18n.locale = val
            localStorage.setItem('locale', val)
            this.getListonfig()
          },
          getListonfig() {
            if(this.langValue == 'zh-CN') {
                this.selectList = [{
                  name: '金额购买',
                  value: 'BY_MONEY'
                },{
                  name: '数量购买',
                  value: 'BY_AMOUNT'
                }]
            } else {
              this.selectList = [{
                  name: 'Use amount Buy',
                  value: 'BY_MONEY'
                },{
                  name: 'Use Quantity Buy',
                  value: 'BY_AMOUNT'
                }]
            }
          },
          updateCoinPrice(){
            this.getCoinPrice() // 请求接口
          },
          changeSelect() {
          this.fiatValue = 'CNY'
          this.currencyValue = 'USDT'
          this.money = 0
          this.num = 0
          this.getCoinPrice()
          },
          changeSelectValue() {
            if(this.selectValue == 'BY_MONEY') { // 金钱购买
            var newAmount =  (this.money / this.priceChanged).toFixed(3)
            this.amountNew = newAmount
            this.coinNameNew =this.currencyValue
          } else { // 数量购买
            this.amountNew = this.num
            this.coinNameNew =this.currencyValue
          }
           this.updateCoinPrice()
          },
          autoUpdate(){
             setInterval(this.getCoinPrice, 1000 * 20); // 15秒请求一次接口
          },
          getCoinPrice(type) {
            let params = {
            }
            params = {
              coinName: this.currencyValue, // 币种名称
              currency: this.fiatValue //
            }
            post('/user/getCoinPrice',params).then(res => {
              if(res.code == 200) {
                this.coinInfo = res.data
                this.currencyNew = this.fiatValue
                if(this.selectValue == 'BY_MONEY') { // 金钱
                  this.priceChanged = res.data.price
                  this.priceNew = res.data.price
                  this.currencyNew = this.fiatValue
                  // this.coinInfo.amount = (this.money / this.priceChanged).toFixed(3)
                  this.amountNew = (this.money / this.priceChanged).toFixed(3)
                  this.coinNameNew =this.currencyValue
                  
                } else { // 数量
                 this.amountNew = this.num
                 this.coinNameNew =this.currencyValue
                 this.priceNew = res.data.price
                }
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
                  type: "warning",
                  customClass: 'erroTip'
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
  .order-page-container .login-div {
    background-color: #fff;
    height: 80px;
    line-height: 80px;
  }
  .order-page-container .logo {
      font-family: 'FranklinGothic-Medium';
      font-style: italic;
      font-weight: bold;
      font-size: 25px;
      vertical-align: middle;
    }
    .order-page-container .mainCont {
      padding: 20px;
    }
    .order-page-container .title1 {
      font-weight: bold;
    }
    .order-page-container .title2 {
     color: #C0C4CC;
     margin-top: 20px;
     margin-bottom: 20px;
    }
    .order-page-container .mainCont >>>.el-step__title {
      font-size: 12px;
      margin-bottom: 20px;
      line-height: 20px;
    }
    .order-page-container .mainCont >>>.el-step__line {
      background-color: #44a57482;
      color:#44a57482;
    }
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
    /* .contentBox .main-conten {
      border: 1px solid red;
    } */
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
      /* display: flex;
      align-items: center; */
      margin-bottom: 15px;

    }
    .pay-input-box.cointype-select {
      max-width: 650px;
    }
    .pay-input-box>p {
      margin-bottom: 10px;
      font-weight: bold; 
    }
    .calculate-style {
      color: #666666cc;
      font-size: 12px;
      margin-top: 10px;
    }
    .calculate-tip {
      color: #666666cc;
      font-size: 12px;
      margin-top: 15px;
    }
    .submitBtn{
      margin-bottom: 20px;
      text-align: center;
    }
    .submitBtn button{
      background: #015293;
      width:260px;
      padding: 16px;
      border: none;
      border-radius: 30px;
      margin-top: 30px;
    }
    .changeLang {
      display: flex;
    }
    .changeLang .el-select {
      margin: 0 auto;
      border-radius: 12px;
    }
    .changeLang .el-select >>>.el-input input{
      border-radius: 30px;
      height: 50px;
      text-align: center;
      width: 160px;
    }
    .merchantUserInput >>>.el-input__inner {
      color: black;
      font-weight: bold;
    }
    .cointype-radio-class{
      margin-left: 0!important;
      min-width: 120px;
      margin-bottom: 10px;
    }
    .legalTender-radio-class {
      margin-top: 8px;
    }
    .legalTender-radio-class.is-bordered {
      margin-left: 0!important;
    }
    .legalTender-radio-class .el-cascader-node>.el-radio, .el-radio:last-child {
      margin-right: 30px;
    }

</style>
<style >
  .el-notification__content p{
    word-break: break-all;
  }
</style>