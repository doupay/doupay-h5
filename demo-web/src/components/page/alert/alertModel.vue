
<!--sun Shanpeng--> 
<template>
    <div class="alert-wrap">
        <el-dialog
        :visible.sync="show"
        :show-close="false"
        :width="width">
        
            <div slot="title" class="header-title" :style="{'background': '#f7f8fe', 'color': '#565d6e'}">
                <slot name="title">
                    <!-- <div>View Payment Details</div>
                    <img class="close" @click="close(1)" src="@/images/alert-close.png"/> -->
                </slot>

            </div>
        <slot name="content"></slot>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: {
            width: {
                type: String,
                default: '370px'
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        name: 'alertModel',
        filters: { 
        },
        data() {
            return {
                //  showDialog: true
            }
        },
        created() {  
            
            
        },
        mounted(){
            
        },
        components: { 
            
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
    .alert-wrap >>> .el-dialog__header {
        padding: 0;
    }
    .alert-wrap >>> .el-dialog {
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
</style>