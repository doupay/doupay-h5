
<!--sun Shanpeng--> 
<template>
    <div class='contentBox'>
        <div class='orderTitleCont'>
            <div class='orderTitleBox'>
                <div class='orderTitle'>
<!--                    <div class='orderTitleName'>  {{orderInit.merchantName}}</div>
 -->                </div>
                <div class='orderSubTitleBox'>
                  <b>
                    {{$t('langInfo.pay.MerchantOrderNo')}}
                  </b> 
                  {{orderInit.orderNo}}
                  <div class="icon order-id-copy" :data-clipboard-text="orderInit.orderNo" @click="copyOrderId"><img src="@/images/copy.png" alt=""></div>
                </div>
            </div>
            <div class='orderPriceCont' v-if="payInfo">
                <div class='orderPriceBox'>
                    <span class='orderCoinAmount'>{{payInfo.amount}} {{payInfo.chainCoinName}}
                        <md-tooltip md-direction="bottom" :md-active.sync="tooltipActive">{{$t('langInfo.pay.paymentAmount')}}</md-tooltip>
                    </span>
                    <span class='orderPrice' > ≈ 
                      <span v-if="orderInit.currency == 'CNY'">¥</span><span v-else>$</span>{{(payInfo.price * payInfo.amount).toFixed(2)}}
                      </span>
                    <!-- <span class='orderCoinRise up'>+2.56%</span> -->
                </div>
                <!-- <div class='coinBox'> -->
                    <!-- <span class='orderCoinAmount'>{{$t('langInfo.pay.exchangeRate')}}：1 {{payInfo.chainCoinName}}
                    </span>
                    <span class='orderPrice' > ≈ 
                      <span v-if="orderInit.currency == 'CNY'">¥</span><span v-else>$</span>{{(Number(payInfo.price)).toFixed(2)}}
                      </span> -->
                    <!-- <span class='orderCoinRise up'>+2.56%</span> -->
                <!-- </div> -->
                <div v-if="countdownTime">
                  <div class='orderPriceSubBox' v-if="countdownTime == 'Timeout'">{{$t('langInfo.pay.orderTimeOut')}}</div>
                  <div class='orderPriceSubBox' v-else>
                    <template v-if="seconds == 'zh-CN'">
                       {{$t('langInfo.pay.please')}} {{countdownTime}} {{$t('langInfo.pay.paying')}}
                    </template>
                      <template v-else>
                        {{$t('langInfo.pay.enPaying')}} {{countdownTime}}
                      </template>
                  </div>
                </div>
            </div>
        </div>
        
        <!-- main cont -->
        <!-- <div class='mainCont'>
            <div class="title">Choose your wallet</div>
            <div class='walletBox'>
                <md-tabs>
                    <md-tab id="1" :md-icon="bitcoin"></md-tab>
                    <md-tab id="2" :md-icon="bitcoin"></md-tab>
                    <md-tab id="3" :md-icon="bitcoin"></md-tab>
                    <md-tab id="4" :md-icon="bitcoin"></md-tab>
                    <md-tab id="5" :md-icon="bitcoin"></md-tab>
                </md-tabs>
            </div>
            <div class='subTitle'>Recently Selected</div>
            <div>
                <vue-q-art :config="config" :downloadButton="downloadButton"></vue-q-art>
            </div>
            <div class='aaa'>
                <QRNormal :value="config.value" className="my-qrcode" type="round" size=50 opacity=80 posType="planet" otherColor="#33CCCC" posColor="#009999" />
            </div>
        </div> -->
        <!-- qr pay -->
        <div class="mainCont">
            <div class="payBox">
                <p class="payMoney">{{$t('langInfo.pay.scanToPay')}}</p>
                <div class="amount-box">
                  <p class="payNumber">{{payInfo.amount}} {{payInfo.chainCoinName}}</p>
                  <div class="icon amount-copy" :data-clipboard-text="payInfo.amount" @click="copyAmount"><img src="@/images/copy.png" alt=""></div>
                </div>
                <p class="amount-tip">{{$t('langInfo.pay.notice')}}</p>
                <div class="radio-box">
                <!-- <div>
                <el-radio-group v-model="tabPosition" @change="handleClick">
                  <el-radio-button v-for="(item, index) in paymentInfo" :key="index" :label="item.coinName"></el-radio-button>
                </el-radio-group>
                </div> -->
                <div style="margin-top:20px;" class="chenge-type">
                  <!-- <el-radio-group @change="handleClickTwo" v-model="xyValue" style="margin-bottom: 30px;">
                      <el-radio-button v-for="(item, index) in xyInfo"  :key="index" :label="item.protocolName"></el-radio-button>
                  </el-radio-group> -->
                  <el-radio 
                    @change="handleClickTwo"
                    v-model="xyValue"
                    style="margin-bottom: 30px;"
                    v-for="(item, index) in xyInfo"
                    :key="index"
                    :label="item.protocolName"
                    border>
                  {{item.protocolName}}
                  </el-radio>
                </div>
                </div>
                <div class="qr-box">
                    <div class="qr-config">
                      <vue-q-art :config="payConfig" :downloadButton="downloadButton"></vue-q-art>
                    </div>
                </div>
                <div class="input-box">
                    <div class="input-item address" @click="copyAddress" :data-clipboard-text="payAddress">
                        <div style="flex:1;font-size:10px;" class="add-text">{{payAddress}}</div>
                        <div class="icon"><img src="@/images/copy.png"  alt=""></div>
                    </div>
                    <div class="input-item1 link" @click="copyLink" :data-clipboard-text="link">
                        <div style="flex:1">{{$t('langInfo.pay.copyPayLink')}}</div>
                        <div class="icon"><img src="@/images/copy.png" alt=""></div>
                    </div>
                    <div class="input-btn">
                      <el-button type="danger" @click="orderShow = true" plain round>{{$t('langInfo.pay.closeOrder')}}</el-button>
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
                    <!-- <div class="input-item" @click="createTimer">
                        <div style="flex:1">View payment Details</div>
                        <div class="icon"><img src="@/images/time.png" style="width: 25px; height: 25px;" alt=""></div>
                    </div> -->
                </div>
                <!-- <div class="use-wallet" @click="continueShow = true">使用钱包付款</div> -->
            </div>
        </div>
        <el-dialog
        :visible.sync="timeShow"
        :show-close="false"
        width="370px">
            <div slot="title" class="header-title" :style="{'background': '#f7f8fe', 'color': '#565d6e'}">
                <div>{{$t('langInfo.pay.lookPayDetails')}}</div>
                <img class="close" @click="close(1)" src="@/images/alert-close.png"/>
            </div>
            <div class="dialog-content">
                <div class="dialog-time">
                    <div>
                        <img src="@/images/time.png" alt="" />
                    </div>
                    <div>
                        Please send your payment within
                    </div>
                    <div style="font-weight: bold;">{{countdownTime}}</div>
                </div>
                <div class="dialog-list">
                    <div class="item">
                        <div>Total Price</div>
                        <div>20.00 USD</div>
                    </div>
                    <div class="item">
                        <div>Exchange Rate</div>
                        <div>36965.84 USD</div>
                    </div>
                    <div class="item">
                        <div>Subtotal</div>
                        <div>0.000541 BTC</div>
                    </div>
                    <div class="item">
                        <div>Network Cost</div>
                        <div>0.000149 BTC</div>
                    </div>
                    <div class="item">
                        <div>Amount Due</div>
                        <div>0.000690 BTC</div>
                    </div>
                </div>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
        </el-dialog>
        <el-dialog
        :visible.sync="copyShow"
        :show-close="false"
        width="616px">
            <div slot="title" class="header-title" :style="{'background': '#f7f8fe', 'color': '#565d6e'}">
                <div>View Payment Details</div>
                <img class="close" @click="close(2)" src="@/images/alert-close.png"/>
            </div>
            <div class="copy-content">
                <div>Payment Link</div>
                <div class="copy-link">
                    <div>
                        bitcoin:?r=https://bitpay.com/i/NYJk7rPRnm5ViMTnK4Xsap
                    </div>
                    <div class="btn" style="margin-left: 10px; cursor: pointer;" data-clipboard-text="bitcoin:?r=https://bitpay.com/i/NYJk7rPRnm5ViMTnK4Xsap" @click="copy">
                        <img src="@/images/copy.png" alt="">
                    </div>
                </div>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
        </el-dialog>
        <el-dialog
        :visible.sync="continueShow"
        :show-close="false"
        width="370px">
            <div slot="title" class="header-title" :style="{'color': '#565d6e'}">
                <img class="close" @click="close(3)" src="@/images/alert-close.png"/>
            </div>
            <div class="continue-content">
                <img class="error" src="@/images/red-error.png" alt="">
                <p class="continue-p1">Invoice Expired</p>
                <p class="continue-p2">An invoice is only valid for 15 minutes. Return to the merchant if you    would like to    resubmit a payment.</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <div class="continue-btn">Conuinue</div>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="orderShow" width="340px" :show-close="false">
          <div style="font-size: 14px; font-weight:bold;">{{$t('langInfo.pay.hint')}}</div>
          <div style="padding-top: 30px; padding-left:20px;">{{$t('langInfo.pay.isCancleOrder')}}</div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="orderShow = false">{{$t('langInfo.pay.close')}}</el-button>
              <el-button type="primary" @click="cancelOrder">{{$t('langInfo.pay.ok')}}</el-button>
            </span>
        </el-dialog>
        <div class="pay-tip">
          <p>{{$t('langInfo.pay.dontHint1')}} <span class="tip-style">{{xyValue}} {{payInfo.chainCoinName}}</span> {{$t('langInfo.pay.dontHint2')}}</p>
          <p>{{$t('langInfo.pay.dontHint3')}}<span class="tip-style">{{payInfo.chainCoinName}}</span>{{$t('langInfo.pay.dontHint4')}}<span class="tip-style">{{payInfo.price}}</span> 。</p>
          <p>{{$t('langInfo.pay.dontHint5')}}<span class="tip-style">{{payInfo.amount}}{{payInfo.chainCoinName}}</span>{{$t('langInfo.pay.dontHint6')}}</p>
          <p>{{$t('langInfo.pay.dontHint7')}}</p>
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
import { setInterval, clearInterval } from 'timers';
    export default {
        filters: { 
            
        },
        components:{
            VueQArt,
            QRNormal
        },
        data() {
            return {
                show:false,
                bitcoin:bitcoin,
                tooltipActive:false,
                //qrcode
                downloadButton:false,
                config: {
                    value: '',
                    imagePath: bitcoin,
                    size: 195,
                    filter: 'color'
                },
                langValue: 'zh-CN',
                optionsLang: [{
                  value: 'zh-CN',
                  label: '中文'
                },{
                  value: 'en-US',
                  label: 'English'
                }],
                payConfig: {
                    value: '',
                    imagePath: bitcoin,
                    size: 240,
                    filter: 'color'
                },
                timeShow: false,
                copyShow: false,
                continueShow: false,
                timer: null, //setTimeout
                time:60,
                orderInit: {},
                countdownTime: '',
                flag: false,
                payInfo:null, // 获取支付信息
                payAddress: '', // 支付地址
                orderid: '', // 订单id
                callTimer: null, // 
                tabPosition: '', // 选择的币种
                paymentInfo: [],
                xyInfo: [],
                xyValue: '', // 选择的协议
                xyObj: '', // 当前的协议对象
                orderShow: false,
                link: '',
            }
        },
        created() {  
            this.orderid = this.$route.fullPath.split('?')[1]
            this.langValue = localStorage.getItem('locale')
        },
        mounted(){
          this.link = location.href
          this.getDataDetail()
            // this.$axios.post(`http://192.168.10.115:9000/noauth/last`, {// 
            //     }, {
            //     headers: {
            //         'X-Version': 'v1.0'
            //     }
            //     }).then((res) => {
            //         console.log(1,res)
                    
            //     }).catch((err) => {
            //         console.log(2,err)
            //     })
          this.callTimer = setInterval(() => {
            this.backCall()
          },3000)
          let time = setInterval(()=>{
            if(this.flag == true){
              clearInterval(time)
              this.countdownTime = 'Timeout'
              return
            }
            this.calculateTime(this.orderInit.expireTime)
          },1000) 
        },
        beforeDestroy() {
          clearInterval(this.callTimer)
        },
        computed: {
            
        },
        methods: {
            cancelOrder() { // 取消订单
              post('/user/cancelOrder', {
                orderCode: this.orderid
              }).then(res => {
                if(res.code == 200) {
                  this.orderShow = false
                  this.$router.replace({
                    path: '/'
                  })
                }
              })
            },
            backCall() {
              post('/user/getCallback',{orderCode: this.orderid}).then(res => {
                if(res.code == 200) {
                  clearInterval(this.callTimer)
                  this.$router.replace({
                    name: 'success',
                    query: res.data
                  })
                }
              })
            },
            handleClick(e) {
              for(let item of this.paymentInfo) {
                if(item.coinName == e) {
                  this.xyInfo = item.chainInfos
                }
              }
            },
            handleClickTwo(e) {
              this.payAddress = ""
              for(let item of this.xyInfo) {
                if(item.protocolName == e) {
                  this.getPayInfo(item)
                }
              }
            },
            getPayInfo(obj) {
              let params = {
                "chainCoinCode": obj.chainCoinCode,
                "coinName": obj.chainCoinName,
                "orderCode": this.orderid
              }
              post('/user/getPaymentInfo', params).then(res => {
                if(res.code == 200) {
                  this.payConfig.value = res.data.address
                  this.payAddress = res.data.address
                  // this.payInfo.protocolName = res.data.protocolName
                } else {
                    this.$notify({
                      message: res.msg,
                      type: "warning"
                    })
                }
              })
            },
            getDataDetail() {
              post('/user/getOrderInfo',{
                orderCode: this.orderid
              }).then(res => {
                if(res.code == 200) {
                  this.orderInit = res.data
                  // this.calculateTime()
                  for(let item of res.data.paymentInfo) {
                    if(item.isDefault == '1') {
                      this.tabPosition = item.coinName
                      this.xyInfo = item.chainInfos
                      for(let key of item.chainInfos) {
                        if(key.isDefault == '1') {
                          this.xyValue = key.protocolName
                          this.payInfo = key
                          this.payConfig.value = key.address
                          this.payAddress = key.address
                        }
                      }
                    }
                  }
                  this.paymentInfo = res.data.paymentInfo

                } else {
                    if(res.msg == '訂單已超時') {
                    // 订单超时，可以在这里加跳转页面
                     this.$router.replace({ name: 'timeout'})
                    } else {
                      this.$notify({
                        message: res.msg,
                        type: "warning"
                      });
                    }
                }
              })
            },
            close(type) {
                if(type == '1') { // time
                    this.timeShow = false
                } else if(type == '2') { //copy
                    this.copyShow = false
                } else if (type == '3') {
                    this.continueShow = false
                }
            },
            popCopy(type) { // 拷贝弹窗
              this.copyShow = true
              if(type == 1) { // 地址

              } else { // 详情

              }
            },
            copyOrderId() { // 复制订单号
              var _this = this;
              var clipboard = new Clipboard(".order-id-copy"); //单页面引用
              clipboard.on("success", e => {
                  // 释放内存
                  _this.$message({
                      message: this.$t('langInfo.pay.copyTip'),
                      type: 'success'
                    });
                  clipboard.destroy();
              });
              clipboard.on("error", e => {
                  // 不支持复制
                  _this.$message({
                    message: this.$t('langInfo.pay.copyErrorTip'),
                    type: "warning"
                  });
                  // 释放内存
                  clipboard.destroy();
              });
            },
            copyAmount() { // 拷贝数量
              var _this = this;
              var clipboard = new Clipboard(".amount-copy"); //单页面引用
              clipboard.on("success", e => {
                  // 释放内存
                  _this.$message({
                      message: this.$t('langInfo.pay.copyTip'),
                      type: 'success'
                    });
                  clipboard.destroy();
              });
              clipboard.on("error", e => {
                  // 不支持复制
                  _this.$message({
                    message: this.$t('langInfo.pay.copyErrorTip'),
                    type: "warning"
                  });
                  // 释放内存
                  clipboard.destroy();
              });
            },
            copyLink() {
                var _this = this;
                var clipboard = new Clipboard(".link"); //单页面引用
                clipboard.on("success", e => {
                    // 释放内存
                   _this.$message({
                      message: this.$t('langInfo.pay.copyTip'),
                      type: 'success'
                    });
                    clipboard.destroy();
                });
                clipboard.on("error", e => {
                    // 不支持复制
                    _this.$message({
                      message: this.$t('langInfo.pay.copyErrorTip'),
                      type: "warning"
                    });
                    // 释放内存
                    clipboard.destroy();
                });
            },
            copyAddress() { // 复制地址
                var _this = this;
                var clipboard = new Clipboard(".address"); //单页面引用
                clipboard.on("success", e => {
                    // 释放内存
                    _this.$message({
                      message: this.$t('langInfo.pay.copyTip'),
                      type: 'success'
                    });
                    clipboard.destroy();
                });
                clipboard.on("error", e => {
                    // 不支持复制
                    _this.$message({
                      message: this.$t('langInfo.pay.copyErrorTip'),
                      type: "warning"
                    });
                    // 释放内存
                    clipboard.destroy();
                });
            },
            copy() {
                var _this = this;
                var clipboard = new Clipboard(".btn"); //单页面引用
                clipboard.on("success", e => {
                    // 释放内存
                    _this.$message({
                      message: this.$t('langInfo.pay.copyTip'),
                      type: 'success'
                    });
                    clipboard.destroy();
                });
                clipboard.on("error", e => {
                    // 不支持复制
                    _this.$message({
                      message: this.$t('langInfo.pay.copyErrorTip'),
                      type: "warning"
                    });
                    // 释放内存
                    clipboard.destroy();
                });
            },
            // 切换中英文
            chooseLang(val) {
              this.$i18n.locale = val
              localStorage.setItem('locale', val)
            },
            calculateTime(time) {
              const endTime = time
              const nowTime = new Date();
              let leftTime = parseInt((time-nowTime.getTime())/1000)
              let d = parseInt(leftTime/(24*60*60))
              let h = this.formate(parseInt(leftTime/(60*60)%24))
              let m = this.formate(parseInt(leftTime/60%60))
              let s = this.formate(parseInt(leftTime%60))
              if(leftTime <= 0){
                this.flag = true
                this.countdownTime = 'TimeOut'
              }
              if(d > 0) {
                this.countdownTime = `${d} days ${h}:${m}:${s}`
              } else {
                this.countdownTime = `${h}:${m}:${s}`
              }
              
            },
            formate (time) {
              if(time>=10){
                return time
              }else{
                return `0${time}`
              }
            },
            createTimer() { // set timer
                this.timeShow = true
                if(this.timer == null) {
                    this.timer = setInterval(() => {
                        if(this.time == 0) {
                            clearInterval(this.timer)
                            this.time = 60
                        } else {
                            this.time--
                        }
                    }, 1000);
                }
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
<style scoped lang="scss">
    .payBox {
        text-align: center;
        margin: 46px 0;
    }
    .payMoney {
        color: #999;
        font-size: 14px;
    }
    .payNumber {
        font-size: 24px;
        color: #f87c07;
        font-family: 'Arial-BoldMT';
        /* margin-top: 12px; */
    }
    .qr-box {
        margin-top: 17px;
    }
    .qr-box .qr-config {
      height: 200px;
      width: 200px;
      margin: 0 auto;
      /* background-color: #d2ffe882; */
      padding: 10px;
    }
    .input-box {
        margin: 20px auto 0 auto;
        width: 300px;
    }
    .input-item {
        width: 310px;
        border: 1px solid #cbd7f3;
        border-radius: 4px;
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
        padding-left: 5px;
    }
    .input-item1 {
        width: 310px;
        border: 1px solid #cbd7f3;
        height: 48px;
        border-radius: 4px;
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
    }
    .input-item1 .icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .input-item1 img {
        width: 20px;
        height: 20px;
    }
    .input-item .add-text {
      table-layout: fixed;
      word-break:break-all; 
      word-wrap:break-word;
      overflow: hidden;
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
      font-size: 12px;
      margin-bottom: 50px;
      background: #fff;
      border-radius: 8px;
      padding: 20px;
    }
    .pay-tip p {
      margin-bottom: 5px;
      color: #666;
    }
    .tip-style {
      color: #333;
      font-weight: bold;
    }
    .orderSubTitleBox {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .orderSubTitleBox .icon {
      margin-left: 5px;
    }
    .orderSubTitleBox .icon img {
      width: 25px;
      height: 25px;
    }
    .price-style {
      /* text-align: right; */
      font-size: 18px;
    }
    .radio-box {
      margin-top: 10px;
    }
    .input-btn {
      margin-top: 20px;
    }
    .orderCoinAmount {
      padding-left: 0!important;
    }
    .amount-tip {
      font-size: 14px;
      color: #999;
      margin-top: 20px;
    }
    .chenge-type .el-radio-button {
      margin-right: 10px;
    }
    .chenge-type .el-radio-group .is-active >>>span{
      background-color: #015293;
      border-radius: 36px;
    }
    .chenge-type .el-radio-group  >>>span{
      border-radius: 36px;
    }
    .chenge-type .el-cascader-node>.el-radio, .el-radio:last-child {
      margin-right: 30px;
    }
    .changeLang {
      display: flex;
      margin-top: 20px;
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
</style>
<style>
  .el-notification__content p{
    word-break: break-all;
  }
</style>