import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Main from "./pages/Main/Main";

describe("Main Page", () => {
  let component;

  beforeEach(() => {
    component = render(<Main />, { wrapper: BrowserRouter });
  });

  it("should register value changes", () => {
    const amountInput = component.container.querySelector("#amount");
    expect(amountInput).toBeInTheDocument();

    fireEvent.change(amountInput, {
      target: {
        value: "1234.56",
      },
    });

    const installmentsInput =
      component.container.querySelector("#installments");
    expect(installmentsInput).toBeInTheDocument();

    fireEvent.change(installmentsInput, {
      target: {
        value: "12",
      },
    });

    const billingDayInput = component.container.querySelector("#billing-day");
    expect(billingDayInput).toBeInTheDocument();

    fireEvent.change(billingDayInput, {
      target: {
        value: "32",
      },
    });

    const firstInstallmentDateInput = component.container.querySelector(
      "#first-installment-date"
    );
    expect(firstInstallmentDateInput).toBeInTheDocument();

    fireEvent.change(firstInstallmentDateInput, {
      target: {
        value: "27-11-2022",
      },
    });

    const registerButton =
      component.container.querySelector("#register-button");
    expect(registerButton).toBeInTheDocument();
  });
});
