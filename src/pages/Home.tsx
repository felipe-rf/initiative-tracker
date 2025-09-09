import React from "react";
import { Button, Container, Stack } from "@mui/material";
import type { Character } from "../types/Character";

import CharacterForm from "../components/CharacterForm";
import HealForm from "../components/HealForm";
import DamageForm from "../components/DamageForm";
import CharacterCard from "../components/CharacterCard";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "initiative-tracker-characters";

export default function Home() {
  const [characters, setCharacters] = React.useState<Character[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Character[];
      } catch {
        return [];
      }
    }
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  }, [characters]);
  const [formOpen, setFormOpen] = React.useState(false);
  const [editCharacter, setEditCharacter] = React.useState<
    Character | undefined
  >(undefined);

  const [healOpen, setHealOpen] = React.useState(false);
  const [damageOpen, setDamageOpen] = React.useState(false);

  const sortCharacters = () => {
    setCharacters((prev) =>
      [...prev].sort((a, b) => b.initiative - a.initiative)
    );
  };

  const handleDelete = (id: number) => {
    setCharacters((prev) => prev.filter((char) => char.id !== id));
    setFormOpen(false);
    setEditCharacter(undefined);
    sortCharacters();
  };

  const handleUpdateCharacter = (updatedCharacter: Character) => {
    setCharacters((prev) =>
      prev.map((char) =>
        char.id === updatedCharacter.id
          ? { ...char, ...updatedCharacter }
          : char
      )
    );
    setFormOpen(false);
    setEditCharacter(undefined);
    sortCharacters();
  };

  const handleCreateCharacter = (newCharacter: Omit<Character, "id">) => {
    const nextId = Math.max(0, ...characters.map((c) => c.id)) + 1;
    setCharacters((prev) => [...prev, { ...newCharacter, id: nextId }]);
    setFormOpen(false);
    setEditCharacter(undefined);
    sortCharacters();
  };

  const handleEditClick = (character: Character) => {
    setEditCharacter(character);
    setFormOpen(true);
  };

  const handleAddClick = () => {
    setEditCharacter(undefined);
    setFormOpen(true);
  };

  const handleHeal = (character: Character) => {
    setEditCharacter(character);
    setHealOpen(true);
  };

  const handleDamage = (character: Character) => {
    setEditCharacter(character);
    setDamageOpen(true);
  };
  const calculateDamage = (character: Character, amount: number) => {
    let tempHp = character.tempHp;
    let currentHp = character.currentHp;
    let damageLeft = amount;

    if (tempHp > 0) {
      if (tempHp >= damageLeft) {
        tempHp -= damageLeft;
        damageLeft = 0;
      } else {
        damageLeft -= tempHp;
        tempHp = 0;
      }
    }
    currentHp = Math.max(currentHp - damageLeft, 0);

    setCharacters((prev) =>
      prev.map((char) =>
        char.id === character.id
          ? {
              ...char,
              tempHp,
              currentHp,
              dead: currentHp <= 0 ? true : char.dead,
            }
          : char
      )
    );
  };

  return (
    <Container>
      <h1>Initiative Tracker</h1>
      <div
        style={{
          marginBottom: 20,
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          gap: 8,
        }}
      >
        <p>Made by</p>
        <a href="https://github.com/felipe-rf">Felipe Ferreira</a>
      </div>

      <Stack spacing={2}>
        <AnimatePresence>
          {characters.map((character) => (
            <motion.div key={character.id} layout>
              <CharacterCard
                key={character.id}
                character={character}
                onUpdate={() => handleEditClick(character)}
                onHeal={() => handleHeal(character)}
                onDamage={() => handleDamage(character)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginBottom: 16, marginTop: 16 }}
      >
        Add Character
      </Button>
      <CharacterForm
        open={formOpen}
        handleClose={() => {
          setFormOpen(false);
          setEditCharacter(undefined);
        }}
        handleSubmit={
          editCharacter
            ? (data) => handleUpdateCharacter({ ...editCharacter, ...data })
            : handleCreateCharacter
        }
        edit={!!editCharacter}
        character={editCharacter}
        onDelete={
          editCharacter ? () => handleDelete(editCharacter.id) : undefined
        }
      />
      <HealForm
        open={healOpen}
        handleClose={() => {
          setHealOpen(false);
          setEditCharacter(undefined);
        }}
        onSubmit={(amount, tempAmount) => {
          if (editCharacter) {
            handleUpdateCharacter({
              ...editCharacter,
              currentHp: Math.min(
                editCharacter.currentHp + amount,
                editCharacter.maxHp
              ),
              dead:
                Math.min(
                  editCharacter.currentHp + amount,
                  editCharacter.maxHp
                ) <= 0
                  ? true
                  : editCharacter.dead,
              tempHp: Math.min(
                editCharacter.tempHp + tempAmount,
                editCharacter.maxHp
              ),
            });
          }
          setHealOpen(false);
          setEditCharacter(undefined);
        }}
      />
      <DamageForm
        open={damageOpen}
        handleClose={() => {
          setDamageOpen(false);
          setEditCharacter(undefined);
        }}
        onSubmit={(amount) => {
          if (editCharacter) {
            calculateDamage(editCharacter, amount);
          }
          setDamageOpen(false);
          setEditCharacter(undefined);
        }}
      />
    </Container>
  );
}
