### jstree`动态加载`demo
@(jstree相关)[2018.09.21]


----------
> jsTree is **jquery plugin**, that provides ***interactive trees**. It is absolutely **free**, open source and distributed under the MIT license. jsTree is easily extendable, themable and configurable, it supports **HTML & JSON data sources and AJAX loading**.                        —— [jsTree官网](https://www.jstree.com/)

总之,  jsTree 是一款很棒的树状图插件, 本文旨在说明jsTree通过调用ajax实现动态加载的过程, 向更加全面的了解jsTree特性的小伙伴, 可以移步[jsTree官网](https://www.jstree.com/)作进一步了解.  废话不多说, start !

#### 项目启动
1. npm install
2. npm run server & npm run start **运行本地服务**
3. 在浏览器输入 **http://127.0.0.1:8080/index.html**

OK, 可以开始调试了!

#### 注意事项
```python
// 整个配置如下
var options = {
   'core': {
        'themes': { 'icons': false },
        'check_callback': true,
        // data 传入方式: json, html, ajax, function
        'data': function(obj, callback) {
	        // data 处理函数有两个字段, obj为当前加载节点, callback为回调函数
            var orgId = 10000;
            if (obj.id !== '#') {
                orgId = obj.li_attr && obj.li_attr.orgId;
            }
            var jsonArr = [];
            $.ajax({
                method: "GET",
                contentType: "application/json;charset=UTF-8",
                url: "http://127.0.0.1:8888/api/getOrgList",
                dataType: "json",
                async: false,
                data: {
                    orgId: orgId
                },
                success: function(result) {
                    let arrays = result.data || [];
                    arrays.forEach(function (item) {
	                    // 把接口数据转换为jsTree识别的结构
                        let arr = {
                            "id": item.orgId,
                            "text": item.groupName,
                            "icon": "wb-folder",
                            "state": {
                                "opened": false,
                                "selected": false
                            },
                            "li_attr": {
                                "orgId": item.orgId
                            },
                            "children": true // children字段必须为true, 才能动态加载子级结构
                        };
                        jsonArr.push(arr);
                    })
                }

            });
            callback.call(this, jsonArr);
        }
    },
    'checkbox': {
        'keep_selected_style': true
    },
    'plugins': ['checkbox', 'sort']
}

$("#jstree_div").jstree(options);
$("#jstree_div").jstree('refresh');

```


OK, 本文到此结束!