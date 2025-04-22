import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  itemContainer: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  cuisine: {
    color: '#666',
    marginVertical: 4
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999'
  },
  filterButton: {
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  filterContainer: {
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});