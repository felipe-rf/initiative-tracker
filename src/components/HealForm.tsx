import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface HealFormProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (amount: number, tempAmount: number) => void;
}

export default function HealForm({
  open,
  handleClose,
  onSubmit,
}: HealFormProps) {
  const [amount, setAmount] = React.useState(0);
  const [tempAmount, setTempAmount] = React.useState(0);

  React.useEffect(() => {
    setAmount(0);
    setTempAmount(0);
  }, [open]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(amount, tempAmount);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: 4 } }}
      data-testid="heal-form-dialog"
    >
      <DialogTitle data-testid="heal-form-title">Heal Character</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleFormSubmit}
          id="heal-form"
          data-testid="heal-form"
        >
          <TextField
            autoFocus
            required
            margin="dense"
            id="heal-amount"
            name="heal-amount"
            label="Heal Amount"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            inputProps={{ min: 0 }}
            data-testid="input-heal-amount"
          />
          <TextField
            margin="dense"
            id="heal-temp-amount"
            name="heal-temp-amount"
            label="Temporary Heal Amount"
            type="number"
            fullWidth
            variant="standard"
            value={tempAmount}
            onChange={(e) => setTempAmount(Number(e.target.value))}
            inputProps={{ min: 0 }}
            data-testid="input-temp-heal-amount"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} data-testid="btn-cancel-heal">
          Cancel
        </Button>
        <Button type="submit" form="heal-form" data-testid="btn-submit-heal">
          Heal
        </Button>
      </DialogActions>
    </Dialog>
  );
}
