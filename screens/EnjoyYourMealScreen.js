import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const EnjoyYourMealScreen = ({ restaurant, participants, onRestart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../img/splash.png')}
          style={styles.image}
        />

        <Text style={styles.title}>Enjoy Your Meal!</Text>

        {restaurant && (
          <View style={styles.restaurantCard}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantDetail}>Style: {restaurant.style}</Text>
            <Text style={styles.restaurantDetail}>Area: {restaurant.area}</Text>
            <Text style={styles.restaurantDetail}>Price: {restaurant.price}</Text>
            <Text style={styles.restaurantDetail}>Rating: {restaurant.rating}/5</Text>
          </View>
        )}

        {participants && participants.length > 0 && (
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsTitle}>Participants:</Text>
            <Text style={styles.participantsList}>
              {participants.map(p => p.name).join(', ')}
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={onRestart}>
          <Text style={styles.buttonText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 24,
    textAlign: 'center',
  },
  restaurantCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  restaurantDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  participantsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  participantsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  participantsList: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EnjoyYourMealScreen;