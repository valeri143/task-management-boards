class HttpError extends Error {
    status: number;
  
    constructor(status: number, message: string) {
      super(message); 
      this.status = status;
      Object.setPrototypeOf(this, HttpError.prototype);
    }
  }
  

const errorMessageList: Record<number, string>  = {
    400 : "Bad Request",
    401 : "Unauthorized", 
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict"
}

export const createHttpError = (status: number, message: string = errorMessageList[status]): HttpError => {
    return new HttpError(status, message);
  }
