declare namespace Cypress {
  interface Chainable {
    resetDbAndIsrCache(): Chainable<Element>;
    signIn(email: string, password: string): Chainable<Element>;
    write(value: string | RegExp): Chainable<Element>;
  }
  interface cy {
    findByLabelText(value: string | RegExp): Chainable<Element>;
    findByRole(
      role: string,
      { name }?: { name: string | RegExp }
    ): Chainable<Element>;
    findAllByText(value: string | RegExp): Chainable<Element>;
    state(value: string | RegExp): Chainable<Element>;
  }
}
