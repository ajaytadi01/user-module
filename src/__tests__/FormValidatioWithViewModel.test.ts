import { act, renderHook } from "@testing-library/react-native";
import { useFormViewModel } from "../ViewModel/FormViewModel";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { useNavigation, useRoute } from "@react-navigation/native";
import { dataType } from "../store/formReducer";

//mocks
jest.mock("../utils/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn()
}));
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockNavigation = { navigate: jest.fn() };

beforeEach(() => {
    jest.clearAllMocks;
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
  });
describe("Form validation", () => {
  

  test("should enable button if all fileds are valid", () => {


    var formDataMock:dataType = {
        id: Date.now(),
        firstName: { data: "ajay", isValid: false },
        lastName: { data: "tadi", isValid: false },
        email: { data: "aj@asdf.dgf", isValid: false },
        mobileNumber: { data: "912345689", isValid: false },
        alternateMobileNumber: { data: "", isValid: true },
        alteranteEmail: { data: "", isValid: true },
        department: { data: "", isValid: true },
        companyName: { data: "", isValid: true },
      };
    
    (useAppSelector as jest.Mock).mockReturnValue({ formDetails: formDataMock });
    (useRoute as jest.Mock).mockReturnValue({ params: {} });
    const { result } = renderHook(() => useFormViewModel());
    console.log(result.current.formData);
  });
});
