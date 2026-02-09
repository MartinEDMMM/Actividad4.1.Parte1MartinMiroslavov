import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native';
import { TEAMS } from '../data/teams';

const SelectionScreen = ({ navigation }) => {
  const [localIndex, setLocalIndex] = useState(0);
  const [visitorIndex, setVisitorIndex] = useState(1);

  const cycleTeam = (index, setIndex) => {
    setIndex((index + 1) % TEAMS.length);
  };

  const localTeam = TEAMS[localIndex];
  const visitorTeam = TEAMS[visitorIndex];

  const renderPlayer = ({ item }) => (
    <Text style={styles.playerText}>• {item}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PLAYER SELECT</Text>

      <View style={styles.selectionArea}>
        {/* LOCAL */}
        <View style={styles.teamBox}>
          <Text style={styles.playerLabel}>PLAYER 1</Text>

          <View style={[styles.logoBox, { borderColor: localTeam.color }]}>
            {/* LOGOTIPO LOCAL */}
            <Image 
              source={localTeam.logo} 
              style={styles.imageLogo} 
              resizeMode="contain" 
            />
            <Text style={[styles.teamName, { color: localTeam.color }]}>
              {localTeam.city.toUpperCase()}
            </Text>
            <Text style={styles.teamSub}>{localTeam.name.toUpperCase()}</Text>
          </View>

          <FlatList
            data={localTeam.players}
            renderItem={renderPlayer}
            keyExtractor={(item) => `local-${item}`}
            style={styles.playerList}
          />

          <TouchableOpacity
            style={styles.changeBtn}
            onPress={() => cycleTeam(localIndex, setLocalIndex)}
          >
            <Text style={styles.btnText}>CHANGE</Text>
          </TouchableOpacity>
        </View>

        {/* VISITOR */}
        <View style={styles.teamBox}>
          <Text style={styles.playerLabel}>PLAYER 2</Text>

          <View style={[styles.logoBox, { borderColor: visitorTeam.color }]}>
            {/* LOGOTIPO VISITANTE */}
            <Image 
              source={visitorTeam.logo} 
              style={styles.imageLogo} 
              resizeMode="contain" 
            />
            <Text style={[styles.teamName, { color: visitorTeam.color }]}>
              {visitorTeam.city.toUpperCase()}
            </Text>
            <Text style={styles.teamSub}>{visitorTeam.name.toUpperCase()}</Text>
          </View>

          <FlatList
            data={visitorTeam.players}
            renderItem={renderPlayer}
            keyExtractor={(item) => `visitor-${item}`}
            style={styles.playerList}
          />

          <TouchableOpacity
            style={styles.changeBtn}
            onPress={() => cycleTeam(visitorIndex, setVisitorIndex)}
          >
            <Text style={styles.btnText}>CHANGE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
      style={styles.playBtn}
      // Pasamos solo los índices, no los objetos con las fotos
      onPress={() => navigation.navigate('Game', { 
        localIndex: localIndex, 
        visitorIndex: visitorIndex 
      })}
    >
      <Text style={styles.playText}>SPACE BAR TO CONTINUE</Text>
    </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001b7a',
    paddingTop: 30,
  },
  title: {
    color: '#ffd700',
    fontSize: 22,
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 2,
  },
  selectionArea: {
    flexDirection: 'row',
    flex: 1,
  },
  teamBox: {
    flex: 1,
    margin: 8,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#0033cc',
    padding: 10,
  },
  playerLabel: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'monospace',
    marginBottom: 5,
  },
  logoBox: {
    borderWidth: 3,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    minHeight: 140, // Espacio suficiente para imagen y texto
    justifyContent: 'center',
  },
  imageLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 14,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  teamSub: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 12,
  },
  playerList: {
    maxHeight: 150, // Limita la lista para que no empuje el botón de cambio fuera de pantalla
  },
  playerText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'monospace',
    marginVertical: 2,
  },
  changeBtn: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#ffd700',
    padding: 6,
  },
  btnText: {
    color: '#ffd700',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  playBtn: {
    borderWidth: 3,
    borderColor: '#fff',
    margin: 15,
    padding: 10,
  },
  playText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});

export default SelectionScreen;