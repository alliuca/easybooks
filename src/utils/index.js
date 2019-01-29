export default {
  pad: (str, size = 5) => {
    var s = String(str);
    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  },
};
