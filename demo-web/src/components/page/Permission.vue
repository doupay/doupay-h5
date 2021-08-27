<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-warn"></i> {{$t('langInfo.Permission.permissionTest')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
            <h1><img src="../../images/red-error.png" style="margin-right:10px;"/>{{$t('langInfo.Permission.adminPage')}}</h1>
            <p style="padding:20px;">{{$t('langInfo.Permission.tip1')}}</p>
            <p style="padding-left:20px;">{{$t('langInfo.Permission.please')}}<router-link to="/login" class="logout">{{$t('langInfo.Permission.logOut')}}</router-link>{{$t('langInfo.Permission.tip2')}}</p>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {}
        }
    }
</script>

<style scoped>
h1{
    text-align: center;
    margin: 30px 0;
}
p{
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.logout{
    color: #409EFF;
}
@media screen and  (min-width:1024px) {
    .container {
        width: 800px;
        margin: 0 auto;
    }
}

</style>
