


/*
 * Fetch and decode configuration
 */

export default function loadConfig(path) {
  let promise = new Promise((resolve, reject) => {
      fetch(path).then((res) => {
        res.json().then((config) => {
          resolve(config);
        })
        .catch((err) => {
          reject(err);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

  return promise;
}



