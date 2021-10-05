// middleware function for erros
export default errorMiddleware = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.status(statusCode || 500).json({
    success: false,
    errors: [
      {
        msg: message
      }
    ]
  })
};

