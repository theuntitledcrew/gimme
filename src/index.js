require('dotenv').config();
const BaseClient = require('./Structures/BaseClient');
const clientConfig = require('../clientConfig');
const t = process.env.TOKEN;
const p = process.env.PREFIX;
const id = process.env.OWNER_ID;

const client = new BaseClient(clientConfig(t, p));
client.start();