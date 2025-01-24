export function handleError(error: any): string {
  if (error.networkError) {
    return "Network error occurred.";
  }

  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return error.graphQLErrors[0].message || "An error occurred.";
  }

  if (error.response && error.response.data?.message) {
    return error.response.data.message;
  }

  return "An unexpected error occurred. Please try again.";
}
