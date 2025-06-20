class ApiResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: any;
  constructor(
    statusCode: number,
    message: string = "Success",
    success: boolean,
    data: any
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = typeof success === "boolean" ? success : statusCode < 400;
    this.data = data;
  }
}

export { ApiResponse };