import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { Character, CharacterStatus } from "../types/character";

export const STATUS_COLORS: Record<CharacterStatus, string> = {
  Alive: "#55cc44",
  Dead: "#d63d2e",
  unknown: "#9e9e9e",
};

type Props = {
  character: Character;
};

export default function CharacterItem({ character }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.navigate("/character/" + character.id);
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={handlePress} >
        <Image source={{ uri: character.image }} style={styles.image} />
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.dot,
              { backgroundColor: STATUS_COLORS[character.status] },
            ]}
          />
          <Text style={styles.status}>
            {character.status} – {character.species}
          </Text>
        </View>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.value}>{character.gender}</Text>
        <Text style={styles.label}>Origin</Text>
        <Text style={styles.value} numberOfLines={1}>
          {character.origin.name}
        </Text>
        <Text style={styles.label}>Last known location</Text>
        <Text style={styles.value} numberOfLines={1}>
          {character.location.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#3c3e44",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: 140,
    height: 180,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 6,
  },
  status: {
    color: "#fff",
    fontSize: 14,
  },
  label: {
    color: "#9e9e9e",
    fontSize: 12,
  },
  value: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
});
