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

  // based on https://github.com/nashdot/accounting-js/blob/master/lib/unformat.js
  unformatNumber: (value: string, decimal: Intl.NumberFormatPart['value']) => {
    if (typeof value === 'number') return value;

    const regex = new RegExp('[^0-9-(-)-' + decimal + ']', 'g');
    const unformattedValueString = ('' + value)
      .replace(regex, '') // strip out any junk
      .replace(decimal, '.'); // make sure decimal point is standard

    return parseFloat(unformattedValueString);
  },
};
