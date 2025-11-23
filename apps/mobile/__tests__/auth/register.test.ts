import { renderRouter, userEvent } from "expo-router/testing-library";
import { createTestRouter } from "../../test-setup/createTestRouter";
import Index from "../../app/index";
import RootLayout from "../../app/_layout";
import Login from "../../app/login";
import Register from "../../app/register";

describe("Landing screen", () => {
  const user = userEvent.setup();

  it("Should register the user successfully and navigate to the login page", async () => {
    const routerForRegister = createTestRouter({
      index: Index,
      _layout: RootLayout,
      login: Login,
      register: Register,
    });

    const { findByText, findByRole, debug, findByTestId } = renderRouter(routerForRegister, {
        initialUrl: "/",
      });
      
      // Navigate to register page
      await findByText("Welcome to ArthSaathi!");
      const button = await findByRole("button", { name: "Get started" });
      await user.press(button);
      const registerButton = await findByRole("button", { name: new RegExp(/Register/) });
      await user.press(registerButton);
      await findByText("Join ArthSaathi!");
      
      // fill in details for registering
      const firstNameInput = await findByTestId('first-name');
      const lastNameInput = await findByTestId('last-name');
      const emailInput = await findByTestId('email');
      const passwordInput = await findByTestId('password');
      const confirmPasswordInput = await findByTestId('confirm-password');
      const register = await findByRole("button", { name: new RegExp(/Register now/) });

      await user.type(firstNameInput, 'Test')
      await user.type(lastNameInput, 'User')
      await user.type(emailInput, 'test@foo.com')
      await user.type(passwordInput, 'testpass')
      await user.type(confirmPasswordInput, 'testpass')

      await user.press(register)

      // should navigate to login page for logging in
      await findByText("Log in")
  });
});
