# ng-cli

A simple CLI for scaffolding napos front-end projects.

# 安装
``` bash
$ cnpm install @napos/ng-cli -g
```

# 使用
``` bash
$ ng init [options] <project-name>
```

## 栗子
``` bash
$ ng init melody-food
```
上面的指令会使用默认的模板，按照类型组织，也就是目前melody, rose使用的方式，生成melody-food项目

``` bash
$ng init -f melody-food
```
这个指令会使用按业务模块组织的模板，类似于目前melody/app/food的组织方式，生成melody-food项目
