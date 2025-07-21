// utils/getErrorMessage.ts

export function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as any).data === "object"
  ) {
    const data = (error as any).data

    if (typeof data.error === "string") {
      return data.error
    }

    if (typeof data.message === "string") {
      return data.message
    }

    if (Array.isArray(data.errors)) {
      return data.errors.join(", ")
    }

    if (typeof data === "string") {
      return data
    }
  }

  if (typeof error === "string") {
    return error
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Unknown error occurred"
}
