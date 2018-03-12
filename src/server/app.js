import path from 'path';
import Express from 'express';
import db from '../config/db';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import bodyParser from 'body-parser'


const app = new Express();
app.use(connectHistoryApiFallback());
app.use(Express.static(path.resolve(__dirname, '../../', 'dist')));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  // res.sendFile('../../../dist/index.html');
  res.sendFile('/index.html');

});

app.get('/checkInfor', function(req, res, next) {
    db.query("select * from persons",function(err,row){
        if(err){
          console.log(err);
        }else {
            res.send(row);
        }
    });
});


app.post('/searchPerson', (req, res, next) => {
   var name = req.body.name;
   var pass = req.body.password;
   var sql = "SELECT * FROM test.persons where Name = "+ "\"" + name + "\"" +" and  Password = " + pass + ";";
   db.query(sql,function(err,result){
      if(err){
        console.log(err);
      }else {
        res.send(result);
        // console.log(typeof result)
      }
  });
});

app.post('/addPerson', (req, res, next) => {
  var name = req.body.name;
  var pass = req.body.password;
  var gender = req.body.gender;
  var age = req.body.age;
  var sql = "INSERT INTO \`test\`.\`persons\` (\`Name\`, \`Password\`, \`Gender\`, `Age\`) VALUES ( " + "\"" + name + "\"" + "," + "\"" + pass +"\"" + "," + "\"" +gender + "\"" +"," + "\"" +age +  "\"" + ");" ;
  // console.log(sql)
  db.query(sql,function(err,result){
      if(err){
        console.log(err);
      }else {
          res.send(result);
      }
  });
});

app.listen(1000, () => {
  console.log(`Server listening on port 1000!`);
});

module.exports = app;
