ml-cli
=======
> for lili's react project

Installation
------------

```bash
$ npm install ml-cli -g
```

Usage
-----

```
# Create new project
ml create my-projec-name

# Start a development live-reload server
ml start

# Build for production
ml build
```

CLI Options
-----------

**ml start**

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

create a `ml.config.js` file which exports function that will change the webpack's config

```
export default function (config, argv) {
  config.output.publicPath = '//cdn.example.com'
}
```

Credits
-------

[preact-cli](https://github.com/developit/preact-cli)
[vue-cli](https://github.com/vuejs/vue-cli)
