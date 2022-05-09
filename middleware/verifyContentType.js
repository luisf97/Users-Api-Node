function verifyContentType (req, res, next) {
    const type = req.headers['content-type'];
    if(type === 'application/json') return next()
    return res.status(415).json({ status: 415, error: 'Unsupported Media Type', message: 'A api só aceita tipos application/json', path: req.originalUrl})
}

module.exports = verifyContentType;