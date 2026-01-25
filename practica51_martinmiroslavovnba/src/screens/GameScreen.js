import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const GameScreen = ({ route, navigation }) => {
  const { localTeam, visitorTeam } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← EXIT</Text>
      </TouchableOpacity>

      <View style={styles.scoreboard}>
        <View style={styles.teamScore}>
          <Text style={styles.score}>00</Text>
          <Text style={[styles.teamLabel, { color: localTeam.color }]}>
            {localTeam.name.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.teamScore}>
          <Text style={styles.score}>00</Text>
          <Text style={[styles.teamLabel, { color: visitorTeam.color }]}>
            {visitorTeam.name.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.center}>
        <Text style={styles.ready}>READY!</Text>
        <Text style={styles.arena}>{localTeam.city.toUpperCase()} ARENA</Text>
      </View>

      <TouchableOpacity style={styles.tipBtn}>
        <Text style={styles.tipText}>TIP-OFF</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000814',
    padding: 20,
  },
  backText: {
    color: '#aaa',
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  scoreboard: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'space-around',
    padding: 20,
  },
  teamScore: {
    alignItems: 'center',
  },
  score: {
    color: '#ffd700',
    fontSize: 48,
    fontFamily: 'monospace',
  },
  teamLabel: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  vs: {
    color: '#ff4444',
    fontFamily: 'monospace',
    fontSize: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ready: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 28,
  },
  arena: {
    color: '#777',
    fontFamily: 'monospace',
  },
  tipBtn: {
    borderWidth: 3,
    borderColor: '#ffd700',
    padding: 12,
  },
  tipText: {
    color: '#ffd700',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});

export default GameScreen;
