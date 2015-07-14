# gulp-watch-base-issue
demonstrating an issue with file.base in gulp-watch

## Setup

    npm i
    gulp

## Testing

After running gulp examine `dist/templates.js` it should look like this

```js
angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("template.html","<h1>test</h1>\n");}]);
```

To recreate the issue edit one of the html files, on save the watch pipe should
execute and the path placed in templateCache will change like so

```js
angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("/template.html","<h1>test change</h1>\n");}]);
```

The added slash breaks usuage of the templateCache and appears to be due to a
difference in file.base between gulp.src and gulp-watch.
