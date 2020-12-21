require('dotenv').config();
const typeorm = require('typeorm');
const EntitySchema = typeorm.EntitySchema;
const connection = typeorm.createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'postgres',
    database: 'myapp',
    logging: true,
    synchronize: false,
    entities: [
        new EntitySchema(require('./entity/user')),
        new EntitySchema(require('./entity/available_store')),
        new EntitySchema(require('./entity/coupon')),
        new EntitySchema(require('./entity/period')),
        new EntitySchema(require('./entity/store')),
        new EntitySchema(require('./entity/user_test'))
    ],
});
module.exports = connection;