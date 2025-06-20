class ApiResponse {
    constructor(statusCode, message = "Success", success, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.success = typeof success === "boolean" ? success : statusCode < 400;
        this.data = data;
    }
}
export { ApiResponse };
