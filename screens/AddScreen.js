import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Platform,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Switch
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Toast from 'react-native-toast-message';
import DataManager from '../constants/DataManager';


const CUISINE_OPTIONS = [
  { label: "Select Cuisine", value: "" },
  { label: "Italian", value: "Italian" },
  { label: "Chinese", value: "Chinese" },
  { label: "Japanese", value: "Japanese" },
  { label: "American", value: "American" },
  { label: "Mexican", value: "Mexican" },
  { label: "Indian", value: "Indian" },
  { label: "Thai", value: "Thai" },
  { label: "Korean", value: "Korean" },
  { label: "Vietnamese", value: "Vietnamese" },
  { label: "Other", value: "Other" },
];

const AddScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [delivery, setDelivery] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(true);
  const [errors, setErrors] = useState({});

  // 添加名称验证函数
  const validateName = (name) => {
    if (!name.trim()) {
      return "Restaurant name is required";
    }
    if (name.length < 2) {
      return "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z0-9\s,'-]*$/.test(name)) {
      return "Name contains invalid characters";
    }
    return null;
  };

  // 添加电话号码验证函数
  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return null; // 电话号码是可选的
    }
    
    // 移除所有空格、破折号和括号
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // 支持的格式：
    // - (123) 456-7890
    // - 123-456-7890
    // - 123.456.7890
    // - 1234567890
    // - +1 123-456-7890
    // - +86 123 4567 8901
    const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid phone number";
    }
    
    // 确保清理后的号码长度在合理范围内
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return "Phone number must be between 10 and 15 digits";
    }
    
    return null;
  };

  // 添加地址验证函数
  const validateAddress = (address) => {
    if (!address.trim()) {
      return null; // 地址是可选的
    }

    // 基本地址验证 - 应包含数字和文本
    const hasNumber = /\d+/.test(address);
    const hasText = /[a-zA-Z]+/.test(address);
    
    if (!hasNumber || !hasText) {
      return "Please enter a valid address (should include street number and name)";
    }

    // 验证地址长度
    if (address.length < 5) {
      return "Address is too short";
    }

    // 验证地址格式
    const addressRegex = /^[a-zA-Z0-9\s,.-]+$/;
    if (!addressRegex.test(address)) {
      return "Address contains invalid characters";
    }

    // 验证常见地址组成部分
    const commonParts = /(street|road|avenue|lane|drive|st\.|rd\.|ave\.|ln\.|dr\.)/i;
    if (!commonParts.test(address)) {
      return "Please include street type (e.g., Street, Road, Avenue)";
    }

    return null;
  };

  // 添加网站 URL 验证函数
  const validateWebsite = (website) => {
    if (!website.trim()) {
      return null; // 网站 URL 是可选的
    }
  
    try {
      // 基本 URL 验证
      const urlRegex = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
      if (!urlRegex.test(website)) {
        return "Please enter a valid website URL (e.g., http://example.com)";
      }
  
      // 检查协议
      if (!website.startsWith('http://') && !website.startsWith('https://')) {
        return "URL must start with http:// or https://";
      }
  
      return null;
    } catch (e) {
      return "Please enter a valid website URL";
    }
  };
  
  // 修改 validateForm 函数
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // 验证名称
    const nameError = validateName(name);
    if (nameError) {
      newErrors.name = nameError;
      isValid = false;
    }

    // 仅在添加餐厅时验证其他字段
    if (isRestaurant) {
      // 验证菜系
      if (!cuisine) {
        newErrors.cuisine = 'Please select a cuisine';
        isValid = false;
      }

      // 验证价格
      if (!price) {
        newErrors.price = 'Please select a price range';
        isValid = false;
      }

      // 验证电话号码（如果有填写）
      if (phone && !/^\d{10,11}$/.test(phone.replace(/[-\s]/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
        isValid = false;
      }

      // 验证网址（如果有填写）
      if (website && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(website)) {
        newErrors.website = 'Please enter a valid website URL';
        isValid = false;
      }
      // 验证地址
      const addressError = validateAddress(address);
      if (addressError) {
        newErrors.address = addressError;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // 修改 handleSave 函数
  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please check and correct the form errors');
      return;
    }

    console.log('Save button clicked');
    console.log('Name:', name);
    console.log('Cuisine:', cuisine);
    console.log('Price:', price);

    if (!name.trim() || !cuisine || !price) {
      Alert.alert('Validation Error', 'Please fill all required fields (*)');
      console.log('Validation failed');
      return;
    }

    try {
      if (isRestaurant) {
        const newRestaurant = {
          id: Date.now().toString(),
          name: name,
          style: cuisine,  // Map cuisine to style for consistency
          price: price,
          rating: rating || '3',  // Default rating if not provided
          area: address,  // Map address to area for consistency
          phone: phone,
          website: website,
          delivery: delivery,
        };
        const restaurants = await DataManager.getRestaurants();
        restaurants.push(newRestaurant);
        await DataManager.saveRestaurants(restaurants);
      } else {
        const newPerson = {
          id: Date.now().toString(),
          name: name,
        };
        const people = await DataManager.getPeople();
        people.push(newPerson);
        await DataManager.savePeople(people);
      }

      Toast.show({
        type: 'success',
        text1: isRestaurant ? 'Restaurant Saved' : 'Person Saved',
        position: 'bottom'
      });

      // Clear form fields
      setName('');
      setCuisine('');
      setPrice('');
      setRating('');
      setPhone('');
      setAddress('');
      setWebsite('');
      setDelivery(false);

      // Navigate back to previous screen
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
      console.error(error);
    }
  };

  const renderPicker = (label, selectedValue, items, onValueChange) => (
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

  // 添加通用的输入处理函数
  // 在 handleInputChange 函数中添加电话验证
  const handleInputChange = (field, value) => {
  // Clear any existing error for this field when user types
  setErrors(prevState => ({
    ...prevState,
    [field]: null
  }));
  
  // Update the field value using the appropriate setter
  switch (field) {
    case 'name':
      setName(value);
      // 添加实时名称验证
      const nameError = validateName(value);
      if (nameError) {
        setErrors(prevState => ({
          ...prevState,
          name: nameError
        }));
      }
      break;
    case 'phone':
      setPhone(value);
      // 添加实时电话号码验证
      const phoneError = validatePhone(value);
      if (phoneError) {
        setErrors(prevState => ({
          ...prevState,
          phone: phoneError
        }));
      }
      break;
    case 'address':
      setAddress(value);
      // 添加实时地址验证
      const addressError = validateAddress(value);
      if (addressError) {
        setErrors(prevState => ({
          ...prevState,
          address: addressError
        }));
      }
      break;
    case 'website':
      setWebsite(value);
      // 添加实时网站验证
      const websiteError = validateWebsite(value);
      if (websiteError) {
        setErrors(prevState => ({
          ...prevState,
          website: websiteError
        }));
      }
      break;
  }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text>Add {isRestaurant ? 'Restaurant' : 'Person'}</Text>
      <CustomTextInput
        label="Name *"
        placeholder="Enter name"
        value={name}
        onChangeText={(text) => handleInputChange('name', text)}
        maxLength={20}
        error={errors.name}
      />

      {isRestaurant && (
        <>
          {renderPicker(
            "Style/Cuisine *",
            cuisine,
            CUISINE_OPTIONS,
            setCuisine
          )}

          {renderPicker(
            "Price (1-5) *",
            price,
            [
              { label: "Select Price", value: "" },
              { label: '1-100',value: '1-100' },
              { label: "101-200", value: "101-200" },
              { label: "201-300", value: "201-300" },
              { label: "301-400", value: "301-400" },
              { label: "401 +", value: "401 +" },
            ],
            setPrice
          )}

          {renderPicker(
            "Rating (1-5)",
            rating,
            [
              { label: "Select Rating", value: "" },
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
            setRating
          )}

          <CustomTextInput
            label="Phone"
            placeholder="Enter phone number"
            value={phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <CustomTextInput
            label="Location"
            placeholder="Enter location (e.g., 81th street, New York)"
            value={address}
            onChangeText={(text) => handleInputChange('address', text)}
            error={errors.address}
          />

          <CustomTextInput
            label="Website"
            placeholder="Enter website URL"
            value={website}
            onChangeText={(text) => handleInputChange('website', text)}
            error={errors.website}
          />

          <View style={styles.deliveryContainer}>
            <Text style={styles.label}>Delivery:</Text>
            <Switch
              value={delivery}
              onValueChange={setDelivery}
            />
          </View>
        </>
      )}

      <View style={styles.addScreenButtonsContainer}>
        <CustomButton
          text="Cancel"
          width="44%"
          onPress={() => navigation.goBack()}
        />
        <CustomButton
          text="Save"
          width="44%"
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
};

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
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
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


const validateAllFields = () => {
  const errors = {
    name: validateName(name),
    phone: validatePhone(phone),
    address: validateAddress(address),
    website: validateWebsite(website),
    cuisine: !cuisine ? "Cuisine is required" : null,
    price: !price ? "Price is required" : null,
    rating: !rating ? "Rating is required" : null,
    delivery: !delivery ? "Please specify delivery option" : null
  };

  setErrors(errors);
  return !Object.values(errors).some(error => error !== null);
};