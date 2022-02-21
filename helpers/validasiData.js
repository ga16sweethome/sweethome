module.exports = {
  validasiData: (data, query) => {
    //validasi length data untuk bulkcreate dan query
    if (data.length != query.length) return false;
    for (let i = 0; i < data.length; i++) {
      if (
        data.length != query.length ||
        data[i] === null ||
        data[i] === undefined
      ) {
        return false;
      }
    }
    return true;
  },
};
