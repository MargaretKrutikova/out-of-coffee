import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"

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
  if (state.kind === "loading") return <CircularProgress size={20} />

  return state.result.kind === "error" ? (
    <Typography variant="subtitle1">{state.result.error}</Typography>
  ) : (
    <Typography>Confirmation sent</Typography>
  )
}
