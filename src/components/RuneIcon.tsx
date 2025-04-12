import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

// Define the available rune symbols
export type RuneType =
  | 'fehu'     // wealth
  | 'uruz'     // strength
  | 'thurisaz' // protection
  | 'ansuz'    // communication
  | 'raidho'   // journey
  | 'kenaz'    // knowledge
  | 'gebo'     // gift
  | 'wunjo'    // joy
  | 'hagalaz'  // disruption
  | 'nauthiz'  // need
  | 'isa'      // challenge
  | 'jera'     // harvest
  | 'eihwaz'   // defense
  | 'perthro'  // mystery
  | 'algiz'    // protection
  | 'sowilo'   // success
  | 'tiwaz'    // honor
  | 'berkanan' // growth
  | 'ehwaz'    // progress
  | 'mannaz'   // humanity
  | 'laguz'    // flow
  | 'ingwaz'   // fertility
  | 'dagaz'    // breakthrough
  | 'othala';  // heritage

interface RuneIconProps {
  rune: RuneType;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

/**
 * A component to display rune symbols
 * As a fallback, this uses text representation, but could be replaced with custom font or SVG
 */
const RuneIcon: React.FC<RuneIconProps> = ({
  rune,
  size = 24,
  color = '#000000',
  style,
}) => {
  const runeSymbols: Record<RuneType, string> = {
    fehu: 'ᚠ',
    uruz: 'ᚢ',
    thurisaz: 'ᚦ',
    ansuz: 'ᚨ',
    raidho: 'ᚱ',
    kenaz: 'ᚲ',
    gebo: 'ᚷ',
    wunjo: 'ᚹ',
    hagalaz: 'ᚺ',
    nauthiz: 'ᚾ',
    isa: 'ᛁ',
    jera: 'ᛃ',
    eihwaz: 'ᛇ',
    perthro: 'ᛈ',
    algiz: 'ᛉ',
    sowilo: 'ᛊ',
    tiwaz: 'ᛏ',
    berkanan: 'ᛒ',
    ehwaz: 'ᛖ',
    mannaz: 'ᛗ',
    laguz: 'ᛚ',
    ingwaz: 'ᛜ',
    dagaz: 'ᛞ',
    othala: 'ᛟ',
  };

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Text style={[styles.runeText, { fontSize: size, color }]}>
        {runeSymbols[rune]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  runeText: {
    fontWeight: 'bold',
    marginTop: -10,
  },
});

export default RuneIcon; 