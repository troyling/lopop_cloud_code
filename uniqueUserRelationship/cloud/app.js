// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.

    // <h1><%= username %></h1>
    // <p><%= message %></p>
    //, useranme: 'this is a user name', message: 'hello'
// app.get('/hello', function(req, res) {
// 	res.render('hello', {message: 'a'});	
// });
app.get('/hello/:id', function(req, res) {

    //res.render('mytest', {customized_name: 'lopop page', username: 'username', message: 'this is the description', star_rate: 5});

    var Pop = Parse.Object.extend("Pop");
    //res.send('1');
    var query = new Parse.Query(Pop);
    query.get(req.params.id, {
        success: function(pop) {

            var description = pop.get("popDescription");
            var userId = pop.get("seller");
            //res.send(userId.id);
            var User = Parse.Object.extend("User");
            var userQuery = new Parse.Query(User);
            var item_picz = pop.get("images");
            //res.send(item_pic[0]["_url"]);
            //res.send(description);
            userQuery.get(userId.id, {
                success: function(user) {
                    //
                    var username = user.get("name");
                    var pic = user.get("profilePictureUrl");
                    //res.send(pic);

                    //res.render('mytest', {customized_name: 'lopop page', username: username, message: description, star_rate: 5, profile_pic: pic, item_pic: item_picz[0]["_url"]});
                    res.render('test', {customized_name: 'lopop page', username: username, message: description, star_rate: 5, profile_pic: pic, item_pic: item_picz[0]["_url"]});
                },
                error: function(object, error) {
                    res.send('user not found');
                    res.end();
                }
            });

        },
        error: function(object, error) {

           res.send('object not found');
        }
    });


});
app.get('/test', function(req, res) {
    res.render('test');
});

// app.get('/hello', function(req, res) {
// 	res.render('mytest', {supplies: 'a b c'});	
// //res.render('index');  
// 	//res.render('hello', { message: 'Congrats, you just set up your app!' });
// });
// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
