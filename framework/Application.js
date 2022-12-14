const http = require("http");
const EventEmitter = require("events");

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createSever();
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(
          this._getRouteMask(path, method),
          (request, response) => {
            const handler = endpoint[method];
            handler(request, response);
          }
        );
      });
    });
  }

  _createSever() {
    return http.createServer((request, response) => {
      this.middlewares.forEach((middleware) => middleware(request, response));

      request.on("end", () => {
        const emitted = this.emitter.emit(
          this._getRouteMask(request.pathname, request.method),
          request,
          response
        );

        if (!emitted) {
          response.end(`По запросу ${request.url} ничего не найдено`);
        }
      });
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
};
