import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";

describe("Login Page", () => {
  let component;

  beforeEach(() => {
    component = render(<Login />, { wrapper: BrowserRouter });
  });

  it("should render the email input", () => {
    const emailInput = component.container.querySelector("#email");
    expect(emailInput).toBeVisible();
  });

  it("should render the password input", () => {
    const passwordInput = component.container.querySelector("#password");
    expect(passwordInput).toBeVisible();
  });

  it("should render the login button", () => {
    const loginButton = screen.getByText(/entrar/i);
    expect(loginButton).toBeVisible();
  });

  it("should complain on invalid formats", () => {
    const emailInput = component.container.querySelector("#email");
    const passwordInput = component.container.querySelector("#password");
    const loginButton = screen.getByText(/entrar/i);

    const email = "test@gmail.com";
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);

    const password = "invalido";
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput).toHaveValue(password);

    fireEvent.click(loginButton);

    expect(screen.getByText(/incorreto/i)).toBeInTheDocument();
  });

  it("should reject unregistered user", async () => {
    const emailInput = component.container.querySelector("#email");
    const passwordInput = component.container.querySelector("#password");
    const loginButton = screen.getByText(/entrar/i);

    const email = "test@gmail.com";
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);

    const password = "Abcdef123.@1";
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput).toHaveValue(password);

    fireEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByText(/incorreto/i)).toBeInTheDocument()
    );
  });

  it("should login a registered user", async () => {
    jest.spyOn(global, "fetch");

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        user: "teste",
        message: "Login efetuado com sucesso!",
        token: "123456",
      }),
    });

    const emailInput = component.container.querySelector("#email");
    const passwordInput = component.container.querySelector("#password");
    const loginButton = screen.getByText(/entrar/i);

    const email = "test@gmail.com";
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);

    const password = "Abcdef123.@1";
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput).toHaveValue(password);

    fireEvent.click(loginButton);

    await waitFor(() => expect(location.pathname).toBe("/"));
  });
});
