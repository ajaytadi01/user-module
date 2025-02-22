import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ValidatedInput from "../utils/ValidatedInput";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { addFormData, dataType } from "../store/formReducer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Preview: { id: number } | undefined;
};

const Form = () => {
  const dispatch = useAppDispatch();
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const RouteData = useRoute();
  let formstoreData = useAppSelector((state) => state.form);

  const [formData, setFormData] = useState<dataType>({
    id: Date.now(),
    firstName: { data: "", isValid: false },
    lastName: { data: "", isValid: false },
    email: { data: "", isValid: false },
    mobileNumber: { data: "", isValid: false },
    alternateMobileNumber: { data: "", isValid: true },
    alteranteEmail: { data: "", isValid: true },
    department: { data: "", isValid: true },
    companyName: { data: "", isValid: true },
  });

  const [isBtnDisabled, setBtnDisabled] = useState(true);
  const editDataId = RouteData?.params?.id;
  // console.log(editDataId);

  useEffect(() => {
    // console.log(isBtnDisabled,'isbtndisabled',formData);
    if (editDataId) {
      formstoreData.formDetails.forEach((item) => {
        if (item.id === editDataId) {
          setFormData(item);
        }
      });
    } else {
      setFormData({
        id: Date.now(),
        firstName: { data: "", isValid: false },
        lastName: { data: "", isValid: false },
        email: { data: "", isValid: false },
        mobileNumber: { data: "", isValid: false },
        alternateMobileNumber: { data: "", isValid: true },
        alteranteEmail: { data: "", isValid: true },
        department: { data: "", isValid: true },
        companyName: { data: "", isValid: true },
      });
    }
  }, []);

  const handleOnChangeText = (name: any, value: any, isValid: any) => {
    let allValid = false;

    setFormData((prevState) => {
      const formStateData = {
        ...prevState,
        [name]: { data: value, isValid: isValid },
      };
      for (let key in formStateData) {
        if (formStateData[key as keyof dataType].isValid === false) {
          allValid = true;
          break;
        }
      }

      setBtnDisabled(allValid);

      return formStateData;
    });
  };

  const handleButton = () => {
    dispatch(addFormData(formData));
    console.log(formData, "handlebutton");

    navigate.navigate("Preview", { id: formData.id });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      style={styles.keyAvoidView}
    >
      <ScrollView style={styles.screen}>
        <ValidatedInput
          testId="firstName-test-id"
          name="firstName"
          value={formData.firstName.data}
          label="First Name"
          onValueChange={handleOnChangeText}
          required
        />
        <ValidatedInput
          testId="lastName-test-id"
          name="lastName"
          value={formData.lastName.data}
          label="Last Name"
          onValueChange={handleOnChangeText}
          required
        />
        <ValidatedInput
          testId="email-test-id"
          name="email"
          value={formData.email.data}
          label="Email"
          type="email"
          onValueChange={handleOnChangeText}
          required
        />
        <ValidatedInput
          testId="alteranteEmail-test-id"
          name="alteranteEmail"
          value={formData.alteranteEmail.data}
          label="Alternate Email"
          type="email"
          onValueChange={handleOnChangeText}
        />
        <ValidatedInput
          testId="mobileNumber-test-id"
          name="mobileNumber"
          value={formData.mobileNumber.data}
          label="Mobile Number"
          type="number"
          onValueChange={handleOnChangeText}
          required
        />
        <ValidatedInput
          testId="alternateMobileNumber-test-id"
          name="alternateMobileNumber"
          value={formData.alternateMobileNumber.data}
          label="Alternate Mobile Number"
          type="number"
          onValueChange={handleOnChangeText}
        />
        <ValidatedInput
          testId="department-test-id"
          name="department"
          value={formData.department.data}
          label="Department"
          onValueChange={handleOnChangeText}
        />
        <ValidatedInput
          testId="companyName-test-id"
          name="companyName"
          value={formData.companyName.data}
          label="Company Name"
          onValueChange={handleOnChangeText}
        />
        <View style={{ width: 150 }}>
          <Button
            testID="submitButtontest-id"
            title="submit"
            onPress={handleButton}
            disabled={isBtnDisabled}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Form;

const styles = StyleSheet.create({
  keyAvoidView: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
