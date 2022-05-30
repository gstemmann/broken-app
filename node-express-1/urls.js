const fs = require('fs');
const process = require('process');
const axios = require('axios')

//this will write to a file if one is given with --out flag

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        console.error(`couldn't write out ${out}: ${err}`);
        process.exit(1)
      }
    })
  }
    else {
      console.log(text)
    }
  }

//this will get names of URLs

function getURL(path) {
 fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
      } else {
        handleOutput(data, out);
      }
 })
}

//this will get stuff at the url and print that out

async function writeWhatsOnURL(url) {
  try {
    let resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path;
let out;

// if flag --out is used, argv 3 and 4 are redefined to fit
// the handOutput function
if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4]
} else {
  path = process.argv[2]
}

//check if path is at and http (minnimal url validation)
if (path.slice(0,4) === 'http') {
  writeWhatsOnURL(path)
} else {
  getURL(path)
}


// fs.writeFile('yahoo.com', url, function(err, data) {
//   if (err) {
//     console.error(`Error reading ${path}: ${err}`);
//     process.exit(1);
//   } else {
//     console.log(data)
//   }
// })