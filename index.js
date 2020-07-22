// Module imports
const http = require("http");
const search = require("./src/search");

// Constants
const server = http.createServer();
const listOpts = {
  port: 8080,
  host: "localhost"
};
const htmlContent = {"Content-Type": "text/html"};
const preheader = `<!DOCTYPE html><html lang="en"><title>`;
const postheader = `</title><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /><style>* {text-align: center;}table{margin:1em auto;}th,td{padding:0.5em;}table,th,td{border:1px solid black;border-collapse:collapse;}input[type=number]{border: 0; border-bottom: 1px solid black;width:60px;}</style></head><body><h1>KCentra Calculator</h1>`;
const sort = {
  byScore: (a, b) => {return b.score - a.score;},
  byVCount: (a, b) => {return a.vCount - b.vCount;},
  byDiff: (a, b) => {return Math.abs(a.diff) - Math.abs(b.diff);}
};

const theForm = (targetForm, sort) => {
  let form = `<form action="" method="GET"><div><label for="target">Ordered dose:</label></div><div><input type="number" name="target" id="target" value="`;
  switch (typeof targetForm) {
    case "number":
    form = (targetForm >= 500 && targetForm <= 5000) ? `${form}${targetForm}` : `${form}500`;
    break;
    case "string":
    form = (isNaN(targetForm)) ? `${form}500` : `${form}${targetForm}`;
    break;
    default:
    form = `${form}500`;
    break;
  }
  if (typeof sort !== "string") {sort = "score";}
  form = `${form}" /> units</div><div><em>Ordered dose must be between 500 units and 5,000 units.</em></div><div>Sort by:</div><div><input type="radio" id="sortScore" name="sort" value="score" ${(sort==="score")?'checked="true" ':''}/> <label for="sortScore">score (internal)</label></div><div><input type="radio" id="sortVCount" name="sort" value="vCount" ${(sort==="vCount")?'checked="true" ':''}/><label for="sortVCount"> vial count</label></div><div><input type="radio" id="sortDiff" name="sort" value="diff" ${(sort==="diff")?'checked="true" ':''}/> <label for="sortDiff">difference</label></div><div><input type="submit" value="Search" /></div></form>`;
  return form;
};

// Server events handling
server.on('request', (req, res) => {
  let url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === "GET" && url.pathname === "/") {
    // Shouldn't be receiving any requests that aren't method GET nor any urls other than "/" or "/?..."
    const searchParams = url.searchParams;
    console.log(`[Request received: ${req.method} ${req.url}]`);
    res.writeHead(200, htmlContent);
    if (searchParams.has("target")) {
      // "target" parameter sent, show results as well as the form
      var sResults;
      var reqNumber = parseInt(searchParams.get("target"));
      var sortBy = searchParams.get("sort");
      try {
        sResults = search(reqNumber);
      } catch (err) {
        console.log(`There was an error processing your request:\n${err.name}: ${err.message}`);
        res.end(`${preheader}KCentra Calculator${postheader}${theForm()}</body></html>`);
        return;
      }
/*      let sortVC, sortDiff, sortScore;
      sortVC = sortDiff = sortScore = "";
      switch (sortBy) {
        case "vCount":
        sortVC = `checked="true" `;
        sResults.sort(sort.byVCount);
        break;
        case "diff":
        sortDiff = `checked="true" `;
        sResults.sort(sort.byDiff);
        break;
        case "score":
        default:
        sortScore = `checked="true" `;
        sResults.sort(sort.byScore);
        break;
      }*/
      var tResults = `<table><thead><tr><th>Units to use:</th><th>Result Sum</th><th>Difference from Ordered dose</th></tr></thead><tbody>`;
      for (let i = 0, sl = sResults.length; i < sl; i++) {
        let sru = JSON.parse(JSON.stringify(sResults[i].units));
        let ul = sru.length;
        let sum = sResults[i].sum;
        let diff = sResults[i].diff;
        let sign = (diff < 0) ? "-" : "+";
        tResults = `${tResults}<tr><td>`;
        for (let j = 0; j < ul; j++) {
          tResults = `${tResults}${sru[j].base} (${sru[j].quantity})`;
          if ((j + 1) < ul) {
            tResults = `${tResults}<br />`;
          }
        }
        tResults = `${tResults}</td><td>${sum}</td><td>${sign}${Math.abs(diff)} (${sign}${(Math.abs(diff/reqNumber) * 100).toFixed(2)}%)</td></tr>`;
      }
      tResults = `${tResults}</tbody></table>`;
      /*<div>Sort by:<ul><li><label for="sortScore"><input type="radio" id="sortScore" name="sort" value="score" checked="true" /> score (internal)</label></li><li><label for="sortVCount"><input type="radio" id="sortVCount" name="sort" value="vCount" /> vial count</label></li><li><label for="sortDiff"><input type="radio" id="sortDiff" name="sort" value="diff" /> difference</label></li></ul></div>*/
      res.end(`${preheader}KCentra Calculator Results${postheader}${theForm(reqNumber, sortBy)}${tResults}</body></html>`);
    } else {
      // plain request sent, show just the form
      res.end(`${preheader}KCentra Calculator${postheader}${theForm()}</body></html>`);
      return;
    }
  } else {
    res.writeHead(404, htmlContent);
    res.end(`${preheader}404${postheader}404: Resource Not Found</body></html>`);
    return;
  }
});

server.listen(listOpts, () => {
  let d = new Date();
  let dY = d.getFullYear();
  let dM = d.getMonth(); if (dM < 10) {dM = `0${dM}`;}
  let dD = d.getDate(); if (dD < 10) {dD = `0${dD}`;}
  let dh = d.getHours(); if (dh < 10) {dh = `0${dh}`;}
  let dm = d.getMinutes(); if (dm < 10) {dm = `0${dm}`;}
  let ds = d.getSeconds(); if (ds < 10) {ds = `0${ds}`;}
  let dout = `${dY}.${dM}.${dD}.${dh}.${dm}.${ds}`;
  console.log(`${dout}: Server listening on ${listOpts.host}:${listOpts.port}`);
});
