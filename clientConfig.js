const clientConfig = (t, p, id) => JSON.parse(`{"token":"${t}", "prefix":"${p} ", "owners":["${id}"]}`)
module.exports = clientConfig;