module.exports = {
    name: 'store',
    columns: {
        store_id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        store_name: {
            type: 'varchar',
            unique: true,
        },
        info: {
            type: 'varchar',
        },
        adress: {
            type: 'varchar',
        },
        location: {
            type: 'point'
        },
    },
};