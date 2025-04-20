exports.createResponse = (res, message, data) => {
  return res.status(201).json({
    message: message,
    data: data,
    success: true,
  });
};

exports.successResponse = (res, message, data) => {
  const response = {
    message: message,
    success: true,
  };
  if (data !== undefined) {
    response.data = data;
  }
  return res.status(200).json(response);
};


