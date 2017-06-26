let Router = require('express').Router;
let passport = require('passport');
let logger = require('../logger');

router = new Router();

/*  "/login"
 *    POST: Log in the current user.
 */
router.post('/login',
    passport.authenticate('local'),
    function(req, res, next) {
        res.status(200).json(req.user);
    },
    function(err, req, res, next) {
        logger.error(err);
        res.status(401).json();
  });


/*  "/login"
 *    POST: logs out the user who is making this request.
 */
router.post('/logout', (req, res) => {
   req.logout();
   res.status(200).json();
});

module.exports = router;
