import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Form from "../screens/Form";
import { Provider } from "react-redux";
import store, { RootState } from "../store/store";
jest.useFakeTimers();

// const handleError = (getByTestId: any, testID: string) => {
//   try {
//     const element = getByTestId(testID);
//     return element;
//   } catch (error) {
//     console.error(`Didn't find testID with ${testID}`);
//     return;
//   }
// };

const INPUT_TEST_ID = {
  FIRSTNAME: "firstName-test-id",
  LASTNAME: "lastName-test-id",
  EMAIL: "email-test-id",
  ALTEMAIL: "alteranteEmail-test-id",
  MOBILE: "mobileNumber-test-id",
  ALTMOBILE: "alternateMobileNumber-test-id",
  DEPARTMENT: "department-test-id",
  COMPANY: "companyName-test-id",
  BUTTON: "submitButtontest-id",
};
const ERROR_TEST_ID = {
  FIRSTNAME: "firstName-test-id-error",
  LASTNAME: "lastName-test-id-error",
  EMAIL: "email-test-id-error",
  ALTEMAIL: "alteranteEmail-test-id-error",
  MOBILE: "mobileNumber-test-id-error",
  ALTMOBILE: "alternateMobileNumber-test-id-error",
  DEPARTMENT: "department-test-id-error",
  COMPANY: "companyName-test-id-error",
};

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: { id: 1739179970265 },
  }),
}));

describe("USER MODULE VALIDATION", () => {
  let getByTestId: any;
  let queryByTestId: any;

  beforeEach(() => {
    const renderForm = render(
      <Provider store={store}>
        <NavigationContainer>
          <Form />
        </NavigationContainer>
      </Provider>
    );
    getByTestId = renderForm.getByTestId;
    queryByTestId = renderForm.queryByTestId;
  });

  describe("FIRST NAME VALIDATION", () => {
    let textInputInstance: any;
    let errorInstance: any;

    beforeEach(() => {
      try {
        textInputInstance = getByTestId(INPUT_TEST_ID.FIRSTNAME);
      } catch (error) {
        throw new Error(`TestID ${INPUT_TEST_ID.FIRSTNAME} not found`);
      }
      errorInstance = queryByTestId(ERROR_TEST_ID.FIRSTNAME);
      if (!errorInstance) {
        throw new Error(`TestID ${ERROR_TEST_ID.FIRSTNAME} not found`);
      }
    });

    test("should show error if firstname is empty", async () => {
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("First Name is required");
      });
    });

    test("should show error if firstname is Alpha-numeric", async () => {
      fireEvent.changeText(textInputInstance, 123);
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe(
          "Please enter a alphabets only."
        );
      });
    });

    test("should not show error if firstname is Alphabets", async () => {
      fireEvent.changeText(textInputInstance, "Ajay");
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });
  });

  describe("LAST NAME VALIDATION", () => {
    let textInputInstance: any;
    let errorInstance: any;

    beforeEach(() => {
      try {
        textInputInstance = getByTestId(INPUT_TEST_ID.LASTNAME);
      } catch (error) {
        throw new Error(`TestID ${INPUT_TEST_ID.LASTNAME} not found`);
      }
      errorInstance = queryByTestId(ERROR_TEST_ID.LASTNAME);
      if (!errorInstance) {
        throw new Error(`TestID ${ERROR_TEST_ID.LASTNAME} not found`);
      }
    });
    test("should show error if lastname is empty", async () => {
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("Last Name is required");
      });
    });
    test("should show error if lastname is Alpha-numeric", async () => {
      fireEvent.changeText(textInputInstance, 123);
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe(
          "Please enter a alphabets only."
        );
      });
    });
    test("should not show error if lastname is Alphabets", async () => {
      fireEvent.changeText(textInputInstance, "Ajay");
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });
  });

  describe("EMAIL VALIDATION", () => {
    let textInputInstance: any;
    let errorInstance: any;

    beforeEach(() => {
      try {
        textInputInstance = getByTestId(INPUT_TEST_ID.EMAIL);
      } catch (error) {
        throw new Error(`TestID ${INPUT_TEST_ID.EMAIL} not found`);
      }
      errorInstance = queryByTestId(ERROR_TEST_ID.EMAIL);
      if (!errorInstance) {
        throw new Error(`TestID ${ERROR_TEST_ID.EMAIL} not found`);
      }
    });
    test("should show error if Email is empty", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider store={store}>
          <NavigationContainer>
            <Form />
          </NavigationContainer>
        </Provider>
      );
      const textInputInstance = getByTestId("email-test-id");
      const errorInstance = queryByTestId("email-test-id-error");

      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("Email is required");
      });
    });
    test("should show error if Email is not in valid format", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider store={store}>
          <NavigationContainer>
            <Form />
          </NavigationContainer>
        </Provider>
      );
      const textInputInstance = getByTestId("email-test-id");
      const errorInstance = queryByTestId("email-test-id-error");

      fireEvent.changeText(textInputInstance, "ajsa@cd");
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe(
          "Please enter a valid email address."
        );
      });
    });
    test("should not show error if Email is in valid format", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider store={store}>
          <NavigationContainer>
            <Form />
          </NavigationContainer>
        </Provider>
      );
      const textInputInstance = getByTestId("email-test-id");
      const errorInstance = queryByTestId("email-test-id-error");

      fireEvent.changeText(textInputInstance, "Ajay@tcs.com");
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });
  });

  describe("ALTERNATE EMAIL VALIDATION", () => {
    let textInputInstance: any;
    let errorInstance: any;

    beforeEach(() => {
      try {
        textInputInstance = getByTestId(INPUT_TEST_ID.ALTEMAIL);
      } catch (error) {
        throw new Error(`TestID ${INPUT_TEST_ID.ALTEMAIL} not found`);
      }
      errorInstance = queryByTestId(ERROR_TEST_ID.ALTEMAIL);
      if (!errorInstance) {
        throw new Error(`TestID ${ERROR_TEST_ID.ALTEMAIL} not found`);
      }
    });

    test("should not show error if Email is empty", async () => {
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });
    test("should show error if Email is not in valid format", async () => {
      fireEvent.changeText(textInputInstance, "ajsa@cd");
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe(
          "Please enter a valid email address."
        );
      });
    });
    test("should not show error if Email is in valid format", async () => {
      fireEvent.changeText(textInputInstance, "Ajay@tcs.com");
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });
  });

  describe("MOBILE NUMBER VALIDATION", () => {
    let textInputInstance: any;
    let errorInstance: any;

    beforeEach(() => {
      try {
        textInputInstance = getByTestId(INPUT_TEST_ID.MOBILE);
      } catch (error) {
        throw new Error(`TestID ${INPUT_TEST_ID.MOBILE} not found`);
      }
      errorInstance = queryByTestId(ERROR_TEST_ID.MOBILE);
      if (!errorInstance) {
        throw new Error(`TestID ${ERROR_TEST_ID.MOBILE} not found`);
      }
    });
    test("should show error if Mobile number is empty", async () => {
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("Mobile Number is required");
      });
    });
    test("should show error if Mobile number is not entered 10 digits", async () => {
      fireEvent.changeText(textInputInstance, 1234);
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe(
          "Please enter a valid Mobile Number."
        );
      });
    });
    test("should not show error if Mobile number is given 10 digits", async () => {
      fireEvent.changeText(textInputInstance, 9112345678);
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });
  });

  describe("ALTERNATE MOBILE NUMBER VALIDATION", () => {
    let textInputInstance: any;
    let errorInstance: any;

    beforeEach(() => {
      try {
        textInputInstance = getByTestId(INPUT_TEST_ID.ALTMOBILE);
      } catch (error) {
        throw new Error(`TestID ${INPUT_TEST_ID.ALTMOBILE} not found `);
      }
      errorInstance = queryByTestId(ERROR_TEST_ID.ALTMOBILE);
      if (!errorInstance) {
        throw new Error(`TestID ${ERROR_TEST_ID.ALTMOBILE} not found`);
      }
    });
    test("should not show error if Alternate Mobile number is empty", async () => {
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });
    test("should show error if Alternate Mobile number is not entered 10 digits", async () => {
      fireEvent.changeText(textInputInstance, 1234);
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe(
          "Please enter a valid Mobile Number."
        );
      });
    });
    test("should not show error if Alternate Mobile number is given 10 digits", async () => {
      fireEvent.changeText(textInputInstance, 9112345678);
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });
  });

  describe("DEPARTMENT VALIDATION", () => {
    let textInputInstance: any;
    let errorInstance: any;

    beforeEach(() => {
      try {
        textInputInstance = getByTestId(INPUT_TEST_ID.DEPARTMENT);
      } catch (error) {
        throw new Error(`TestID ${INPUT_TEST_ID.DEPARTMENT} not found`);
      }
      errorInstance = queryByTestId(ERROR_TEST_ID.DEPARTMENT);
      if (!errorInstance) {
        throw new Error(`TestID ${ERROR_TEST_ID.DEPARTMENT} not found`);
      }
    });
    test("should not show error if department is empty", async () => {
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });

    test("should show error if department is Alpha-numeric", async () => {
      fireEvent.changeText(textInputInstance, 123);
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe(
          "Please enter a alphabets only."
        );
      });
    });

    test("should not show error if department is Alphabets", async () => {
      fireEvent.changeText(textInputInstance, "Computer");
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });
  });

  describe("COMPANY VALIDATION", () => {
    let textInputInstance: any;
    let errorInstance: any;

    beforeEach(() => {
      try {
        textInputInstance = getByTestId(INPUT_TEST_ID.COMPANY);
      } catch (error) {
        throw new Error(`TestID ${INPUT_TEST_ID.COMPANY} not found`);
      }
      errorInstance = queryByTestId(ERROR_TEST_ID.COMPANY);
      if (!errorInstance) {
        throw new Error(`TestID ${ERROR_TEST_ID.COMPANY} not found`);
      }
    });
    test("should not show error if company is empty", async () => {
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });

    test("should show error if company is Alpha-numeric", async () => {
      fireEvent.changeText(textInputInstance, "tcd2");
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe(
          "Please enter a alphabets only."
        );
      });
    });

    test("should not show error if company is Alphabets", async () => {
      fireEvent.changeText(textInputInstance, "tcs");
      fireEvent(textInputInstance, "blur");
      await waitFor(() => {
        expect(errorInstance.props.children).toBe("");
      });
    });
  });

  describe("BUTTON VALIDATION", () => {
    let firstNameInstance: any;
    let lastNameInstance: any;
    let emailInstance: any;
    let altEmailInstance: any;
    let mobileInstance: any;
    let altMobileInstance: any;
    let departmentInstance: any;
    let companyInstance: any;
    let buttonInstance: any;
    beforeEach(() => {
      try {
        const instances: Record<string, any> = {};

        Object.entries(INPUT_TEST_ID).forEach(([key, testID]) => {
          try {
            instances[key] = getByTestId(testID);
          } catch (error) {
            throw new Error(`TestID ${testID} not found`);
          }
        });

        firstNameInstance = instances.FIRSTNAME;
        lastNameInstance = instances.LASTNAME;
        emailInstance = instances.EMAIL;
        altEmailInstance = instances.ALTEMAIL;
        mobileInstance = instances.MOBILE;
        altMobileInstance = instances.ALTMOBILE;
        departmentInstance = instances.DEPARTMENT;
        companyInstance = instances.COMPANY;
        buttonInstance = instances.BUTTON;
      } catch (error) {
        throw new Error(`Test setup failed ${error.message}`);
      }
    });

    test("should show error if firstname is given in wrong format", async () => {
      fireEvent.changeText(firstNameInstance, "asdf123");
      fireEvent(firstNameInstance, "blur");
      fireEvent.changeText(lastNameInstance, "asdfgh");
      fireEvent(lastNameInstance, "blur");
      fireEvent.changeText(emailInstance, "asdf@asdf.dfg");
      fireEvent(emailInstance, "blur");
      fireEvent.changeText(mobileInstance, 9123456789);
      fireEvent(mobileInstance, "blur");
      expect(buttonInstance.props.accessibilityState.disabled).toBeTruthy();
    });
    test("should show error if lastName is given in wrong format", async () => {
      fireEvent.changeText(firstNameInstance, "asdf");
      fireEvent(firstNameInstance, "blur");
      fireEvent.changeText(lastNameInstance, "asdfgh123");
      fireEvent(lastNameInstance, "blur");
      fireEvent.changeText(emailInstance, "asdf@asdf.dfg");
      fireEvent(emailInstance, "blur");
      fireEvent.changeText(mobileInstance, 9123456789);
      fireEvent(mobileInstance, "blur");
      expect(buttonInstance.props.accessibilityState.disabled).toBeTruthy();
    });

    test("should show error if email is given in wrong format", async () => {
      fireEvent.changeText(firstNameInstance, "asdf");
      fireEvent(firstNameInstance, "blur");
      fireEvent.changeText(lastNameInstance, "asdfgh");
      fireEvent(lastNameInstance, "blur");
      fireEvent.changeText(emailInstance, "asdf@asd");
      fireEvent(emailInstance, "blur");
      fireEvent.changeText(mobileInstance, 9123456789);
      fireEvent(mobileInstance, "blur");
      expect(buttonInstance.props.accessibilityState.disabled).toBeTruthy();
    });

    test("should show error if mobile number is given in wrong format", async () => {
      fireEvent.changeText(firstNameInstance, "asdf");
      fireEvent(firstNameInstance, "blur");
      fireEvent.changeText(lastNameInstance, "asdfgh");
      fireEvent(lastNameInstance, "blur");
      fireEvent.changeText(emailInstance, "asdf@asdf.dfg");
      fireEvent(emailInstance, "blur");
      fireEvent.changeText(mobileInstance, 912345);
      fireEvent(mobileInstance, "blur");
      expect(buttonInstance.props.accessibilityState.disabled).toBeTruthy();
    });

    test("should not show any error if all required fields are given", async () => {
      fireEvent.changeText(firstNameInstance, "asdf");
      fireEvent(firstNameInstance, "blur");
      fireEvent.changeText(lastNameInstance, "asdfgh");
      fireEvent(lastNameInstance, "blur");
      fireEvent.changeText(emailInstance, "asdf@asdf.dfg");
      fireEvent(emailInstance, "blur");
      fireEvent.changeText(mobileInstance, 9123456789);
      fireEvent(mobileInstance, "blur");
      expect(buttonInstance.props.accessibilityState.disabled).toBeFalsy();
    });

    test("updates Redux state when form is submitted", async () => {
      fireEvent.changeText(firstNameInstance, "asdf");
      fireEvent(firstNameInstance, "blur");
      fireEvent.changeText(lastNameInstance, "asdfgh");
      fireEvent(lastNameInstance, "blur");
      fireEvent.changeText(emailInstance, "asdf@asdf.dfg");
      fireEvent(emailInstance, "blur");
      fireEvent.changeText(mobileInstance, 9123456789);
      fireEvent(mobileInstance, "blur");
      expect(buttonInstance.props.accessibilityState.disabled).toBeFalsy();
      fireEvent(buttonInstance, "press");

      const state: RootState = store.getState();
      expect(state.form.formDetails[0].firstName.data).toBe("asdf");
      expect(state.form.formDetails[0].lastName.data).toBe("asdfgh");
      expect(state.form.formDetails[0].email.data).toBe("asdf@asdf.dfg");
      expect(state.form.formDetails[0].mobileNumber.data).toBe(9123456789);
    });
  });
});
