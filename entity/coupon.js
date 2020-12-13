module.exports = {
    name: 'coupon',
    columns: {
        coupon_id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        coupon_name: {
            type: 'varchar',
            unique: true,
        },
        effect: {
            type: 'varchar',
        },
    },
};