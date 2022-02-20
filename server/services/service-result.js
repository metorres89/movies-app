class ServiceResult {
    constructor(success, error, data) {
        this.success = success;
        this.error = error;
        this.data = data;
    }
}

module.exports = ServiceResult;