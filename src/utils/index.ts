export default {
  pad: (str: string | number, size = 5) => {
    var s = String(str);
    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  },

  stall: async (stallTime = 3000) => {
    await new Promise(resolve => setTimeout(resolve, stallTime));
  },
};
