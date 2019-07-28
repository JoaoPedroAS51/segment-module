# Client Side Analytics

## Create client source

The first thing to do is add a new source. Go to [Segment dashboard](https://app.segment.com/workspaces), then click **Add Source** in sources page. For the client side we are going to use **Javascript** source, located in **Website** category.


## Add client key

To find the key of your source, go again to [Segment dashboard](https://app.segment.com/workspaces) and select your client source. Then go to settings tab and in **API Key** page you'll find **Write Key**.
Copy its value and add it to module options:

```js
segmentAnalytics: {
  clientKey: 'your-client-key'
}
```
