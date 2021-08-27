import Vue from 'vue'; 

//上传图片 自动压缩处理
export function uploadImg(param,reWidth,reHeight){
    return new Promise((resolve, reject) => {
        var imgname =  param.name;
        var imgtype =  param.type;
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
            console.log(arr)
            if(arr[1]){
                resolve(arr[1])

            }else{
                reject('error');
            }
            
            
                
            }; 
        } 

    });
   
};