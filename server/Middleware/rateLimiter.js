const rateLimit = require('express-rate-limit');


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5, 
  message: 'Too many requests. Please try again after a minute.',
});

module.exports = limiter;
