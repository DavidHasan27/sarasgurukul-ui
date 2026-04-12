/**
 * Builds a user-facing message from axios/network errors and API JSON bodies
 * (e.g. { message, errorCode, statusCode, statusName }).
 */
export function getApiErrorMessage(error: unknown): string {
  if (error == null) {
    return "Something went wrong. Please try again.";
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  const err = error as {
    message?: string;
    response?: {
      status?: number;
      data?: {
        message?: string;
        error?: string;
        errorCode?: string;
        status?: number;
        statusCode?: number;
      };
    };
    code?: string;
  };

  const data = err.response?.data;
  if (data && typeof data === "object") {
    const msg = data.message;
    if (typeof msg === "string" && msg.trim()) {
      return msg;
    }
    if (typeof data.error === "string" && data.error.trim()) {
      return data.error;
    }
  }

  const status = err.response?.status ?? data?.statusCode ?? data?.status;

  if (!err.response) {
    if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
      return "Request timed out. Please try again.";
    }
    if (err.message === "Network Error") {
      return "Network error. Please check your connection and try again.";
    }
    return "Unable to reach the server. Please check your connection.";
  }

  if (status === 401) {
    return "Your session has expired. Please sign in again.";
  }
  if (status === 403) {
    return "You do not have permission to perform this action.";
  }
  if (status === 404) {
    return "The requested resource was not found.";
  }
  if (status != null && status >= 500) {
    return "Server error. Please try again later.";
  }

  if (typeof err.message === "string" && err.message.trim()) {
    return err.message;
  }

  return "Something went wrong. Please try again.";
}
