## 开发npm模块

node-validator参考：https://github.com/SFantasy/node-validator

`node-validator` 是一个用来校验字符串的 Node.js 模块，我们可以通过

```bash
npm install is-valid --save
```

将其作为依赖安装到你的项目中。

接下来，可以通过简单的代码来看看这个即将完成的模块实现的功能，当然你也可以使用Node.js的REPL：

```JavaScript
var validator = require('is-valid');

validator.isEmail('foo@bar.net'); // true
```

### Validators

- isEmail(str): check if it is an Email string
- isAllChinese(str): check if it is a string only contains Chinese characters
- isAllEnglish(str): check if it is a string only contains English characters
- isAllDigit(str): check if it is a string only contains digits
- isChineseTel(str): check if it is a Chinese cell-phone number
- isChineseIdCard(str): check if it is a 18-digit Chinese ID card number
- isVisaCard(str): check if it is a Visa card
- isMasterCard(str): check if it is a Master card
- isLink(str): check if it is a link

### 开发node-validator

首先我们需要建立一个包的目录：

```bash
node-validator
  |- lib/
  |- test/
  |- package.json
  |- index.js
  |- README.md
```

由于项目比较简单，可以把所以的代码放在根目录下的`index.js`中。

不过为了项目的可扩展性，我们会把所有实现代码放在`lib`文件夹内，这样一来`index.js`就可以只作为一个入口文件存在：

```JavaScript
module.exports = require('./lib');
```

接下来在`lib`文件夹中创建一个`index.js`文件，用以编写我们的模块的「内容」，在 CommonJS 的模块系统中，`module.exports` 可以输出一个函数，也可以输出一个对象。

```JavaScript
module.exports = function () {
  	isEmail: function () {},
    isAllEnglish: function () {}
};
```

接下来，就可以开始编写函数体内的正则代码了：

```JavaScript
module.exports = {
    isEmail: function (str) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(str);
    },
    isAllEnglish: function (str) {
        return /^[a-zA-Z]+$/.test(str);
    }
}
```

这时候可以创建另外一个 JavaScript 文件，然后 `require('./lib')` 来测试、运行一下刚刚编写的代码。

那么到了这里，第一个版本的`node-validator`就已经完工了。

通过 `npm link` 可以将当前的npm包链接到存放系统中 npm 模块的文件夹。也就是说，当前文件夹的改动会在运行的时候体现出来，所以也是开发npm模块时候的利器。

假设我们在 `package.json` 文件中将 `name` 命名为 `validator-test`，那么就已经可以通过如下代码使用了新鲜出炉的模块了：

```JavaScript
var validator = require('validator-test');

validator.isEmail('foo@bar.net'); // true
```

### 编写测试用例

Node.js中已经有很多优秀的测试框架，例如：[mocha](https://www.npmjs.com/package/mocha), [jasmine](https://github.com/jasmine/jasmine)等。

这里，我们选择了mocha作为测试框架。

> 想要了解mocha的读者，可以访问其主页以获取更多信息: [mochajs.org](http://mochajs.org/)

- 安装mocha

```bash
npm install -g mocha
```

mocha集成了很多的特性，用户可以根据项目的特点选择合适的特性进行测试用例的编写。而在此，我们可以选择"assertion"（断言）来对"node-validator"进行测试。

- 引入`assert`

```JavaScript
var assert = require('assert');
```

"assert"中包含了很多Node.js中有关断言的模块，例如[shoud.js](https://github.com/visionmedia/should.js), [expect](https://github.com/LearnBoost/expect.js)等。这些模块多数都是行为驱动开发（BDD）的实践。

- assert示例

```JavaScript
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            [1,2,3].indexOf(5).should.equal(-1);
            [1,2,3].indexOf(0).should.equal(-1);
        });
    });
});
```

这看起来就像是我们用英语描述了一件事情。没错，我们要做的就是描述"node-validator"中的函数运行正确是什么样的，运行错误是什么样的。

照着上面的例子，可以写出测试用例代码原型：

```JavaScript
var assert = require('assert');
var validator = require('validator-test');

describe('Validator', function () {
    describe('#isEmail', function () {
        it('should return true when the string is an email address', function () {
            if (validator.isEmail('foo@bar.net') !== true) {
                throw new Erorr('Validator not right');
            }
        });
    });
});
```

然后在终端中输入mocha，会自动运行`test`目录下的`test.js`文件：

```bash
mocha
```

得到以下结果：

```bash
Validator
#isEmail
✓ should return true when the string is an email address


1 passing (6ms)
```

所以接下来要做的事情，就是为每一个"node-validator"中的函数编写测试用例，以期将所有的情况都覆盖到。