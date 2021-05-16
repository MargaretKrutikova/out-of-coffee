import Alert from "@material-ui/lab/Alert"

import { ConfirmationResult } from "../api/confirmationApi"

type Props = {
  state: ConfirmationResultState
}

export type ConfirmationResultState =
  | { kind: "idle" }
  | { kind: "loading"; orderId: number }
  | { kind: "done"; result: ConfirmationResult }

export const ConfirmationResultStatus = ({ state }: Props) => {
  if (state.kind === "idle") return null
  if (state.kind === "loading")
    return <Alert severity="info">Sending confirmation</Alert>

  return state.result.kind === "error" ? (
    <Alert severity="error">{state.result.error}</Alert>
  ) : (
    <Alert severity="success">Confirmation sent</Alert>
  )
}
