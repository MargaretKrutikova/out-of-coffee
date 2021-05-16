const baseUrl = process.env.REACT_APP_API_CONFIRMATION_URL as string

const getConfirmationApiUrl = (orderId: number) =>
  `/notification/order/${orderId}/send-confirmation`

export type ConfirmationResult =
  | { kind: "success" }
  | { kind: "error"; error: string }

export const sendConfirmation = async (
  orderId: number
): Promise<ConfirmationResult> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }
  try {
    const response = await fetch(getConfirmationApiUrl(orderId), requestOptions)

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json")

    const data = isJson && (await response.json())
    if (!response.ok) {
      // get error message from body or default to response status
      const error = (data && data.message) || response.status
      return { kind: "error", error }
    }
    return { kind: "success" }
  } catch (e) {
    console.log(e)
    return { kind: "error", error: e.toString() }
  }
}
