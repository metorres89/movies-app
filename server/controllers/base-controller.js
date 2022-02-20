class BaseController {
    constructor(){}

    buildJsonResponse(res, statusCode, error, data) {
        if(error)
            return res.status(statusCode).json({ success: false, error: error, data: data });
        return res.status(statusCode).json({ success: true, data: data });
    }

    responseFromServiceResult(res, serviceResult) {
        if(!serviceResult.success)
            return this.buildJsonResponse(res, 404, serviceResult.error, serviceResult.data);
        return this.buildJsonResponse(res, 200, null, serviceResult.data);
    }

    errorResponse(res, error) {
        return this.buildJsonResponse(res, 500, error, null);
    }

    badRequestResponse(res, error) {
        return this.buildJsonResponse(res, 400, error, null);
    }
}

module.exports = BaseController;