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
lls watch

# Build for production
lls build
```


Custom Configuration
--------------------

#### Browserslist

declare a `browserslist` key within your `package.json`. default list is `[ 'Android >=4', 'iOS >= 7' ]`


#### Babel

create a `.babelrc` file in your project's root directory.


#### Webpack

create a `lls.config.js` file which exports function that will change the webpack's config

```
export default function (config, argv) {
  config.output.publicPath = 'https://cdn.lls.com/'
}
```
