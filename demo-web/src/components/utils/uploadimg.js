import Vue from 'vue'; 

//上传图片 自动压缩处理
export function uploadImg(action,param,path,reWidth,reHeight){
    return new Promise((resolve, reject) => {
        var imgname =  param.name;
        var imgtype =  param.type;
       // console.log(imgtype.split('/')[1])
       console.log(param)
        let reader = new FileReader();
        reader.readAsDataURL(param);
        reader.onloadend = function() {
        let base64 = reader.result; // base64就是图片的转换的结果 
        //开始压缩图片
        var Img = new Image();
        Img.src = base64; //赋值
        Img.onload = function(){
            var set_head = '';
            let w = this.naturalWidth,
                h = this.naturalHeight,
                resizeW = 0,
                resizeH = 0;
            //压缩设置
            let maxSize = {
                width:reWidth, //设置选项 宽度
                height:reHeight, // 设置选项 高度
                level:0.9   //图片保存质量
            };
            //计算压缩比例
            if(w > maxSize.width || h > maxSize.height){
                let multiple = Math.max(w / maxSize.width , h / maxSize.height);
                resizeW = w / multiple;
                resizeH = h / multiple; 
            }else{
                resizeW = w;
                resizeH = h;
            }
            let canvas = document.createElement("canvas"),
                ctx = canvas.getContext('2d');
            if(window.navigator.userAgent.indexOf('iphone') > 0){
                canvas.width = resizeH;
                canvas.height = resizeW;
                ctx.retate(90 * Math.PI / 180);
                ctx.drawImage(Img,0,-resizeH,resizeW,resizeH);
            }else{
                canvas.width = resizeW;
                canvas.height = resizeH;
                ctx.drawImage(Img,0,0,resizeW,resizeH);
            }
            set_head = canvas.toDataURL(imgtype,maxSize.level); //得到压缩完成的base64图片
            var arr = set_head.split(','), mime = arr[0].match(/:(.*?);/)[1],bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);  
            while(n--){ 
                u8arr[n] = bstr.charCodeAt(n);  
            }
            var NewName = '123.'+imgtype.split('/')[1];
            var resize64 = new File([u8arr], NewName, {type:mime}); //得到formData
            var Newparam = new FormData(); 
            var names = imgname;  
            Newparam.append('imgFile', resize64, resize64.set_head);
            Newparam.append('message', names);
            Newparam.append('data', JSON.stringify(path));
            console.log('123123')
            let config = {headers: {'Content-Type': 'multipart/form-data'}}; 
            Vue.prototype.$axios.post(action, Newparam, config).then((res)  => { 
              
                    Vue.prototype.$message.success("上传成功");
                    resolve(res)
                 
                }).catch((res) => {
                    Vue.prototype.$message.error('上传图片失败，请稍候重试或联系管理员');
                    reject('error');
                })
                
            }; 
        } 

    });
   
};