/**
 * Created by Think on 2017/5/27.
 */
/*
 audioMatrixId:矩阵id；
 portId：端口id；
 mute：是否静音；
 maxChangeV:可接受每次改变的最大音量值;
 maxV:设置的最大音量；
 minV：设置的最小音量；
 currentDom：当前点击的dom；
 delName：端口名；
 */
var audioMatrix,port,mut,currentDo,maxChange,max,min,fun,root = '/icmc';
function openVolumeLayer(audioMatrixId,portId,mute,maxChangeV,maxV,minV,currentDom,delName,callback){
    audioMatrix = audioMatrixId;
    port = portId;
    mut = mute;
    maxChange = maxChangeV || 5;
    max = maxV = maxV || 100;
    min = minV = minV || 0;
    currentDom = $(currentDom);
    currentDo = $(currentDom) ;
    var micClass = '';
    if(mut){
        micClass = 'micX'
    }else{
        micClass = 'mic'
    }
    var mdV = (parseInt(maxV)+parseInt(minV))/2;//算中间时间
    var volume = '<div class="volume-control">' +
        ' <div class="volume-outer"> ' +
        '<div class="close-volume cursor">' +
        '</div> <div class="volume-center clearfix">' +
        ' <div class="now-v-u"><span class="now-v">'+currentDom.html()+'</span>db</div> ' +
        '<input type="range" class="range" min="'+minV+'" max="'+maxV+'" value="'+currentDom.html()+'"> ' +
        '<div class="v-left"> <div class="a l a0"><span>'+maxV+'</span></div> ' +
        '<div class="a s a1"><span></span></div>' +
        ' <div class="a s a2"><span></span></div> ' +
        '<div class="a s a3"><span></span></div> ' +
        '<div class="a s a4"><span></span></div> ' +
        '<div class="a l a5"><span>'+mdV+'</span></div> ' +
        '<div class="a s a6"><span></span></div>' +
        ' <div class="a s a7"><span></span></div>' +
        ' <div class="a s a8"><span></span></div>' +
        ' <div class="a s a9"><span></span></div> ' +
        '<div class="a l a10"><span>'+minV+'</span></div> ' +
        '</div> <div class="v-right">' +
        ' <div class="a l a0"><span>'+maxV+'</span></div>' +
        '<div class="a s a1"><span></span></div> ' +
        '<div class="a s a2"><span></span></div> ' +
        '<div class="a s a3"><span></span></div>' +
        ' <div class="a s a4"><span></span></div> ' +
        '<div class="a l a5"><span>'+mdV+'</span></div>' +
        ' <div class="a s a6"><span></span></div> ' +
        '<div class="a s a7"><span></span></div>' +
        ' <div class="a s a8"><span></span></div> ' +
        '<div class="a s a9"><span></span></div> ' +
        '<div class="a l a10"><span>'+minV+'</span></div></div>' +
        ' <div class="v-b-out">' +
        ' <div class="v-button"> ' +
        '<span class="cursor add"></span>' +
        ' <span class="cursor micClick '+micClass+'"></span>' +
        ' <span class="cursor down"></span> </div> ' +
        '<div class="now-v-u">'+delName+'</div> </div> </div> </div> </div>';
    body.append($(volume));
    fun = callback;
}
var body = $('body'),
    oldV,
    newV;
//关闭声音弹窗
body.on('click','.close-volume',function(){
    $('.volume-control').remove();
    var currentVolume = $('.range').val() || 100;
    fun(currentVolume);
});
//,请求改变当前音量大小
function changeVL(finalV){
    body.on('click','.micClick');
    /*//改变指定端口音量大小
     String audioMatrixId:矩阵id
     String portId:端口id
     Float volume:音量大小*/
    $.ajax({
        url:root+'/operation/audioMatrixOperation/changeVolume',
        data:{
            audioMatrixId:audioMatrix,
            portId:port,
            volume:finalV
        },
        type:"get",
        async:false,
        success:function(data){
            if(data.success){
                currentDo.html(finalV);
                $('.now-v').html(finalV);//顶部显示此时的音量值
                $('.range').val(finalV);//input显示音量值
            }else{
            	layerAlert('操作失败',2);
            }
        }
    });
}
//鼠标按下
body.on('mousedown','.range',function(){
    oldV = $(this).val();
});
//鼠标up
body.on('mouseup','.range',function(){
    changeMuteIcon();
    newV = $(this).val();
    var changeV = newV-oldV,finalV;
    if(Math.abs(changeV)>maxChange){
        if(changeV>0){
            finalV = (parseInt(oldV) + parseInt(maxChange));
        }else{
            finalV = oldV - maxChange;
        }
    }else{
        finalV = newV;
    }
    changeVL(finalV);
});
//图标增加
body.on('click','.add',function(){
    upOrDown(true,false);
});
//图标减少
body.on('click','.down',function(){
    upOrDown(false,false);
});
function upOrDown(up){
    changeMuteIcon();
    var range = $('.range'),nV = range.val(),newV;
    if(up){
        newV=(parseInt(nV)+1);
        if(newV > max){
            newV =  max
        }
    }else{
        newV=(parseInt(nV)-1);
        if(newV < min){
            newV =  min
        }
    }
    changeVL(newV);
}
//改变音量同时需要改变静音图标
function changeMuteIcon(){
    $('.micClick').removeClass('micX').addClass('mic');
    var src2="../../image/ac2.png",
        src4="../../image/ac4.png";
    var muteIcon = currentDo.parents('.out').find('.mute');
    if(muteIcon.hasClass('inP')){
        muteIcon.find('img').attr('src',src4)
    }else{
        muteIcon.find('img').attr('src',src2)
    }
    var matrix = $('#getListByScene').val();
    var sceneId = $('#sceneList').val();
    getLogs(matrix,sceneId,'AUDIOMATRIXOPERATION','.dia-detail-out');
}
//图标静音
body.on('click','.micClick',function(){
    var _this = $(this),muteStatus;
    if(_this.hasClass('mic')){
        muteStatus = true
    }else{
        muteStatus = false
    }
    changeMute(audioMatrix,port,muteStatus,currentDo,$(this));
});
/*//请求日志
 String matrix:操作的矩阵id
 String sceneId:场景id
 EModule module:模块（VIDEOMATRIXOPERATION("视频矩阵控制"),AUDIOMATRIXOPERATION("音频矩阵控制")）
 dom:放入的节点*/
function getLogs(matrix,sceneId,module,dom){
    $.ajax({
        url:root+'/internal/matrixLog/get15MatrixLogs',
        data:{
            matrix:matrix,
            sceneId:sceneId,
            module:module
        },
        type:"get",
        async:false,
        success:function(data){
            if(data.success){
                var str = '';
                var dataJson=data.data;
                $.each(dataJson,function(i,val){
                    if(this.operation == 'VOLUME' || this.operation == 'MUTE'){
                        str +='<div class="dia-detail" title="'+this.matrixPort+this.description+'"><span class="dpib name-wid-full"><span class="port-log"> '+this.matrixPort+'</span>'+this.description+'</span></div>'
                    }else if(this.operation == 'CONNECT' || this.operation == 'DISCONNECT'){
                        str +='<div class="dia-detail"  title="'+this.matrixPort+this.description+this.toMatrixPort+'"><span class="dpib name-wid-full"><span class="port-log">'+this.matrixPort+' </span>'+this.description+'<span class="port-log"> '+this.toMatrixPort+'</span></span></div>';
                        //str +='<div class="dia-detail"><span class="dpib name-wid">输入源名称输入源名称</span> <span class="dpib name-wid">——</span> <span class="dpib name-wid">输出源名称输出源名称</span></div>'
                    }
                });
                $(dom).html(str);
                $('.loading').hide();
            }else{
                layerAlert('操作失败',2);
                setTimeout(function(){
                    $('.layer-infor').remove();
                },1000);
                $('.loading').hide();
            }
        }
    });
}

/*
 * 成功或失败提示信息弹框
 * title:成功或失败提示信息
 * icon=1:成功图片
 *icon=2:失败图片
 * */
function layerAlert(title,icon,fun){
    $('#layer-wrap').hide();
    if(icon==1){
        $('body').append('<div class="layer-infor layer-infor-alert">' +
            '<div class="layer-infor-box">' +
            ' <img src="image/success_icon.png">' +
            ' <p>'+title+'</p>' +
                //'<button class="sure">确定</button>' +
            ' </div>' +
            ' </div>')
    }else if(icon==2){
        $('body').append('<div class="layer-infor layer-infor-alert">' +
            '<div class="layer-infor-box">' +
            ' <img src="image/fail_icon.png">' +
            ' <p>'+title+'</p>' +
                //'<button class="sure">确定</button>' +
            ' </div>' +
            ' </div>')
    }
    fun && fun()
}