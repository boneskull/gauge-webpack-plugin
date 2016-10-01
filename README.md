# gauge-webpack-plugin

> Progress bar for Webpack built on [Gauge] supporting multiple targets

[![asciicast](https://asciinema.org/a/1aosdrhxdnqzcz958n51fzhq3.png)](https://asciinema.org/a/1aosdrhxdnqzcz958n51fzhq3?autoplay=1)

## Install

```shell
$ npm install -D webpack gauge-webpack-plugin
```

## Usage

This plugin supports multiple webpack targets, and all options of [Gauge].

### Basic

```
const GaugePlugin = require('gauge-webpack-plugin');
```

In your Webpack config, add `GaugePlugin()` to your `plugins` property:

```js
plugins: [
  GaugePlugin()
]
```

This will display a simple progress bar suitable for your terminal.  

> Note: Instantiating the plugin with `new` is not required.

### Custom Section

```js
plugins: [
  GaugePlugin('my webpack build')
]
```

This will display a progress bar with a *[section](https://www.npmjs.com/package/gauge#gaugeshowsection--status-completed)* of "my webpack build".  

### Gauge Options

```js
plugins: [
  GaugePlugin({
    write: process.stdout
  })
]
````

The above will write gauge to the `process.stdout` stream instead of the default `progress.stderr` stream.
 
```js
plugins: [
  GaugePlugin('my webpack build', {
    write: process.stdout,
    theme: 'ASCII'
  })
]
```

The above combines a custom section with a custom stream, and forces the "ASCII" Gauge theme.

### Multiple Targets

If your Webpack config exports an *Array* of objects, then you're generating multiple targets (which happens in parallel).  

#### Basic

```js
const GaugePlugin = require('gauge-webpack-plugin');

module.exports = [
  {
    // ...
    plugins: [
      GaugePlugin('electron build')
    ]
    // ...
  },
  {
    // ...
    plugins: [
      GaugePlugin('web build')
    ]
    // ...
  }
];
```

#### Custom Gauge Options in Multiple Targets

Since only one progress bar can be displayed at once (reliably), the `Gauge` object itself is a singleton.  If you need to use custom Gauge options (***not** custom section names*), then you should configure the plugin up-front, like this:

```js
const GaugePlugin = require('gauge-webpack-plugin');

GaugePlugin({
  write: process.stdout
});

module.exports = [
  {
    // ...
    plugins: [
      GaugePlugin('electron build')
    ]
    // ...
  },
  {
    // ...
    plugins: [
      GaugePlugin('web build')
    ]
    // ...
  }
];
```

Both targets will "inherit" the Gauge options from the first call to the plugin.

## License

:copyright: 2016 [Christopher Hiller](https://boneskull.com).  Licensed MIT. 

[Gauge]: https://www.npmjs.com/package/gauge
