import { render, screen } from "@testing-library/react";
import Button from "./components/Button/Button";

describe("Button", () => {
  it("should render the button with correct child", () => {
    render(<Button children="test" />);
    expect(screen.getByText("test")).toBeVisible();
  });
});
