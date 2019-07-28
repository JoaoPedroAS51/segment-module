# Server Side Analytics

## Create server source

Again let's add a new source. Go to [Segment dashboard](https://app.segment.com/workspaces), then click **Add Source** in sources page. For the server side we are going to use **Node.js** source, located in **Server** category.


## Add server key

To find the key of your server source, you must follow the same steps as the client source. Go to [Segment dashboard](https://app.segment.com/workspaces) and select your server source. Then go to settings tab and in **API Key** page you'll find **Write Key**.
Copy its value and add it to module options:

```js
segmentAnalytics: {
  serverKey: 'your-server-key'
}
```
