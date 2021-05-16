/* Load html.js module which returns the html content as needed */
const html = require("./src/html");

const htmlContent = { "Content-Type": "text/html" };
const server = require("http").createServer();
const listOpts = {
  host: "localhost",
  port: 8080,
};
const fourOhFour = (response, message) => {
  console.warn(message);
  response.statusCode = 404;
  return response.end();
};
server
  .on("request", (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (url.pathname === "/favicon.ico") {
      response.statusCode = 200;
      return response.end();
    }
    if (request.method !== "GET") {
      return fourOhFour(
        response,
        `Requests other than 'GET' are blocked. (${request.method})`
      );
    }
    if (url.pathname !== "/") {
      return fourOhFour(
        response,
        `Requests for url pathnames other than '/' are blocked. (${url.pathname})`
      );
    }
    const searchParams = url.searchParams;
    console.log(`[Request received: ${request.method} ${url}]`);
    response.writeHead(200, htmlContent);
    if (!searchParams.has("target")) {
      return response.end(html("KCentra Calculator"));
    }
    const target = parseInt(searchParams.get("target"));
    return response.end(html("KCentra Calculator Results", target));
  })
  .listen(listOpts, () => {
    let d = new Date();
    let dY = d.getFullYear();
    let dM = d.getMonth();
    let dD = d.getDate();
    let dh = d.getHours();
    let dm = d.getMinutes();
    let ds = d.getSeconds();
    let dout = `${dY}.${dM.toString().padStart(2, "0")}.${dD
      .toString()
      .padStart(2, "0")}.${dh.toString().padStart(2, "0")}.${dm
      .toString()
      .padStart(2, "0")}.${ds
      .toString()
      .padStart(2, "0")}: Server listening on ${listOpts.host}:${
      listOpts.port
    }`;
    console.log(dout);
    return dout;
  });
