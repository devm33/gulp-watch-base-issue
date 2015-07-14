# gulp-watch-base-issue
demonstrating an issue between cwd and base with gulp-watch

## Setup

    npm i
    gulp

## Testing

After running gulp examine `dist/templates.js` it should look like this

```js
angular.module("templates").run(["$templateCache", function($templateCache) {
$templateCache.put("template1.html","<h1>test 1</h1>\n");
$templateCache.put("template2.html","<h2>test 2</h2>\n");}]);
```

To recreate the issue edit one of the html files, on save the watch pipe should
execute and the path placed in templateCache will change like so

```js
angular.module("templates").run(["$templateCache", function($templateCache) {
$templateCache.put("/template1.html","<h1>test 1</h1>\nchanged\n");
$templateCache.put("template2.html","<h2>test 2</h2>\n");}]);
```
