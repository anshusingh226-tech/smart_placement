const placementOfficerAuth = (req, res, next) => {
  const role = req.user?.user_metadata?.role;

  if (role !== "placement-officer") {
    return res.status(403).json({
      success: false,
      message: "Placement Officer access required.",
    });
  }

  next();
};

module.exports = placementOfficerAuth;