var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

let list = require('./data/list.json');
const webpush = require('web-push');
const vapidKeys = webpush.generateVAPIDKeys();
if(!vapidKeys.publicKey || !vapidKeys.privateKey) {
  console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " + 
    "environment variables. You can use the following ones:");
  console.log(webpush.generateVAPIDKeys());
  return;
}

webpush.setVapidDetails(
  'http://localhost:8081',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

module.exports = function(app, route) {
  app.get(route + 'vapidPublicKey', function(req, res) {
    res.send(vapidKeys.publicKey);
  });

  app.post(route + 'register', function(req, res) {
    res.sendStatus(201);
  });

  app.post(route + 'sendNotification', function(req, res) {
    const subscription = req.body.subscription;
    const payload = null;
    const options = {
      TTL: req.body.ttl
    };

    setTimeout(function() {
      webpush.sendNotification(subscription, payload, options)
      .then(function() {
        res.sendStatus(201);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log(error);
      });
    }, req.body.delay * 1000);
  });
};

// setting cors
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(req, res) {
  // res.sendFile('Hellow Chating App Server');
  res.sendFile(__dirname + '/index.html');
  console.log('Hellow Chating App Server');
});

// connection event handler
io.on('connection', function(socket) {
  console.log('Connect from Client: ', JSON.stringify(socket.id));

  socket.on('sendMessage', async (data) => {
    data.send_dt = new Date();
list = data.list;
    let rtnData = data;
    // rtnData.list = list;
    console.log('sendMessage>>', rtnData);
    console.log(socket.rooms);
    io.to(data.user_id).emit('sendMessage', rtnData);
  });

  socket.on('join', (data) => {
    console.log('join>>', data);
    socket.join(data.user_id);
    let rtnData = data;
    rtnData.list = list;
    io.to(data.user_id).emit('join', data);
  });

  socket.on('out', (data) => {
    console.log('out>>', data);
    socket.leave(data.user_id);
    io.to(data.user_id).emit('out', data);
  });

  socket.on('disconnect',() =>{
    console.log(socket.id + " : disconnected");
  });
});

server.listen(3001, function() {
  console.log('socket io server listening on port 3001');
});