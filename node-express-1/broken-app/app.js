const express = require('express');
const app = express();
const ExpressError = require("./expressError")
const axios = require('axios');
const { response } = require('express');

// app.use(express.json)




// app.get('/', async function(req, res, next) {

//     try {
//         const result = await axios.get(base_url)
//         console.log(result.data)
//         let outPut = result.data
//         // res.send(result.data.bio)
//         res.send(JSON.stringify(outPut))
//     } catch (err) {
//         return next(err)
//     }
// })
    
// app.post('/check', async function(req, res, next) {
    
//     try {
//         const result = await axios.get(base_url)
//         result.push(result.body)
//         res.json(result)
//     }
//     catch (err) {
//         return next(err)
//     }
// })

app.post('/users/:username', async function(req, res, next) {
    //req.body is the request sent from the server - json
    //developers is the key to the object
    //for each username it grabs the 
  try {
    let results = await axios.get(`https://api.github.com/users/${req.params.username}`);
    console.log(results)
    if (results.data.name === null){
        throw new ExpressError('User not found' , 404);
      }
    if (results.data.bio === null) {
        let userData =  ({name : results.data.name , bio: `No Bio Created Yet`})
        return res.json(userData)
    } else {
        let userData = ({name : results.data.name, bio: results.data.bio})
        return res.json(userData)
    }
    }   catch (err) {
        next(err);
      }
    });

    // let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));
    // res.send(out);
    
    
 


app.use(function(err , req , res , next) {
    let status = err.status || 404;
    let message = err.message;
    return res.status(status).json({
      error: {message , status}
    })
  })

app.listen(3000, () => {
    console.log('running on port 3000')
});


// const express = require('express');
// let axios = require('axios');
// var app = express();

// app.post('/', function(req, res, next) {
//   try {
//     let results = req.body.developers.map(async d => {
//       return await axios.get(`https://api.github.com/users/${d}`);
//     });
//     let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

//     return res.send(JSON.stringify(out));
//   } catch {
//     next(err);
//   }
// });

// app.listen(3000);
