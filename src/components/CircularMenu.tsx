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
  startAngle = -Math.PI / 2, // Start from top (12 o'clock position)
}) => {
  const scale = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.spring(scale, {
      toValue: isVisible ? 1 : 0,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const getOptionPosition = (index: number, total: number) => {
    // Calculate angle with equal distribution and specified starting point
    // Using startAngle (default: -Math.PI/2) ensures the first item is at the top (12 o'clock)
    // and items are distributed clockwise around the circle
    const angleStep = (2 * Math.PI) / total;
    const angle = startAngle + (index * angleStep);
    
    // Calculate position using angle
    // Using cos for x and sin for y creates a proper circular distribution
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return { x, y };
  };

  if (!isVisible) {
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
  {options.map((option, index) => {
    const { x, y } = getOptionPosition(index, options.length);

    return (
      <Animated.View
        key={option.id}
        style={[
          styles.option,
          {
            position: 'absolute',
            width: optionWidth,
            height: optionHeight,
            left: distance + x - optionWidth / 2,
            top: distance + y - optionHeight / 2,
            borderRadius: optionHeight / 2,
            backgroundColor: '#ffffff',
            borderColor: option.color,
            borderWidth: 1,
            transform: [{ scale }],
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
            <View style={[styles.runeContainer, { backgroundColor: option.color }]}>
              <RuneIcon rune={option.rune} size={optionHeight * 0.6} color="#ffffff" />
            </View>
            <Text style={[styles.optionText, { color: option.color }]}>
              {option.text}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  })}
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
  option: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  optionButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  runeContainer: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 10,
  },
});

export default CircularMenu;
