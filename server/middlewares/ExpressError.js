const errorHandler =(err,req,res,next)=>{
    console.error("Error occurred:", err.stack);
    console.error("Request details:", {
        method: req.method,
        path: req.path,
        origin: req.get('Origin'),
        body: req.body
    });
    
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    
    // Ensure CORS headers are set even on error
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    res.status(statusCode).json({
        error:{
            message,
            status: statusCode
        }
    })
}
module.exports = errorHandler