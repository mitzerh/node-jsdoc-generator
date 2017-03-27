# JS Doc Generator

Generate documentation for your JS files using [JsDoc](https://www.npmjs.com/package/jsdoc), and using [docDash template](https://www.npmjs.com/package/docdash).

See sample usage at: **[https://github.com/mitzerh/sample-jsdoc-generator](https://github.com/mitzerh/sample-jsdoc-generator)**

```bash
npm install --save jsdoc-generator
```

## Setup

1. Instantiate

```js
const Generator = require('jsdoc-generator');

const config = {
	silent: true,
	dest: '/path/to/output/folder',
    paths: [{
		name: 'my-app',
		source: '/path/of/your-app'
	},
	{
		name: 'another-app',
		source: '/path/of/your-other-app'
	}]
};

mydocs = new Generator(config);
mydocs.generate();
```

**Configuration properties:**

| Property | Type | Description |
|:---------|:-----|:------------|
| **dest** | String | Destination output directory |
| **silent** | Boolean | Output or suppress logs (default: **false**) |
| **paths** | Array | List of source paths where you want **jsdoc** to run |
| **paths[].name** | String | The custom folder name of your documentation |
| **paths[].source** | String | The source path of the documentation |
