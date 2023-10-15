export const verification = (req, res, next) => {
  console.log(req.session.userid);
  console.log("starting verification");
  try {
    if (req.session.userid) {
      console.log("verified");
      next();
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};