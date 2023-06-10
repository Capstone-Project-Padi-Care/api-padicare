export const apiKey = (req, res, next) => {
  const apiKey = req.headers["api-key"];

  if (apiKey && apiKey === process.env.API_KEY) {
    return next();
  }
  return res.status(401).json({
    error: true,
    message: "Unauthorized",
  });
};
