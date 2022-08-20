module.exports = (request, response) => {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    if (body) {
      request.body = JSON.parse(body);
    }
  });
};
