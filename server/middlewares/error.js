const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Interval Server Error";

  err.statusCode ||= 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

const TryCatch = (passedFuntion) => async (req, res, next) => {
  try {
    await passedFuntion(req, res, next);
  } catch (error) {
    next(error);
  }
};

export { errorMiddleware, TryCatch };
