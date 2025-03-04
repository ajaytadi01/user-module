import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { addFormData, dataType } from "../store/formReducer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Preview: { id: number } | undefined;
};

export const useFormViewModel = () => {
  const dispatch = useAppDispatch();
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const RouteData = useRoute();
  const formstoreData = useAppSelector((state) => state.form);

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
    console.log(editDataId);

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
    // console.log(name, value, isValid, "1234");

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

    navigate.navigate("Preview", { id: formData.id });
  };

  return {
    formData,
    handleOnChangeText,
    handleButton,
    isBtnDisabled,
  };
};
