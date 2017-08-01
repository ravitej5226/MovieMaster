var express=require('express');
var path=require('path');
var open=require('open');
var movieRouter=require('../routers/movieRouter');
var userSecrets=require('../usersecrets.config.dev')

//var webpack = require('webpack')
//var config = require('../webpack.config.dev')

/*eslint-disable no-console*/

const port=3000;
var app=express();

/* Fix the below code later */
//const compiler=webpack(config);

// app.use(require('webpack-dev-middleware')(compiler,{
//    noInfo:true,
//     publicPath:config.output.publicPath
// }));

app.use('/movies',movieRouter);
//app.use('/Movies',router);




app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'../src/index.html'));

});

app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    else{
      console.log(userSecrets)
        open('http://localhost:'+port);
    }
})
