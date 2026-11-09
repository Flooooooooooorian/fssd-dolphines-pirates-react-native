import { Character } from "@/types/character";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { STATUS_COLORS } from "../../components/CharacterItem";

const API_URL = "https://rickandmortyapi.com/api/character";

export default function CharacterDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCharacter() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data: Character = await response.json();
        if (!cancelled) setCharacter(data);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCharacter();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#97ce4c" />
      </View>
    );
  }

  if (error || !character) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          Could not load character: {error ?? "Not found"}
        </Text>
      </View>
    );
  }

  const rows: [string, string][] = [
    ["Species", character.species],
    ["Type", character.type || "–"],
    ["Gender", character.gender],
    ["Origin", character.origin.name],
    ["Last known location", character.location.name],
    ["Episodes", String(character.episode.length)],
    ["Created", new Date(character.created).toLocaleDateString()],
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: character.name }} />
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <View style={styles.statusRow}>
        <View
          style={[
            styles.dot,
            { backgroundColor: STATUS_COLORS[character.status] },
          ]}
        />
        <Text style={styles.status}>{character.status}</Text>
      </View>

      <View style={styles.card}>
        {rows.map(([label, value]) => (
          <View key={label} style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  error: {
    color: "#d63d2e",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: 240,
    height: 240,
    borderRadius: 120,
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  status: {
    fontSize: 16,
  },
  card: {
    alignSelf: "stretch",
    backgroundColor: "#3c3e44",
    borderRadius: 12,
    padding: 16,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    color: "#9e9e9e",
    fontSize: 12,
  },
  value: {
    color: "#fff",
    fontSize: 16,
  },
});
