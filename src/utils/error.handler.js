exports.handleError = (res, error) => {
  // if (error.message && error.message.includes("already exists")) {
  //   return res.status(409).json({
  //     success: false,
  //     error: error.message,
  //   });
  // }

  // if (error.message && error.message.includes("required")) {
  //   return res.status(400).json({
  //     success: false,
  //     error: error.message,
  //   });
  // }

  // if (error.name === "ValidationError") {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Invalid input data",
  //     error: error.message,
  //   });
  // }

  // if (error.name === "CastError") {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Invalid data format",
  //     error: error.message,
  //   });
  // }

  // if (error.message && error.message.includes("not found")) {
  //   return res.status(404).json({
  //     success: false,
  //     message: error.message,
  //     error: error.message,
  //   });
  // }

  // if (error.message && error.message.includes("unauthorized")) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "Unauthorized access",
  //     error: error.message,
  //   });
  // }

  const errorMessage = yupErrorFormatter(error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error: errorMessage
      ? errorMessage
      : error.message || "Something went wrong",
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
