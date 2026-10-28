exports.getIndex = (req, res) => {
  res.render('index', { session: req.session });
};