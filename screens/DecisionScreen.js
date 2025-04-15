import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DecisionTimeScreen from './DecisionTimeScreen';
import WhoIsGoingScreen from './WhoIsGoingScreen';
import RestaurantChoiceScreen from './RestaurantChoiceScreen';
import EnjoyYourMealScreen from './EnjoyYourMealScreen';

const DecisionScreen = () => {
  // Screen state management
  const [currentScreen, setCurrentScreen] = useState('decisionTime'); // decisionTime, whoIsGoing, restaurantChoice, enjoyYourMeal

  // Data state management
  const [participants, setParticipants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Handle tap on the decision time screen
  const handleDecisionTimeContinue = () => {
    setCurrentScreen('whoIsGoing');
  };

  // Handle selection of participants
  const handleParticipantsSelected = (selectedPeople) => {
    setParticipants(selectedPeople);
    setCurrentScreen('restaurantChoice');
  };

  // Handle completion of voting process
  const handleVotingComplete = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentScreen('enjoyYourMeal');
  };

  // Handle restart from the enjoy meal screen
  const handleRestart = () => {
    setCurrentScreen('decisionTime');
    setParticipants([]);
    setSelectedRestaurant(null);
  };

  // Render the appropriate screen based on current state
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'decisionTime':
        return <DecisionTimeScreen onContinue={handleDecisionTimeContinue} />;

      case 'whoIsGoing':
        return <WhoIsGoingScreen onNext={handleParticipantsSelected} />;

      case 'restaurantChoice':
        return (
          <RestaurantChoiceScreen
            participants={participants}
            onVotingComplete={handleVotingComplete}
          />
        );

      case 'enjoyYourMeal':
        return (
          <EnjoyYourMealScreen
            restaurant={selectedRestaurant}
            participants={participants}
            onRestart={handleRestart}
          />
        );

      default:
        return <DecisionTimeScreen onContinue={handleDecisionTimeContinue} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default DecisionScreen;