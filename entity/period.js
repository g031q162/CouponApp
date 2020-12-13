module.exports = {
    name: 'period',
    columns: {
        period_id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        user_id: {
            type: 'int',
        },
        coupon_id: {
            type: 'int',
        },
        number: {
            type: 'int',
        },
        expire_date: {
            type: 'date'
        },
        used: {
            type: 'int'
        },
    },
};