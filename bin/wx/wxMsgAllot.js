/**
 * Created by RK on 2016/7/7.
 * 微信消息处理
 */
var wxMsg = require('./wxMsg');
var tuling=require('../tuling');
var wxEventHand=require('./wxEventHand');
var wxKeyWordHand=require('./wxKeyWordHand');
var wxKefuHand=require('./wxKefuHand');

//wx分发处理,

function wxMsgHandler(msg,res) {
    
    if(wxEventHand(msg,res)){
        console.log("消息被事件处理系统拦截了");
    }
    else if(wxKeyWordHand(msg,res)) {
        console.log("消息被关键字系统拦截了");
    }
    else {
        console.log("消息发送给客服聊天系统");
        wxKefuHand(msg,res);
    }
}

module.exports = wxMsgHandler;
