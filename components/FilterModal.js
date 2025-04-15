import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Switch, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomTextInput from '../components/CustomTextInput';

const PRICE_RANGES = ['Any', '1-100', '101-200', '201-300', '301-400', '401 +'];
const RATINGS = ['Any', '1', '2', '3', '4', '5'];

const FilterModal = ({
  isVisible,
  onClose,
  filterStyle,
  setFilterStyle,
  filterPrice,
  setFilterPrice,
  filterDelivery,
  setFilterDelivery,
  filterArea,
  setFilterArea,
  filterRating,
  setFilterRating,
  onApplyFilters,
  onResetFilters,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <ScrollView style={{ width: '100%' }} contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={styles.modalTitle}>Filter Options</Text>

            <CustomTextInput
              label="Style/Cuisine contains"
              value={filterStyle}
              onChangeText={setFilterStyle}
              placeholder="e.g., Chinese, Thai"
            />
            <CustomTextInput
              label="location"
              value={filterArea}
              onChangeText={setFilterArea}
              placeholder="e.g., 81th street, New York"
            />

            <Text style={styles.label}>Price Range</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={filterPrice} onValueChange={setFilterPrice} style={styles.picker}>
                {PRICE_RANGES.map(p => <Picker.Item key={p} label={p} value={p} />)}
              </Picker>
            </View>

            <Text style={styles.label}>Minimum Rating</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={filterRating} onValueChange={setFilterRating} style={styles.picker}>
                {RATINGS.map(r => <Picker.Item key={r} label={r === 'Any' ? 'Any' : `${r} / 5 Stars`} value={r} />)}
              </Picker>
            </View>

            <Text style={styles.label}>Delivery</Text>
            <View style={styles.deliveryFilterContainer}>
              <TouchableOpacity onPress={() => setFilterDelivery(null)} style={[styles.deliveryButton, filterDelivery === null && styles.deliveryButtonSelected]}>
                <Text style={[styles.deliveryButtonText, filterDelivery === null && styles.deliveryButtonTextSelected]}>Any</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterDelivery(true)} style={[styles.deliveryButton, filterDelivery === true && styles.deliveryButtonSelected]}>
                <Text style={[styles.deliveryButtonText, filterDelivery === true && styles.deliveryButtonTextSelected]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterDelivery(false)} style={[styles.deliveryButton, filterDelivery === false && styles.deliveryButtonSelected]}>
                <Text style={[styles.deliveryButtonText, filterDelivery === false && styles.deliveryButtonTextSelected]}>No</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtonContainer}>
              <Button title="Reset Filters" onPress={onResetFilters} color="gray" />
              <Button title="Apply Filters" onPress={onApplyFilters} color="#6200ea" />
            </View>
            <Button title="Cancel" onPress={onClose} color="red" />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: '85%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200ea',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginBottom: 8,
    marginTop: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    width: '100%',
    color: '#333',
  },
  deliveryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 4,
  },
  deliveryButtonSelected: {
    backgroundColor: '#6200ea',
    borderColor: '#6200ea',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default FilterModal;