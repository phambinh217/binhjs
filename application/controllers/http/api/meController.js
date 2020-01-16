'use strict';

module.exports = {
    async showInfo (req, res) {
        return res.json({
            status: 'success',
            user: {
                id: req.auth.user.id,
                email: req.auth.user.email
            }
        });
    },
}
