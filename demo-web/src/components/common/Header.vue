<template>
	<!-- <div class="header md-elevation-6">
        <div class="logo">
        </div>
        <div class='buttonBox'>
            <md-button class="md-primary ">Close</md-button>
            <md-button class="md-primary signIn">Sign In</md-button>
        </div>
    </div> -->
    <el-row class="login-div">
      <el-col :span="24">
        <img src= '@/images/logo.png'/> <span class="logo">DouPay</span>
      </el-col>
    </el-row>
</template>
<script>
	import Cookies from 'js-cookie'
	import {
		Decrypt,
		Encrypt
	} from '../utils/des.js'
	import bus from '../common/bus';
	export default {
		data() {
			return {}
		},
		created() {

		},
		computed: {


		},
		methods: {

		},

	}
</script>
<style scoped>
.login-div {
	height: 60px;
	line-height: 60px;
}
</style>
