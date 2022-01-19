
// function to raise asyncrouness  error when happen 
// and forward error to the global error handler
// 
exports.asyncHandler = (cb) => {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        
        next(error);
      }
    };
  };
