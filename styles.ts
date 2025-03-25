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
  }
});