import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface DamageFormProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (amount: number) => void;
}

export default function DamageForm({
  open,
  handleClose,
  onSubmit,
}: DamageFormProps) {
  const [amount, setAmount] = React.useState(0);

  React.useEffect(() => {
    setAmount(0);
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(amount);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Damage Character</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit} id="damage-form">
          <TextField
            autoFocus
            required
            margin="dense"
            id="damage-amount"
            name="damage-amount"
            label="Damage Amount"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={handleChange}
            inputProps={{ min: 1 }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="damage-form">
          Damage
        </Button>
      </DialogActions>
    </Dialog>
  );
}
