import { renderRouter, userEvent } from "expo-router/testing-library";
import { createTestRouter } from "../../test-setup/createTestRouter";
import Index from "../../app/index";
import RootLayout from "../../app/_layout";
import Login from "../../app/login";
import Register from "../../app/register";

describe("Landing screen", () => {
  const user = userEvent.setup();

  it("Should navigate to login page when Get Started is pressed", async () => {
    const routerForLogin = createTestRouter({
      index: Index,
      _layout: RootLayout,
      login: Login,
    });

    const { findByText, findByRole } = renderRouter(routerForLogin, {
      initialUrl: "/",
    });

    await findByText("Welcome to ArthSaathi!");
    const button = await findByRole("button", { name: "Get started" });
    await user.press(button);
    await findByText("Log in");
  });

  it("Should navigate to register route when Register is pressed", async () => {
    const routerForRegister = createTestRouter({
      index: Index,
      _layout: RootLayout,
      login: Login,
      register: Register,
    });

    const { findByText, findByRole } = renderRouter(routerForRegister, {
        initialUrl: "/",
      });
  
      await findByText("Welcome to ArthSaathi!");
      const button = await findByRole("button", { name: "Get started" });
      await user.press(button);
      const registerButton = await findByRole("button", { name: new RegExp(/Register/) });
      await user.press(registerButton);
      await findByText("Join ArthSaathi!");
  });
});
