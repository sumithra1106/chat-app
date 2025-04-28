exports.handleError = (res, error) => {
  const errorMessage = yupErrorFormatter(error);
  return res.status(500).json({
    success: false,
    // message: "Internal server error",
    error: errorMessage
      ? errorMessage
      : error.message || "Internal server error",
  });
};

const yupErrorFormatter = (err) => {
  if (err.inner && err.inner.length > 0) {
    const formattedErrors = {};
    err.inner.forEach((e) => {
      if (!formattedErrors[e.path]) {
        formattedErrors[e.path] = e.message;
      }
    });
    return formattedErrors;
  }
  return { error: err.message };
};
