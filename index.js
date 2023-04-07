function makeDeepCopy(data) {
  if (!data || typeof data !== 'object') {
    throw new Error();
  }

  return makeClone(data);

  function makeClone(object) {
    let clone = Object.assign({}, object);
    for (let key of Object.keys(clone)) {
      if (object[key] instanceof Map) {
        clone[key] = new Map([...object[key]]);
        object[key].forEach((val, k) => {
          if (typeof val === 'object') {
            clone[key].set(k, makeClone(val));
          }
        });
      } else if (typeof object[key] === 'object') {
        clone[key] = makeClone(object[key]);
      } else {
        clone[key] = object[key];
      }
    }

    if (Array.isArray(object)) {
      clone.length = object.length;
      return Array.from(clone);
    }

    return clone;
  }
}
