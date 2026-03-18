const extractUserId = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(400).json({ error: 'Missing x-user-id header' });
  }
  req.userId = parseInt(userId, 10);
  next();
};

module.exports = extractUserId;
