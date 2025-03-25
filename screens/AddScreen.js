import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Platform, 
  Alert,
  StyleSheet 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 菜系选项常量
const CUISINE_OPTIONS = [
  { label: "Select Cuisine", value: "" },
  { label: "Italian", value: "Italian" },
  { label: "Chinese", value: "Chinese" },
  // 添加更多菜系...
];

class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cuisine: '',
      price: '',
      rating: '',
      phone: '',
      address: '',
      website: '',
      delivery: '',
      key: `r_${new Date().getTime()}`,
    };
  }

  handleSave = async () => {
    const { name, cuisine, price } = this.state;
    
    // 验证必填字段
    if (!name.trim() || !cuisine || !price) {
      Alert.alert('Validation Error', 'Please fill all required fields (*)');
      return;
    }

    try {
      // 获取现有餐厅数据
      const storedData = await AsyncStorage.getItem('restaurants');
      const restaurants = storedData ? JSON.parse(storedData) : [];
      
      // 添加新餐厅
      const newRestaurant = { ...this.state };
      const updatedList = [...restaurants, newRestaurant];
      
      // 保存数据
      await AsyncStorage.setItem('restaurants', JSON.stringify(updatedList));
      
      // 显示成功提示
      Toast.show({
        type: 'success',
        text1: 'Restaurant Saved',
        position: 'bottom'
      });
      
      // 返回上一页
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save restaurant');
      console.error(error);
    }
  };

  renderPicker = (label, selectedValue, items, onValueChange) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          {items.map((item, index) => (
            <Picker.Item 
              key={index} 
              label={item.label} 
              value={item.value} 
            />
          ))}
        </Picker>
      </View>
    </>
  );

  render() {
    return (
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <CustomTextInput
          label="Name *"
          placeholder="Enter restaurant name"
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
          maxLength={20}
        />

        {this.renderPicker(
          "Cuisine *",
          this.state.cuisine,
          CUISINE_OPTIONS,
          (value) => this.setState({ cuisine: value })
        )}

        {this.renderPicker(
          "Price (1-5) *",
          this.state.price,
          [1, 2, 3, 4, 5].map(num => ({
            label: num.toString(),
            value: num.toString()
          })),
          (value) => this.setState({ price: value })
        )}

        {/* 其他字段 */}
        <CustomTextInput
          label="Phone"
          placeholder="Enter phone number"
          value={this.state.phone}
          onChangeText={(text) => this.setState({ phone: text })}
          keyboardType="phone-pad"
        />

        <View style={styles.buttonContainer}>
          <CustomButton
            text="Cancel"
            width="45%"
            onPress={() => this.props.navigation.goBack()}
            buttonStyle={styles.cancelButton}
          />
          <CustomButton
            text="Save"
            width="45%"
            onPress={this.handleSave}
            disabled={!this.state.name || !this.state.cuisine || !this.state.price}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  label: {
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    marginHorizontal: 10,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
      },
      android: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
      },
    }),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
});

export default AddScreen;