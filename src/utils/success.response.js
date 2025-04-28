exports.createResponse = (res, message, data) => {
  return res.status(201).json({
    message: message,
    data: data,
    success: true,
  });
};

exports.successResponse = (res, message, add = {}) => {
  const response = {
    message: message,
    success: true,
  };
  Object.assign(response, add);
  return res.status(200).json(response);
};
