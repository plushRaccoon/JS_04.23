Array.prototype.customFilter = function (cb, obj) {
  let result = [];
  this.forEach((item, idx, arr) => {
    if (cb.call(obj, item, idx, arr)) {
      result.push(item);
    }
  });
  return result;
};

function createDebounceFunction(cb, timeout) {
  let timer;
  return (...args) => {
    console.log(args);
    clearTimeout(timer);
    timer = setTimeout(() => cb.apply(this, args), timeout);
  };
}
