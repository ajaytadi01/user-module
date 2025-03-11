import { act, renderHook } from "@testing-library/react-native";
import useInputValidationViewModel from "../ViewModel/InputValidationViewModel";

describe("User module Validatoin", () => {
  const mockFunction = jest.fn();
  const defaultValue = {
    label: "First Name",
    name: "firstName",
    onValueChange: mockFunction,
    required: true,
    type: "text",
    value: "",
  };
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  test("should show error if input fields given empty", () => {
    const { result } = renderHook(() =>
      useInputValidationViewModel(defaultValue)
    );
    act(() => {
      result.current.handleBlurChange();
    });
    expect(result.current.error).toBe("First Name is required");
  });

  test("should validate text fields in correct format", () => {
    const { result, rerender } = renderHook(
      (props) => useInputValidationViewModel(props),
      {
        initialProps: defaultValue,
      }
    );
    // IF VALUE IS WRONG
    rerender({ ...defaultValue, value: "hello123" });
    act(() => {
      result.current.handleBlurChange();
    });

    expect(result.current.error).toBe("Please enter a alphabets only.");
    //   IF VALUE IS CORRECT
    rerender({ ...defaultValue, value: "hello" });
    act(() => {
      result.current.handleBlurChange();
    });

    expect(result.current.error).toBe("");
  });

  test("should validate email field in correct format", () => {
    const { result, rerender } = renderHook(
      (props) => useInputValidationViewModel(props),
      {
        initialProps: defaultValue,
      }
    );
    // IF INPUT FIELD IS WRONG
    rerender({ ...defaultValue, type: "email", value: "ajay@asd" });
    act(() => {
      result.current.handleBlurChange();
    });

    expect(result.current.error).toBe("Please enter a valid email address.");

    // IF INPUT FIELD IS RIGHT

    rerender({ ...defaultValue, type: "email", value: "ajay@asd.com" });
    act(() => {
      result.current.handleBlurChange();
    });

    expect(result.current.error).toBe("");
  });
  
  test("should validate number field in correct format", () => {
    const { result, rerender } = renderHook(
      (props) => useInputValidationViewModel(props),
      {
        initialProps: defaultValue,
      }
    );

    // IF INPUT FEILD IS WRONG

    rerender({ ...defaultValue, type: "number", value: "5678d" });
    act(() => {
      result.current.handleBlurChange();
    });

    expect(result.current.error).toBe("Please enter a valid Mobile Number.");

    // IF INPUT FIELD IS RIGHT
    rerender({ ...defaultValue, type: "number", value: "9123456789" });
    act(() => {
      result.current.handleBlurChange();
    });

    expect(result.current.error).toBe("");
  });
});
