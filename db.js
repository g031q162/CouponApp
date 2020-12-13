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
        require('./entity/available_store'),
        require('./entity/coupon'),
        require('./entity/period'),
        require('./entity/store'),
        require('./entity/user_test')
    ],
});
module.exports = connection;