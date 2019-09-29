exports.internalServerErrorHandler = (error, req, res) => {
    console.log(error.message);
    res.status(500).json({
        message: "Internal Server Error"
    });
};

exports.unauthorizedErrorHandler = (req, res) => {
    res.status(401).json({
        message: "Unauthorized"
    });
};

exports.globalErrorHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    });
};
