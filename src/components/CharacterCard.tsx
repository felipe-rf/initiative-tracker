import { Avatar, Button, Container } from "@mui/material";
import type { Character } from "../types/Character";
import { IconEdit, IconPlus, IconSkull, IconSword } from "@tabler/icons-react";

function getInitials(name: string): string {
  if (!name.trim()) return "";

  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return (first + last).toUpperCase();
}

export default function CharacterCard({
  character,
  onUpdate,
  onHeal,
  onDamage,
}: {
  character: Character;
  onUpdate: () => void;
  onHeal: () => void;
  onDamage: () => void;
}) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        gap: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        justifyContent: "space-between",
        flexWrap: "wrap",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flex: "1 1 160px",
          minWidth: 0,
          maxWidth: 240,
        }}
      >
        {character.link ? (
          <button
            onClick={() =>
              window.open(character.link, "_blank", "noopener,noreferrer")
            }
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            title={character.link}
          >
            <Avatar sx={{ bgcolor: character.color, boxShadow: 2 }}>
              {character.dead ? (
                <IconSkull />
              ) : (
                <p>{getInitials(character.name)}</p>
              )}
            </Avatar>
            <h2 style={{ margin: 0 }}>{character.name}</h2>
          </button>
        ) : (
          <>
            <Avatar sx={{ bgcolor: character.color, boxShadow: 2 }}>
              {character.dead ? (
                <IconSkull />
              ) : (
                <p>{getInitials(character.name)}</p>
              )}
            </Avatar>
            <h2 style={{ margin: 0 }}>{character.name}</h2>
          </>
        )}
        <p style={{ color: "gray" }}>{character.initiative}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flex: "2 1 200px",
          minWidth: 0,
          maxWidth: 320,
        }}
      >
        <p>
          HP: {character.currentHp}
          {character.tempHp ? ` + ${character.tempHp}` : ""} / {character.maxHp}
        </p>
        <p>AC: {character.ac}</p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flex: "0 0 120px",
          minWidth: 0,
          maxWidth: 180,
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: "lightgreen" }}
          onClick={onHeal}
        >
          <IconPlus />
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={onDamage}
        >
          <IconSword />
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "gray" }}
          onClick={onUpdate}
        >
          <IconEdit />
        </Button>
      </div>
    </Container>
  );
}
