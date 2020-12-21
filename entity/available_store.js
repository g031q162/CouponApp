module.exports = {
    name: 'available_stores',
    columns: {
        as_id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        coupon_id: {
            type: 'int',
        },
        store_id: {
            type: 'int',
        },
    },
};