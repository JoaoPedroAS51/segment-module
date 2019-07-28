# Auto Page Tracking

When enabled, all pages will be automatically tracked after render.

The properties `name`, `path`, `referrer`, `title` and `url` are automatically fulfilled.
         
By default this option is enabled.


## Usage

**Basic:**
```js
segmentAnalytics: {
  autoPageTracking: true
}
```

**Advanced:**
```js
segmentAnalytics: {
  autoPageTracking: {
    enable: true
  }
}
```
