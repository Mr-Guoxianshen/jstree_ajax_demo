const express = require('express');
const app = express();
const moment = require('moment')
//导入cors模块,该模块为跨域所用
const cors = require('cors');
app.use(cors());

//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const dataSuccess1 = {
    status: '200', 
    msg: '请求成功!',
    data: [
    	{
            'groupName': '部门 1',
            'nodeNum': 1,
            'orgId': 10001
        },
        {
            'groupName': '部门 2',
            'nodeNum': 1,
            'orgId': 10002
        },
        {
            'groupName': '部门 3',
            'nodeNum': 1,
            'orgId': 10003
        }
    ]
};
const dataSuccess2 = {
    status: '200', 
    msg: '请求成功!',
    data: [
    	{
            'groupName': '子级部门 1',
            'nodeNum': 2,
            'orgId': 100010001
        },
        {
            'groupName': '子级部门 2',
            'nodeNum': 2,
            'orgId': 100020002
        }
    ]
};
const dataSuccess3 = {
    status: '200', 
    msg: '请求成功!',
    data: [
    	{
            'groupName': '子级部门 3',
            'nodeNum': 2,
            'orgId': 100030001
        },
        {
            'groupName': '子级部门 4',
            'nodeNum': 2,
            'orgId': 100030002
        }
    ]
};
const dataError = {
    status: '100', 
    msg: '请求失败!',
    data: null
};

app.all('/api/getOrgList', (req, res) => {
    res.writeHeader(200, {'Content-Type': 'text/plain;charset=utf-8'});
	if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params; 
    }
	if (param.orgId == '10000') {
        res.end(JSON.stringify(dataSuccess1));
    } else if (param.orgId == '10001') {
		res.end(JSON.stringify(dataSuccess2));
    } else if (param.orgId == '10003') {
		res.end(JSON.stringify(dataSuccess3));
    } else {
        res.end(JSON.stringify(dataError));
    }
})

app.listen(8888, () => {
	console.log('正在监听端口8888,http://127.0.0.1:8888');
})