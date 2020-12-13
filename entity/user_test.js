module.exports = {
    name: 'users_test',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        username: {
            type: 'varchar',
            unique: true,
        },
        password: {
            type: 'varchar'
        },
    },
};