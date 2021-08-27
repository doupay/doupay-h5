<template>
    <div class="wrapper">
                <v-head></v-head>
                <transition name="move" mode="out-in">
                        <router-view></router-view>
                </transition>
                <div class="end-log">
                <img src= '@/images/endlogo.png'/>
                <p>doupay.me</p>
                </div>
                <div style="width:100%;height:60px;"></div>
                <div class='footer'>
                  {{$t('langInfo.copyrightReserved')}}
                </div>
    </div>
</template>
<script>
    import vHead from './Header.vue';
    import bus from './bus';
    export default {
        data(){
            return {}
        },
        components:{
            vHead,
        },
        created(){
           
        }
    }
</script>
<style>
    .end-log {
      text-align: center;
      margin-top: 20px;
      font-size: 16px;
      font-family: 'Arial-BoldMT';
      color: rgb(203,216,243);
    }
   .login-div {
    background-color: #fff;
    height: 80px;
    line-height: 80px;
   }
    .logo {
      font-family: 'FranklinGothic-Medium';
      font-style: italic;
      font-weight: bold;
      font-size: 25px;
      vertical-align: middle;
    }
    .footer {
        text-align: center;
    }
</style>