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

function selectFromInterval(arr, start, end) {
  if (
    arguments.length < 3 ||
    !Array.isArray(arr) ||
    arr.length === 0 ||
    typeof start !== 'number' ||
    (isNaN(start) && !isFinite(start)) ||
    typeof end !== 'number' ||
    (isNaN(end) && !isFinite(end))
  ) {
    throw new Error();
  } else {
    let nonValid = arr.some(
      (i) => typeof i !== 'number' || isNaN(i) || !isFinite(i)
    );
    if (nonValid) {
      throw new Error();
    } else {
      return arr.filter((num) => {
        if (start > end) {
          return num >= end && num <= start;
        } else {
          return num >= start && num <= end;
        }
      });
    }
  }
}

function isNaN(num) {
  return Number.isNaN(num);
}

function isFinite(num) {
  return Number.isFinite(num);
}

function createIterable(from, to) {
  if (
    !from ||
    !to ||
    typeof from !== 'number' ||
    typeof to !== 'number' ||
    to <= from
  ) {
    throw new Error();
  } else {
    return {
      from,
      to,
      [Symbol.iterator]() {
        return {
          current: this.from,
          last: this.to,

          next() {
            if (this.current <= this.last) {
              return { done: false, value: this.current++ };
            } else {
              return { done: true };
            }
          },
        };
      },
    };
  }
}
