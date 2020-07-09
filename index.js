// Module imports
const http = require("http");
const search = require("./src/search");

// Constants
const server = http.createServer();
const listOpts = {
  port: 12368,
  host: "localhost"
};
const htmlContent = {"Content-Type": "text/html"};
const preheader = `<!DOCTYPE html><html lang="en"><title>`;
const postheader = `</title><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /><style>* {text-align: center;}table{margin:1em auto;}th,td{padding:0.5em;}table,th,td{border:1px solid black;border-collapse:collapse;}</style></head><body>`;
const theForm = `<form action="" method="GET"><div><label for="target">Target:</label></div><div><input type="number" name="target" id="target" value="500" /></div><div><input type="submit" value="Search" /></div></form>`;

// Variables
var reqNum = 0;

// Server events handling
server.on('request', (req, res) => {
  let url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === "GET" && url.pathname === "/") {
    // Shouldn't be receiving any requests that aren't method GET nor any urls other than "/" or "/?..."
    reqNum++;
    const searchParams = url.searchParams;
    console.log(`[Request #${reqNum} received: ${req.method} ${req.url}]`);
    res.writeHead(200, htmlContent);
    if (searchParams.has("target")) {
      // "target" parameter sent, show results as well as the form
      var sResults;
      var reqNumber = parseInt(searchParams.get("target"));
      try {
        sResults = search(reqNumber);
      } catch (err) {
        console.log(`There was an error processing your request: ${err}`);
        res.end(`${preheader}KCentra Calculator${postheader}${theForm}</body></html>`);
        return;
      }
      var tResults = `<table><thead><tr><th>Units to use:</th><th>Result Sum</th><th>Difference from Target</th><th>Score</th></tr></thead><tbody>`;
      for (let i = 0, sl = sResults.length; i < sl; i++) {
        let ul = sResults[i].units.length;
        let sum = sResults[i].sum;
        let diff = sum - reqNumber;
        let sign = (diff < 0) ? "-" : "+";
        tResults = `${tResults}<tr><td>`;
        for (let j = 0; j < ul; j++) {
          tResults = `${tResults}${sResults[i].units[j].base} x${sResults[i].units[j].quantity}`;
          if ((j + 1) < ul) {
            tResults = `${tResults}<br />`;
          }
        }
        tResults = `${tResults}</td><td>${sum}</td><td>${sign}${Math.abs(diff)} (${sign}${(Math.abs(diff/reqNumber) * 100).toFixed(2)}%)</td><td>[not yet available]</td></tr>`;
      }
      tResults = `${tResults}</tbody></table>`;
      res.end(`${preheader}KCentra Calculator Results${postheader}<form action="" method="GET"><div><label for="target">Target:</label></div><div><input type="number" name="target" id="target" value="${reqNumber}" /></div><div><input type="submit" value="Search" /></div></form>${tResults}</body></html>`);
    } else {
      // plain request sent, show just the form
      res.end(`${preheader}KCentra Calculator${postheader}${theForm}</body></html>`);
      return;
    }
  } else {
    res.writeHead(404, htmlContent);
    res.end(`${preheader}404${postheader}404: Resource Not Found</body></html>`);
    return;
  }
/*  var requestBody = "";
  req.on("data", data => {
    requestBody += data;
    if (requestBody.length > 1e7) {
      res.writeHead(413, "Request Entity Too Large", htmlContent);
      res.end(`${preheader}413${postheader}413: Request Entity Too Large</body></html>`);
      return;
    }
  });
  req.on("end", () => {
    var formData = querystring.parse(requestBody), reqNumber = parseInt(formData.target), sResults;
    try {
      sResults = search(reqNumber);
    } catch (err) {
      console.log(`There was an error thrown by the search() module: ${err}`);
      res.writeHead(200, htmlContent);
      res.end(`There was an error. Please check the console for more information.`);
      return;
    }
    var tResults = `<table><thead><tr><th>Units to use:</th><th>Result Sum</th><th>Difference from Target</th><th>Score</th></tr></thead><tbody>`;
    for (let i = 0, sl = sResults.length; i < sl; i++) {
      let ul = sResults[i].units.length;
      let sum = sResults[i].sum;
      let diff = sum - reqNumber;
      let sign = (diff < 0) ? "-" : "+";
      tResults = `${tResults}<tr><td>`;
      for (let j = 0; j < ul; j++) {
        tResults = `${tResults}${sResults[i].units[j].base} x${sResults[i].units[j].quantity}`;
        if ((j + 1) < ul) {
          tResults = `${tResults}<br />`;
        }
      }
      tResults = `${tResults}</td><td>${sum}</td><td>${sign}${Math.abs(diff)} (${sign}${(Math.abs(diff/reqNumber) * 100).toFixed(2)}%)</td><td>[not yet available]</td></tr>`;
    }
    tResults = `${tResults}</tbody></table>`;

    res.writeHead(200, htmlContent);
    res.end(`${preheader}KCentra Calculator Results${postheader}<form action="" method="GET"><div><label for="target">Target:</label></div><div><input type="number" name="target" id="target" value="${formData.target}" /></div><div><input type="submit" value="Search" /></div></form>${tResults}</body></html>`);
    return;
  });

  res.writeHead(200, htmlContent);
  res.end(`${preheader}KCentra Calculator${postheader}${theForm}</body></html>`);
  */
});

server.listen(listOpts, () => console.log(`Server listening on ${listOpts.host}:${listOpts.port}`));
