import { renderRouter, userEvent } from "expo-router/testing-library";
import { createTestRouter } from "../../test-setup/createTestRouter";
import Index from "../../app/index";
import RootLayout from "../../app/_layout";
import SignedInLayout from "../../app/(signed-in)/_layout";
import SignedIn from "../../app/(signed-in)";
import Login from "../../app/login";
import Register from "../../app/register";
import { TestQueryWrapper } from "../../test-setup/wrappers/TestQueryWrapper";

describe("Login screen", () => {
  const user = userEvent.setup();

  const routerForLogin = createTestRouter({
    index: Index,
    _layout: RootLayout,
    login: Login,
    register: Register,
    "(signed-in)/_layout": SignedInLayout,
    "(signed-in)/index": SignedIn,
  });

  it("Should navigate to home page when correct credentials are provided", async () => {
    const { findByText, findByRole, findByTestId } = renderRouter(routerForLogin, {
      initialUrl: "login",
      wrapper: TestQueryWrapper
    });

    const emailInput = await findByTestId('email-input')
    const passwordInput = await findByTestId('password-input')
    const button = await findByRole("button", { name: "Login" });
    await user.type(emailInput, 'test@x.com');
    await user.type(passwordInput, 'test-password');
    await user.press(button);
    await findByText('Hello user!');
  });
});
