const express = require('express');
const app = express();
const ExpressError = require("./expressError")
const axios = require('axios');

// app.use(express.json)
const base_url = `https://api.github.com/users/blue`




app.get('/', async function(req, res, next) {

    try {
        const result = await axios.get(base_url)
        console.log(result.data.name)
        console.log(result.data.bio)
        let outPut = result.data.bio
        // res.send(result.data.bio)
        res.send(JSON.stringify(outPut))
    } catch (err) {
        return next(err)
    }
    

    // try {
    //     const results = req.body.developer.map(async d=> {
    //         return await axios.get(`base_url`)
    //     })
    //     let outPut = results.map(r=> ({name: r.data.name, bio: r.data.bio}))
    // return red.send(JSON.stringify(outPut))
    // } catch (err) {
    //     return next(err)
    // }
})



// app.post('/', function(req, res) {

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



app.listen(3000, () => {
    console.log('running on port 3000')
});
