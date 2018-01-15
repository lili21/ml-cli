lls-cli
=======
> for lls front-end project

Installation
------------

```bash
$ cnpm install @lls/lls-cli -g
```

Usage
-----

```
# Create new project
lls create my-projec-name

# Start a development live-reload server
lls start

# Build for production
lls build
```

CLI Options
-----------

**lls start**

```bash
--port, -p     Port to start a server on             [string]    [default: "8080"]
```


Custom Configuration
--------------------

**Browserslist**

declare a `browserslist` key within your `package.json`. default list is `[ 'Android >=4', 'iOS >= 7' ]`


**Babel**
> 该功能不完善

create a `.babelrc` file in your project's root directory.


**Webpack**

create a `lls.config.js` file which exports function that will change the webpack's config

```
export default function (config, argv) {
  config.output.publicPath = 'https://cdn.lls.com/'
}
```

Credits
-------

[preact-cli](https://github.com/developit/preact-cli)
[vue-cli](https://github.com/vuejs/vue-cli)
