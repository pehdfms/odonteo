import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Statement from "./pages/Statement/Statement";

describe("Statement Page", () => {
  let component;

  beforeEach(() => {
    component = render(<Statement />, { wrapper: BrowserRouter });

    localStorage.setItem("user", '{ "id": 10 }')

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        user: { id: 10 },
        message: "Login efetuado com sucesso!",
        token: "123456",
      }),
    });

  });

  it("should render", async () => {
    const beginningDateInput =
      component.container.querySelector("#beginning-date");
    expect(beginningDateInput).toBeInTheDocument();
  });
});
