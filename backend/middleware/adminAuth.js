const adminAuth = (req, res, next) => {
  const role = req.user?.user_metadata?.role;

  if (role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Administrator access required.",
    });
  }

  next();
};

module.exports = adminAuth;