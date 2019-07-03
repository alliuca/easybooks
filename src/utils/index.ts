export default {
  pad: (str: string | number, size = 5) => {
    var s = String(str);
    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  },
};
