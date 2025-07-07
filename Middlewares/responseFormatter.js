module.exports = (req, res, next) => {
    // Overwrite res.json to enforce consistent format
    res.success = (message, data = {}) => {
      return res.status(200).json({
        status: "success",
        message: message,
        data: data
      });
    };
  
    res.fail = (message, error = null) => {
      return res.status(400).json({
        status: "fail",
        message: message,
        error: error || null
      });
    };
  
    res.error = (message, error = null) => {
      return res.status(500).json({
        status: "error",
        message: message,
        error: error || null
      });
    };
  
    next();
  };
  