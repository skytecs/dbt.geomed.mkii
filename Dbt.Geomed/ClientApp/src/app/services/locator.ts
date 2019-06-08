export class Locator
{
  getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position.coords);
      }, (err) => {
        reject(err);
      });
    });
}
}
