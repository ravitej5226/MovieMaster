var express=require('express');
var path=require('path');
var open=require('open');
var movieRouter=require('../routers/movieRouter');
var userSecrets=require('../usersecrets.config.dev')
var bodyParser=require('body-parser')
const { ApiAiApp } = require('actions-on-google');
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
app.use(bodyParser.json());
app.use('/movies',movieRouter);

app.get('/',function(req,res){
  console.log(req.body)
  //console.log(res)
    res.sendFile(path.join(__dirname,'../src/index.html'));

});

app.post('/',function(req,res){
   console.log(req.body)

    const app1 = new ApiAiApp({ req, res });
  console.log(`Request headers: ${JSON.stringify(req.headers)}`);
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  app1.handleRequest(actionMap);

  //console.log(res)
    res.sendFile(path.join(__dirname,'../src/index.html'));

});

app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    else{
      console.log(userSecrets)
     //  open('http://localhost:'+port);
    }
})
