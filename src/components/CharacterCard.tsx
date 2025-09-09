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
        gap: { xs: 1.2, sm: 2 },
        borderRadius: 4,
        p: { xs: 1, sm: 2 },
        justifyContent: { xs: "flex-start", sm: "space-between" },
        flexWrap: { xs: "nowrap", sm: "wrap" },
        minWidth: 0,
        boxShadow: { xs: 1, sm: 2 },
        maxWidth: { xs: "100%", sm: 600, md: 800 },
        width: "100%",
        backgroundColor: "secondary.main",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flex: 1,
          minWidth: 0,
          maxWidth: "100%",
          width: "100%",
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
            <Avatar
              sx={{
                bgcolor: character.color,
                boxShadow: 2,
                width: { xs: 36, sm: 48 },
                height: { xs: 36, sm: 48 },
                fontSize: { xs: 18, sm: 24 },
              }}
            >
              {character.dead ? (
                <IconSkull size={22} />
              ) : (
                <span style={{ fontWeight: 600 }}>
                  {getInitials(character.name)}
                </span>
              )}
            </Avatar>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(1.1rem, 4vw, 1.3rem)",
                fontWeight: 600,
                wordBreak: "break-word",
              }}
            >
              {character.name}
            </h2>
          </button>
        ) : (
          <>
            <Avatar
              sx={{
                bgcolor: character.color,
                boxShadow: 2,
                width: { xs: 36, sm: 48 },
                height: { xs: 36, sm: 48 },
                fontSize: { xs: 18, sm: 24 },
              }}
            >
              {character.dead ? (
                <IconSkull size={22} />
              ) : (
                <span style={{ fontWeight: 600 }}>
                  {getInitials(character.name)}
                </span>
              )}
            </Avatar>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(1.1rem, 4vw, 1.3rem)",
                fontWeight: 600,
                wordBreak: "break-word",
              }}
            >
              {character.name}
            </h2>
          </>
        )}
        <p
          style={{
            color: "gray",
            fontSize: "clamp(1rem, 3vw, 1.1rem)",
            margin: 0,
            fontWeight: 500,
          }}
        >
          {character.initiative}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flex: 1,
          minWidth: 0,
          maxWidth: "100%",
          width: "100%",
          flexWrap: "wrap",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <p
          style={{
            fontSize: "clamp(0.95rem, 3vw, 1.1rem)",
            margin: 0,
            fontWeight: 500,
          }}
        >
          HP: <span style={{ fontWeight: 700 }}>{character.currentHp}</span>
          {character.tempHp ? (
            <span style={{ color: "#1976d2", fontWeight: 700 }}>
              {" "}
              + {character.tempHp}
            </span>
          ) : null}
          <span style={{ color: "#888" }}> / {character.maxHp}</span>
        </p>
        <p
          style={{
            fontSize: "clamp(0.95rem, 3vw, 1.1rem)",
            margin: 0,
            fontWeight: 500,
          }}
        >
          AC: <span style={{ fontWeight: 700 }}>{character.ac}</span>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          flex: 1,
          minWidth: 0,
          maxWidth: "100%",
          width: "100%",
          justifyContent: "flex-end",
          marginTop: 4,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#69B578",
            minWidth: { xs: 32, sm: 40 },
            minHeight: { xs: 32, sm: 40 },
            p: 0,
            fontSize: { xs: 18, sm: 22 },
            borderRadius: 1.5,
          }}
          onClick={onHeal}
        >
          <IconPlus size={20} />
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#D76C6C",
            minWidth: { xs: 32, sm: 40 },
            minHeight: { xs: 32, sm: 40 },
            p: 0,
            fontSize: { xs: 18, sm: 22 },
            borderRadius: 1.5,
          }}
          onClick={onDamage}
        >
          <IconSword size={20} />
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "gray",
            minWidth: { xs: 32, sm: 40 },
            minHeight: { xs: 32, sm: 40 },
            p: 0,
            fontSize: { xs: 18, sm: 22 },
            borderRadius: 1.5,
          }}
          onClick={onUpdate}
        >
          <IconEdit size={20} />
        </Button>
      </div>
    </Container>
  );
}
