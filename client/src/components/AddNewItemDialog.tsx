import React from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

export type NewItem = {
  name: string
  link: string
  category: string
  quantity: string
}


type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (item: NewItem) => void
}

const getEmptyForm = (): NewItem => ({
  name: "",
  link: "",
  category: "",
  quantity: "",
})

export const AddNewItemDialog = (props: Props) => {
  const [form, setValue] = React.useState<NewItem>(getEmptyForm)
  const submit = () => {
    props.onSubmit(form)
    setValue(getEmptyForm())
  }

  const isValid = !!form.name && !!form.quantity

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Lägg till det du saknar!</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Namn"
          fullWidth
          placeholder="t.ex. kvarg"
          value={form.name}
          onChange={(e) => setValue((s) => ({ ...s, name: e.target.value }))}
        />
        <TextField
          margin="dense"
          label="Länk"
          fullWidth
          placeholder="mat.se/kvarg"
          value={form.link}
          onChange={(e) => setValue((s) => ({ ...s, link: e.target.value }))}
        />
        <TextField
          margin="dense"
          fullWidth
          label="Kategori"
          placeholder="t.ex. frukost"
          value={form.category}
          onChange={(e) =>
            setValue((s) => ({ ...s, category: e.target.value }))
          }
        />
        <TextField
          margin="dense"
          label="Antal"
          fullWidth
          placeholder="t.ex. 2 st"
          value={form.quantity}
          onChange={(e) =>
            setValue((s) => ({ ...s, quantity: e.target.value }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Avbryt</Button>
        <Button
          variant="contained"
          onClick={submit}
          disabled={!isValid}
          color="primary"
        >
          Lägg till
        </Button>
      </DialogActions>
    </Dialog>
  )
}
