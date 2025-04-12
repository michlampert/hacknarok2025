import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import RuneIcon, { RuneType } from './RuneIcon';

export interface MenuOption {
  id: string;
  rune: RuneType;
  text: string;
  color: string;
}

interface CircularMenuProps {
  isVisible: boolean;
  onToggle: (visible: boolean) => void;
  position: { x: number; y: number };
  onOptionSelect: (optionId: string) => void;
  options: MenuOption[];
  distance?: number;
  optionHeight?: number;
  optionWidth?: number;
  startAngle?: number;
}

const CircularMenu: React.FC<CircularMenuProps> = ({
  isVisible,
  onToggle,
  position,
  onOptionSelect,
  options,
  distance = 150,
  optionHeight = 40,
  optionWidth = 120,
  startAngle = -Math.PI / 2,
}) => {
  const scale = useRef(new Animated.Value(0)).current;
  const positions = useRef(options.map(() => new Animated.ValueXY({ x: 0, y: 0 }))).current;

  useEffect(() => {
    if (isVisible) {
      options.forEach((_, index) => {
        const { x, y } = getOptionPosition(index, options.length);
        Animated.spring(positions[index], {
          toValue: { x, y },
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }).start();
      });
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {

      options.forEach((_, index) => {
        Animated.spring(positions[index], {
          toValue: { x: 0, y: 0 },
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }).start();
      });
      Animated.spring(scale, {
        toValue: 0,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const getOptionPosition = (index: number, total: number) => {
    const angleStep = (2 * Math.PI) / total;
    const angle = startAngle + (index * angleStep);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return { x, y };
  };

  if (!isVisible && scale.__getValue() === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          left: position.x,
          top: position.y,
          width: 2 * distance,
          height: 2 * distance,
          transform: [
            { translateX: -distance },
            { translateY: -distance },
          ],
        },
      ]}
    >
      {options.map((option, index) => (
        <Animated.View
          key={option.id}
          style={[
            {
              position: 'absolute',
              width: optionWidth,
              height: optionHeight * 2.5,
              left: distance - optionWidth / 2,
              top: distance - (optionHeight * 2.5) / 2,
              transform: [
                { translateX: positions[index].x },
                { translateY: positions[index].y },
                { scale },
              ],
              opacity: scale,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              onOptionSelect(option.id);
              onToggle(false);
            }}
          >
            <View style={styles.optionContent}>
              <View style={[styles.runeCircle, { backgroundColor: option.color }]}>
                <RuneIcon rune={option.rune} size={optionHeight} color="#ffffff" />
              </View>
              <View style={[styles.textPill, { borderColor: option.color }]}>
                <Text style={[styles.optionText, { color: option.color }]}>
                  {option.text}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  optionButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  runeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -20,
  },
  textPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  optionText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CircularMenu;
