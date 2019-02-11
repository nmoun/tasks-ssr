
var cacheImages = {};

function importAll(r){
  r.keys().forEach(key => cacheImages[key] = r(key));
}

importAll(require.context('../assets/', true, /\.svg$/));

export default cacheImages;