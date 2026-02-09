import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Modal, Image, ScrollView } from 'react-native';
import { calcularNuevoMarcador } from '../logic/rules';
import { TEAMS } from '../data/teams';

const GameScreen = ({ route, navigation }) => {
  const { localIndex, visitorIndex } = route.params;
  const localTeam = TEAMS[localIndex];
  const visitorTeam = TEAMS[visitorIndex];

  const [localScore, setLocalScore] = useState(0);
  const [visitorScore, setVisitorScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  
  // Estado para los puntos de cada jugador
  const [playerPoints, setPlayerPoints] = useState({});

  const addPoints = (team, points, playerName) => {
    if (team === 'local') {
      setLocalScore(prev => calcularNuevoMarcador(prev, points));
    } else {
      setVisitorScore(prev => calcularNuevoMarcador(prev, points));
    }

    // Actualizamos los puntos individuales
    setPlayerPoints(prev => ({
      ...prev,
      [playerName]: (prev[playerName] || 0) + points
    }));
  };

  // Función para ordenar y obtener la lista de anotadores
  const getSortedPlayers = (players) => {
    return [...players]
      .map(name => ({ name, points: playerPoints[name] || 0 }))
      .sort((a, b) => b.points - a.points);
  };

  const renderPlayerItem = (player, teamType) => (
    <View style={styles.playerRow}>
      <Text style={styles.playerName}>• {player} ({playerPoints[player] || 0} pts)</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.scoreBtn} onPress={() => addPoints(teamType, 2, player)}>
          <Text style={styles.scoreBtnText}>+2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scoreBtn} onPress={() => addPoints(teamType, 3, player)}>
          <Text style={styles.scoreBtnText}>+3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabecera y Marcador */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← EXIT</Text>
      </TouchableOpacity>

      <View style={styles.scoreboard}>
        <View style={styles.teamScoreBox}>
          <Image source={localTeam.logo} style={styles.tinyLogo} resizeMode="contain" />
          <Text style={styles.scoreText}>{localScore.toString().padStart(2, '0')}</Text>
          <Text style={[styles.teamLabel, { color: localTeam.color }]}>{localTeam.name.toUpperCase()}</Text>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.teamScoreBox}>
          <Image source={visitorTeam.logo} style={styles.tinyLogo} resizeMode="contain" />
          <Text style={styles.scoreText}>{visitorScore.toString().padStart(2, '0')}</Text>
          <Text style={[styles.teamLabel, { color: visitorTeam.color }]}>{visitorTeam.name.toUpperCase()}</Text>
        </View>
      </View>

      {/* Listas de Juego */}
      <View style={styles.listsContainer}>
        <View style={styles.teamList}>
          <FlatList data={localTeam.players} keyExtractor={(item) => `l-${item}`} renderItem={({ item }) => renderPlayerItem(item, 'local')} />
        </View>
        <View style={[styles.teamList, { borderLeftWidth: 1, borderColor: '#333' }]}>
          <FlatList data={visitorTeam.players} keyExtractor={(item) => `v-${item}`} renderItem={({ item }) => renderPlayerItem(item, 'visitor')} />
        </View>
      </View>

      <TouchableOpacity style={styles.finishBtn} onPress={() => setGameEnded(true)}>
        <Text style={styles.finishText}>FINISH GAME</Text>
      </TouchableOpacity>

      {/* MODAL FINAL CON RANKING */}
      <Modal visible={gameEnded} animationType="slide">
        <SafeAreaView style={styles.winnerScreen}>
          <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
            <Text style={styles.victoryLabel}>{localScore === visitorScore ? "TIE GAME" : "VICTORY"}</Text>
            
            <Image 
              source={localScore >= visitorScore ? localTeam.logo : visitorTeam.logo} 
              style={styles.bigLogo} 
              resizeMode="contain"
            />

            <Text style={[styles.winnerName, { color: localScore >= visitorScore ? localTeam.color : visitorTeam.color }]}>
              {localScore >= visitorScore ? localTeam.name.toUpperCase() : visitorTeam.name.toUpperCase()}
            </Text>

            <Text style={styles.finalScore}>{localScore} - {visitorScore}</Text>

            {/* TABLA DE ANOTADORES */}
            <View style={styles.statsContainer}>
              <Text style={styles.statsTitle}>--- TOP SCORERS ---</Text>
              
              <View style={styles.statsTable}>
                {/* Columna Local */}
                <View style={styles.statColumn}>
                  <Text style={[styles.statTeamTitle, {color: localTeam.color}]}>{localTeam.name}</Text>
                  {getSortedPlayers(localTeam.players).map((p, i) => (
                    <Text key={i} style={styles.statPlayerText}>{p.name}: {p.points}</Text>
                  ))}
                </View>

                {/* Columna Visitante */}
                <View style={styles.statColumn}>
                  <Text style={[styles.statTeamTitle, {color: visitorTeam.color}]}>{visitorTeam.name}</Text>
                  {getSortedPlayers(visitorTeam.players).map((p, i) => (
                    <Text key={i} style={styles.statPlayerText}>{p.name}: {p.points}</Text>
                  ))}
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.exitBtn} onPress={() => navigation.popToTop()}>
              <Text style={styles.exitBtnText}>BACK TO MENU</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000814', padding: 15 },
  backText: { color: '#aaa', fontFamily: 'monospace', marginBottom: 10 },
  scoreboard: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 3, borderColor: '#fff', padding: 15, backgroundColor: '#001b7a' },
  teamScoreBox: { alignItems: 'center' },
  tinyLogo: { width: 45, height: 45, marginBottom: 5 },
  scoreText: { color: '#ffd700', fontSize: 42, fontFamily: 'monospace' },
  teamLabel: { fontSize: 12, fontFamily: 'monospace', fontWeight: 'bold' },
  vsText: { color: '#ff4444', fontSize: 20, fontFamily: 'monospace' },
  listsContainer: { flex: 1, flexDirection: 'row', marginTop: 20 },
  teamList: { flex: 1, paddingHorizontal: 5 },
  playerRow: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#222', paddingBottom: 5 },
  playerName: { color: '#fff', fontSize: 10, fontFamily: 'monospace', marginBottom: 5 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between' },
  scoreBtn: { borderWidth: 1, borderColor: '#ffd700', paddingHorizontal: 8, paddingVertical: 4 },
  scoreBtnText: { color: '#ffd700', fontSize: 12, fontFamily: 'monospace' },
  finishBtn: { backgroundColor: '#ff4444', padding: 15, marginTop: 10 },
  finishText: { color: '#fff', textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold' },
  winnerScreen: { flex: 1, backgroundColor: '#000814' },
  victoryLabel: { color: '#fff', fontSize: 24, fontFamily: 'monospace' },
  bigLogo: { width: 120, height: 120, marginVertical: 10 },
  winnerName: { fontSize: 40, fontFamily: 'monospace', fontWeight: 'bold', textAlign: 'center' },
  finalScore: { color: '#ffd700', fontSize: 30, fontFamily: 'monospace', marginBottom: 20 },
  
  // Estilos nuevos para las estadísticas
  statsContainer: { width: '95%', backgroundColor: '#001b7a', padding: 10, borderWidth: 2, borderColor: '#fff' },
  statsTitle: { color: '#ffd700', textAlign: 'center', fontFamily: 'monospace', marginBottom: 10, fontSize: 16 },
  statsTable: { flexDirection: 'row', justifyContent: 'space-between' },
  statColumn: { flex: 1, alignItems: 'center' },
  statTeamTitle: { fontFamily: 'monospace', fontWeight: 'bold', marginBottom: 5, fontSize: 12 },
  statPlayerText: { color: '#fff', fontFamily: 'monospace', fontSize: 10, marginVertical: 2 },
  
  exitBtn: { marginTop: 30, borderWidth: 2, borderColor: '#fff', padding: 15 },
  exitBtnText: { color: '#fff', fontFamily: 'monospace' }
});

export default GameScreen;