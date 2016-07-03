var express = require('express');
var router = express.Router();
var URL = require('url');
var crypto = require('crypto');

var parseString = require('xml2js').parseString;

var token = "zhengrenkun"; //微信验证token
var weixinhao="gh_c5424fbd0ab4";


router.get('/', function(req, res, next) {
    var arg = URL.parse(req.url, true).query;
    if(isFromWeixin(arg)){
        if (arg["echostr"]){//如果url带有echostr参数，说明是微信接入验证。
            res.send(arg["echostr"]);
        }else {
            res.send(messageHandler(arg,req.body));//微信消息处理
        }
    }else {
        res.send(arg["erro"]);
    }
});
//微信消息处理函数
function messageHandler(arg,body) {
    parseString(body, function (err, result) {
        var FromUserName=result.FromUserName;
    });
    return "<xml>"+
        "<ToUserName><![CDATA["+FromUserName+"]]></ToUserName>"+
        "<FromUserName><![CDATA[gh_c5424fbd0ab4]]></FromUserName>"+
        "<CreateTime>12345678</CreateTime>"+
        "<MsgType><![CDATA[text]]></MsgType>"+
        "<Content><![CDATA[你好]]></Content>"+
        "</xml>";
}
//通过对签名的效验，来判断此条消息的真实性,是否来自微信。
function isFromWeixin(arg) {
    var signature = arg["signature"],
        timestamp = arg["timestamp"],
        nonce = arg["nonce"],
        echostr = arg["echostr"];

    /*  加密/校验流程如下： */
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    var array = [token,timestamp,nonce];
    array.sort();
    var str = array.toString().replace(/,/g,"");

    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str,'utf-8').digest("hex");

    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if(code===signature){
        return true;
    }else{
        return  false;
    }
}
module.exports = router;
