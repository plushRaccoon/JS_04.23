Array.prototype.customFilter = function (cb, obj) {
  let result = [];
  this.forEach((item, idx, arr) => {
    if (cb.call(obj, item, idx, arr)) {
      result.push(item);
    }
  });
  return result;
};
