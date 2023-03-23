// @ts-ignore
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
