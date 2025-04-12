import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert, View, Dimensions } from 'react-native';
import CircularMenu, { MenuOption } from './CircularMenu';

const CircularMenuExample: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  
  const menuOptions: MenuOption[] = [
    {
      id: 'attack',
      rune: 'tiwaz',
      text: 'Attack',
      color: '#c0392b',
    },
    {
      id: 'defend',
      rune: 'algiz',
      text: 'Defend',
      color: '#2980b9',
    },
    {
      id: 'heal',
      rune: 'berkanan',
      text: 'Heal',
      color: '#27ae60',
    },
    {
      id: 'magic',
      rune: 'kenaz',
      text: 'Magic',
      color: '#8e44ad',
    },
    {
      id: 'communicate',
      rune: 'ansuz',
      text: 'Talk',
      color: '#f39c12',
    },
    {
      id: 'gift',
      rune: 'gebo',
      text: 'Gift',
      color: '#16a085',
    },
    {
      id: 'journey',
      rune: 'raidho',
      text: 'Move',
      color: '#d35400',
    },
    {
      id: 'success',
      rune: 'sowilo',
      text: 'Enhance',
      color: '#f1c40f',
    },
  ];
  
  // Handle the action when a menu option is selected
  const handleOptionSelect = (optionId: string) => {
    Alert.alert('Action Selected', `You selected: ${optionId}`);
    
    // Here you would call your API endpoint based on the selected option
    // Example:
    // fetch('your-api-endpoint', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ action: optionId }),
    // });
  };

  const handleBackgroundClick = (event: any) => {
    if (menuVisible) {
      setMenuVisible(false);
      return;
    }
    
    const { pageX, pageY } = event.nativeEvent;
    
    // Adjust position to ensure menu stays within screen bounds
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    // This is the exact position where the user tapped
    // We no longer need to adjust for centering since the menu container
    // is designed to be positioned at exactly the tap point
    setMenuPosition({ x: pageX, y: pageY });
    setMenuVisible(true);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={1}
      onPress={handleBackgroundClick}
    >
      
      <CircularMenu
        isVisible={menuVisible}
        onToggle={setMenuVisible}
        position={menuPosition}
        onOptionSelect={handleOptionSelect}
        options={menuOptions}
        distance={120}  // Adjusted distance for better visual appearance
        optionHeight={45}
        optionWidth={140}  // Made slightly wider for better text display
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  }
});

export default CircularMenuExample; 