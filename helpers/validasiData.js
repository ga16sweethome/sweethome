module.exports = {
  validasi: (data, query) => {
    let x = 0;
    for (let i = 0; i < data.length; i++) {
      if (
        data.length != query.length ||
        data.id[i] === null ||
        data.id[i] === undefined
      ) {
        x = 1;
        return x;
      }
    }
    return x;
  },
};
