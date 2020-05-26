# 掌通伙伴

> A minimal vue mobile template with axios & eslint & mockjs

## Build Setup

``` bash
# szy-cli install
npm install -g szy-cli

# szy-cli create
szy create project-name

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

#####测试环境部署：

> 使用反向代理方式
<p>第一步，在服务器上架设一个nginx（暂定，推荐用官网的设置），把路径指向git目录底下的dist</p>
<pre>
<code>
server {
    listen 80;
    servername partner;
    location / {
        root html;
        index index.html index.htm;
    }
    location /ding {
        alias /data/ztjy-partner/dist;
        try_files $uri $uri/ /ding/index.html;
    }
}
</code>
</pre>
<p>第二步，AMS进行反向代理，相当于是放在AMS域名下</p>
<pre>
<code>
location /ding {
    root   html;
    index  index.jsp index.htm;
    #拦截只配置到最终负载均衡的location
    access_by_lua_file ../lualib/authlua/rule-limit.lua;
    #设置链路ID，只配置到最终负载均衡的location
    proxy_set_header traceId $tid;
    proxy_set_header HOST $host;
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
    proxy_pass        http://ding;
    client_max_body_size  100m;
    proxy_connect_timeout 1;
    proxy_send_timeout 30;
    proxy_read_timeout 60;
    #请求结束需把当前连接数减1.有配access_by_lua_file，则一定要配置这个
    log_by_lua_file  ../lualib/authlua/rule-conn-end.lua;
}
</code>
</pre>
<p>第三步，拉取代码，并build，可以正常访问即可</p>
<pre>
<code>
	git clone http://gitlab.szy.net/frontend/ztjy-partner.git
	cd ztjy-partner
	npm i或者cnpm i
	npm build
</code>
</pre>
> 注意：nginx的站点路径要指向到git目录下的dist文件夹，否则只能拷贝到nginx站点文件夹


#####正式环境部署：

正式环境部署与测试环境一致即可