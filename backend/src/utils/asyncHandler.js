const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => {
          if (res.headersSent) {
              console.error('Headers already sent:', err);
              return;
          }
          if (typeof next === 'function') {
              next(err);
          } else {
              console.error(err);
              res.status(500).send('Internal Server Error');
          }
      });
  };
};

export { asyncHandler };