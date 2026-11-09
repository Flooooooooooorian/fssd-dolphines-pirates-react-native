import { Character, CharacterResponse } from "@/types/character";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CharacterItem from "../../components/CharacterItem";

const API_URL = "https://rickandmortyapi.com/api/character";

export default function Gallery() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data: CharacterResponse = await response.json();
        setCharacters(data.results);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, []);

  return (
    <View>
      {loading === true ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#97ce4c" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>Could not load characters: {error}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {characters.map((character) => (
            <CharacterItem key={character.id} character={character} />
          ))}
        </ScrollView>
      )}
    </View>
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
  list: {
    padding: 16,
  },
});
