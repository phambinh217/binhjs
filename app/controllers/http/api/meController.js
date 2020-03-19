'use strict';

exports.showInfo = async function (req, res) {
    return res.json({
        status: 'success',
        user: {
            id: req.auth.user.id,
            email: req.auth.user.email
        }
    });
}
