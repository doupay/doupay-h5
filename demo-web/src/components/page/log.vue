
<!--sun Shanpeng-->
<!--V1.0 20180928-->
<template>
    <div class="table" v-loading="loading"  v-if="keys.view=='exchange_log_view'">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>{{$t('langInfo.log.logManger')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form :inline="true" :model="searchform"  class="demo-form-inline">
                <div></div>
                <el-form-item :label="$t('langInfo.log.operatAccount')" >
                    <el-input v-model="searchform.userId" :placeholder="$t('langInfo.log.operatAccount')"></el-input>
                </el-form-item> 
                <el-form-item :label="$t('langInfo.log.operateIP')">
                    <el-input v-model="searchform.deviceIp" :placeholder="$t('langInfo.log.operateIP')"></el-input>
                </el-form-item> 
                <el-form-item :label="$t('langInfo.log.operateDsc')">
                    <el-input v-model="searchform.description" :placeholder="$t('langInfo.log.operateDsc')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('langInfo.log.operateTime')">
                    <el-date-picker value-format="timestamp"  v-model="searchform.Time" type="daterange" :start-placeholder="$t('langInfo.log.begainDate')" :end-placeholder="$t('langInfo.log.endDate')" :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchBtn">{{$t('langInfo.log.search')}}</el-button>
                    <el-button @click="resetfrom">{{$t('langInfo.log.reload')}}</el-button>
                </el-form-item>

            </el-form>
            <el-table :data="fromdata" border style="width: 100%"   >
                <el-table-column prop="userId" :label="$t('langInfo.log.userId')" width="150" class="xhbox"></el-table-column>
                <el-table-column prop="deviceIp" :label="$t('langInfo.log.deviceIP')" width="200" class="xhbox"></el-table-column>
                <el-table-column prop="insertTime" :label="$t('langInfo.log.createTime')" width="200"></el-table-column>
                <el-table-column prop="updateTime" :label="$t('langInfo.log.updateTime')" width="200"></el-table-column>
                <el-table-column prop="description" :label="$t('langInfo.log.description')" width=""></el-table-column> 
            </el-table>
            <div class="pagination" v-if="spageShow=='2'" >
                <el-pagination :page-size="pageSize" :current-page.sync = "page" background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div> 
            <div class="pagination" v-else>
                <el-pagination :page-size="pageSize" :current-page.sync = "page" background @current-change="SearchChange" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div> 
        </div>
    </div>
</template>

<style scoped > 
.bq_title{ margin-top:-30px; line-height: 5em;  }
.xhbox{ background: #000;}
.handle-box {margin-bottom: 20px;}
.handle-select {width: 120px;}
.handle-input {width: 300px;display: inline-block;}
.del-dialog-cnt{font-size: 16px;text-align: center}
</style>
<script>
    export default {
        data() {
            return {
                pageSize:10,
                loading:true,
                spageShow:'2',//页码 临时数据
                total:null,
                date1:null,
                page:1,
                formInline:{
                    user:null,
                },
                fromdata:[],
                searchform:{
                    userId:null,
                    deviceIp:null,
                    Time:null,
                    description:null,
                },
                key:[],
                keys:{
                    view:"",
                    view2:"",
                    view3:"",
                    add:"",
                    edit:"",
                    del:"",
                    fromdanger:''
                },
            }
        },
        created() {
            //this.getData();
            //权限 
            this.key=window.sessionStorage.getItem("permissionList")  
            this.key=JSON.parse(this.key)
       //     console.log(this.key)
            for(var i=0;i<this.key.length;i++){
                if(this.key[i]=='exchange_log_view'){
                    this.keys.view=this.key[i]
                }if(this.key[i]=='exchange_account_trade'){
                    this.keys.view2=this.key[i]
                }if(this.key[i]=='exchange_account_auditedlist'){
                    this.keys.view3=this.key[i]
                }if(this.key[i]=='exchange_info_add'){
                    this.keys.add=this.key[i]
                }if(this.key[i]=='exchange_account_confirm'){
                    this.keys.edit=this.key[i]
                }if(this.key[i]=='exchange_info_delete'){
                    this.keys.del=this.key[i]
                } 
                
            }
        },
        mounted(){
            var that=this; 
            this.page = 1;
            //获取日志列表
            this.getData()
        },
        computed: {
            
        },
        methods: {
            //分页 
            handleCurrentChange(val) {
                this.loading=true;
                this.page = val; 
                this.getData();
            }, 
            //搜索数据
            searchBtn(){ 
                this.page = 1;
                this.loading=true;
                this.search_data(1)
            }, 
            //搜索 分页
            SearchChange(val) {
                this.page = val;
                this.loading=true;
                this.search_data(val)
            }, 
            //重新载入
            resetfrom(){
                var that=this;
                this.loading=true;
                this.page = 1;
                //获取日志列表
                this.getData() 
                that. searchform.userId=null;
                that. searchform.deviceIp=null;
                that. searchform.Time=null;
                that. searchform.description=null; 
                that.spageShow=2;
            }, 
            

            //获取数据
            getData() {
                var that=this; 
                that.$axios.post(this.$urls+`/exchange/exchangeEnterpriseUserLog/v1.0/selectExchangeEnterpriseUserLog`, {//获取日志列表
                'userId':sessionStorage.getItem('userId'), 
                'pageNum':this.page,
                'pageSize':this.pageSize,  
                }).then((res) => {
                    that.spageShow=2,
                    that.fromdata=res.data.data[0].list;
                    that.total=res.data.data[0].total;
                    that.loading=false; 
                    var _Num = that.fromdata.length;
                    for(var i=0;i<_Num;i++){
                    that.fromdata[i].insertTime = that.timetrans(that.fromdata[i].insertTime)
                    that.fromdata[i].updateTime = that.timetrans(that.fromdata[i].updateTime)
                    }
                }).catch((res) => {
                    that.falseAlert('获取日志失败，请刷新或稍后重试');
                })
            },
            //获取搜索数据
            search_data(val){
                var that=this;
                this.page=val;
                var sf = that.searchform;
                if(sf.Time==null){var setTime=null;var endTime=null;}
                else{var setTime=sf.Time[0];var endTime=sf.Time[1];}
                if(sf.userId==''){var userid=null;}
                else{var userid=sf.userId;}
                if(sf.userId==''){var userid=null;}
                else{var userid=sf.userId;}
                if(sf.description==''){var description=null;}
                else{var description=sf.description;}
                if(sf.deviceIp==''){var deviceIp=null;}
                else{var deviceIp=sf.deviceIp;}
                if(sf.Time==null&&sf.description==null&&sf.deviceIp==null&&sf.userId==null){
                this.$message.error('请至少填写一个查询项');
                that.loading=false;
                }
                else{//请求接口搜索
                    //console.log(sf.userId)
                    that.$axios.post(this.$urls+`/exchange/exchangeEnterpriseUserLog/v1.0/selectExchangeEnterpriseUserLog`, {
                        'pageNum':this.page,
                        'pageSize':this.pageSize,  
                        'description':description,
                        'exchangeEnterpriseUserId':userid,
                        'userid':parseInt(window.localStorage.getItem("userId")),
                        'deviceIp':deviceIp,
                        'startTime':setTime,
                        'endTime':endTime, 
                        }).then((res) => {
                            that.spageShow=1, 
                            that.loading=false; 
                            that.fromdata=res.data.data[0].list
                            that.total=res.data.data[0].total;
                            var _Num = that.fromdata.length;
                            for(var i=0;i<_Num;i++){
                                that.fromdata[i].insertTime = that.timetrans(that.fromdata[i].insertTime)
                                that.fromdata[i].updateTime = that.timetrans(that.fromdata[i].updateTime)
                            }
                    })
                }
            },
            //时间戳转换成日期 
            timetrans(Time){ 
                var _date = new Date(Time)//;
                var Y = _date.getFullYear() + '-';
                var M = (_date.getMonth()+1 < 10 ? '0'+(_date.getMonth()+1) : _date.getMonth()+1) + '-';
                var D = _date.getDate() + ' ';
                var h = _date.getHours() + ':';
                var m = _date.getMinutes() + ':';
                var s = _date.getSeconds();  
                return(Y+M+D+h+m+s)
            }
        }
    }

</script>
