import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import FilterModal from '../components/FilterModal';
import RestaurantVotingCard from '../components/RestaurantVotingCard';
import DataManager from '../constants/DataManager';

const RestaurantChoiceScreen = ({ participants, onVotingComplete }) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  // Voting state
  const [isVotingModalVisible, setIsVotingModalVisible] = useState(false);
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votes, setVotes] = useState({});

  // Filter state
  const [filterStyle, setFilterStyle] = useState('');
  const [filterPrice, setFilterPrice] = useState('Any');
  const [filterDelivery, setFilterDelivery] = useState(null);
  const [filterArea, setFilterArea] = useState('');
  const [filterRating, setFilterRating] = useState('Any');

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    setIsLoading(true);
    try {
      const loadedRestaurants = await DataManager.getRestaurants();
      setAllRestaurants(loadedRestaurants);
      setFilteredRestaurants(loadedRestaurants);
    } catch (error) {
      console.error("Failed to load restaurants:", error);
      Alert.alert('Error', 'Failed to load restaurants list.');
      setAllRestaurants([]);
      setFilteredRestaurants([]);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let results = [...allRestaurants];

    if (filterStyle.trim()) {
      results = results.filter(r => r.style.toLowerCase().includes(filterStyle.trim().toLowerCase()));
    }
    if (filterPrice !== 'Any') {
      results = results.filter(r => r.price === filterPrice);
    }
    if (filterDelivery !== null) {
      results = results.filter(r => r.delivery === filterDelivery);
    }
    if (filterArea.trim()) {
      results = results.filter(r => r.area.toLowerCase().includes(filterArea.trim().toLowerCase()));
    }
    if (filterRating !== 'Any') {
      const minRating = parseInt(filterRating, 10);
      results = results.filter(r => parseInt(r.rating, 10) >= minRating);
    }

    setFilteredRestaurants(results);
  };

  const handleApplyFilters = () => {
    applyFilters();
    setIsFilterModalVisible(false);
  };

  const handleResetFilters = () => {
    setFilterStyle('');
    setFilterPrice('Any');
    setFilterDelivery(null);
    setFilterArea('');
    setFilterRating('Any');
    setFilteredRestaurants([...allRestaurants]);
    setIsFilterModalVisible(false);
  };

  const startVoting = () => {
    if (filteredRestaurants.length === 0) {
      Alert.alert("No Restaurants", "No restaurants match the criteria.");
      return;
    }

    // Reset voting state
    setCurrentVoterIndex(0);
    setVotes({});
    setSelectedRestaurant(filteredRestaurants[0]);
    setIsVotingModalVisible(true);
  };

  const handleVote = (accepted) => {
    if (!selectedRestaurant) return;

    const currentVoter = participants[currentVoterIndex];
    const newVotes = { ...votes, [currentVoter.id]: accepted };
    setVotes(newVotes);

    // Move to next voter
    if (currentVoterIndex < participants.length - 1) {
      setCurrentVoterIndex(currentVoterIndex + 1);
    } else {
      // All votes are in
      const allAccepted = Object.values(newVotes).every(vote => vote === true);

      if (allAccepted) {
        // Everyone accepted this restaurant
        setIsVotingModalVisible(false);
        onVotingComplete(selectedRestaurant, participants);
      } else {
        // Someone rejected, move to next restaurant
        const currentIndex = filteredRestaurants.findIndex(r => r.id === selectedRestaurant.id);
        if (currentIndex < filteredRestaurants.length - 1) {
          // There are more restaurants to try
          setSelectedRestaurant(filteredRestaurants[currentIndex + 1]);
          setCurrentVoterIndex(0);
          setVotes({});
        } else {
          // No more restaurants
          setIsVotingModalVisible(false);
          Alert.alert("No More Options", "All restaurants have been rejected.");
        }
      }
    }
  };

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedRestaurant(item);
        setCurrentVoterIndex(0);
        setVotes({});
        setIsVotingModalVisible(true);
      }}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.itemStyle}>{item.style}</Text>
        <Text style={styles.itemDetails}>
          {item.area} • {item.price} • {item.rating}★ • {item.delivery ? 'Delivery' : 'No Delivery'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Loading restaurants...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Choice</Text>

      {participants && participants.length > 0 && (
        <Text style={styles.subtitle}>
          Participants: {participants.map(p => p.name).join(', ')}
        </Text>
      )}

      {filteredRestaurants.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No restaurants match the current filters.</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetFilters}
          >
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredRestaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterModalVisible(true)}
          disabled={allRestaurants.length === 0}
        >
          <Text style={styles.buttonText}>Filter Restaurants</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.voteButton, filteredRestaurants.length === 0 && styles.disabledButton]}
          onPress={startVoting}
          disabled={filteredRestaurants.length === 0}
        >
          <Text style={styles.buttonText}>Start Voting</Text>
        </TouchableOpacity>
      </View>

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        filterStyle={filterStyle}
        setFilterStyle={setFilterStyle}
        filterPrice={filterPrice}
        setFilterPrice={setFilterPrice}
        filterDelivery={filterDelivery}
        setFilterDelivery={setFilterDelivery}
        filterArea={filterArea}
        setFilterArea={setFilterArea}
        filterRating={filterRating}
        setFilterRating={setFilterRating}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <RestaurantVotingCard
        isVisible={isVotingModalVisible}
        restaurant={selectedRestaurant}
        currentVoterIndex={currentVoterIndex}
        participants={participants}
        onVote={handleVote}
        onClose={() => setIsVotingModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 8,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDetailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  itemStyle: {
    fontSize: 14,
    color: '#6200ea',
    fontWeight: '500',
    marginRight: 8,
    backgroundColor: '#f3e5f5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  filterButton: {
    backgroundColor: '#673ab7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  voteButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#d1c4e9',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#673ab7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RestaurantChoiceScreen;