import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import type { Character } from "../types/Character";

interface CharacterFormProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (character: Omit<Character, "id">) => void;
  edit?: boolean;
  character?: Character;
  onDelete?: () => void;
  onDuplicate?: (character: Omit<Character, "id">) => void;
}

export default function CharacterForm({
  open,
  handleClose,
  handleSubmit,
  edit = false,
  character,
  onDelete,
  onDuplicate,
}: CharacterFormProps) {
  const handleDuplicate = () => {
    if (onDuplicate && character) {
      const { id, ...rest } = character;
      onDuplicate(rest);
      handleClose();
    }
  };

  const [form, setForm] = React.useState<Omit<Character, "id">>({
    name: character?.name || "",
    maxHp: character?.maxHp || 0,
    currentHp: character?.currentHp || 0,
    tempHp: character?.tempHp || 0,
    ac: character?.ac || 0,
    initiative: character?.initiative || 0,
    link: character?.link || "",
    dead: character?.dead || false,
    color: character?.color || "#ffffff",
  });

  React.useEffect(() => {
    setForm({
      name: character?.name || "",
      maxHp: character?.maxHp || 0,
      currentHp: character?.currentHp || 0,
      tempHp: character?.tempHp || 0,
      ac: character?.ac || 0,
      initiative: character?.initiative || 0,
      link: character?.link || "",
      dead: character?.dead || false,
      color: character?.color || "#ffffff",
    });
  }, [character, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({
      ...form,
      maxHp: Number(form.maxHp),
      currentHp: Number(form.currentHp),
      tempHp: Number(form.tempHp),
      ac: Number(form.ac),
      initiative: Number(form.initiative),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: 4 } }}
      data-testid="character-form-dialog"
    >
      <DialogTitle data-testid="character-form-title">
        {edit ? "Edit Character" : "Create Character"}
      </DialogTitle>

      <DialogContent>
        <form
          onSubmit={onSubmit}
          id="character-form"
          data-testid="character-form"
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={form.name}
              onChange={handleChange}
              inputProps={{ "data-testid": "input-name" }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <label
                htmlFor="color"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <span>Color</span>
                <span
                  data-testid="color-preview"
                  style={{
                    display: "inline-block",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: form.color,
                    border: "2px solid #ccc",
                  }}
                />
                <input
                  id="color"
                  name="color"
                  type="color"
                  value={form.color}
                  onChange={handleChange}
                  data-testid="input-color"
                  style={{
                    opacity: 0,
                    width: 32,
                    height: 32,
                    position: "absolute",
                    pointerEvents: "auto",
                  }}
                  tabIndex={-1}
                />
              </label>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <TextField
              required
              margin="dense"
              id="currentHp"
              name="currentHp"
              label="Current HP"
              type="number"
              fullWidth
              variant="standard"
              value={form.currentHp}
              onChange={handleChange}
              inputProps={{ min: 0, "data-testid": "input-currentHp" }}
            />
            <TextField
              margin="dense"
              id="tempHp"
              name="tempHp"
              label="Temp HP"
              type="number"
              fullWidth
              variant="standard"
              value={form.tempHp}
              onChange={handleChange}
              inputProps={{ min: 0, "data-testid": "input-tempHp" }}
            />
            <TextField
              required
              margin="dense"
              id="maxHp"
              name="maxHp"
              label="Max HP"
              type="number"
              fullWidth
              variant="standard"
              value={form.maxHp}
              onChange={handleChange}
              inputProps={{ min: 0, "data-testid": "input-maxHp" }}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <TextField
              required
              margin="dense"
              id="ac"
              name="ac"
              label="Armor Class (AC)"
              type="number"
              fullWidth
              variant="standard"
              value={form.ac}
              onChange={handleChange}
              inputProps={{ min: 0, "data-testid": "input-ac" }}
            />
            <TextField
              required
              margin="dense"
              id="initiative"
              name="initiative"
              label="Initiative"
              type="number"
              fullWidth
              variant="standard"
              value={form.initiative}
              onChange={handleChange}
              inputProps={{ min: 0, "data-testid": "input-initiative" }}
            />
          </div>

          <TextField
            margin="dense"
            id="link"
            name="link"
            label="Link (optional)"
            type="url"
            fullWidth
            variant="standard"
            value={form.link}
            onChange={handleChange}
            inputProps={{ "data-testid": "input-link" }}
          />

          {edit && (
            <FormControlLabel
              data-testid="input-dead-wrapper"
              control={
                <Checkbox
                  checked={form.dead}
                  onChange={handleChange}
                  name="dead"
                  color="primary"
                  data-testid="input-dead"
                />
              }
              label="Dead"
            />
          )}
        </form>
      </DialogContent>

      <DialogActions>
        {edit && onDelete && (
          <Button data-testid="btn-delete" onClick={onDelete} color="error">
            Delete
          </Button>
        )}
        {edit && onDuplicate && (
          <Button data-testid="btn-duplicate" onClick={handleDuplicate}>
            Duplicate
          </Button>
        )}
        <Button data-testid="btn-cancel" onClick={handleClose}>
          Cancel
        </Button>
        <Button data-testid="btn-submit" type="submit" form="character-form">
          {edit ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
