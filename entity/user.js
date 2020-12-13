module.exports = {
    name: 'users',
    columns: {
        user_id: {
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