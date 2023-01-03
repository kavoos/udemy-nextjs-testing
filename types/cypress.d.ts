declare namespace Cypress {
  interface Chainable {
    resetDbAndIsrCache(): Chainable<Element>;
    signIn(email: string, password: string): Chainable<Element>;
    write(value: string | RegExp): Chainable<Element>;
  }
  interface cy {
    state(value: string | RegExp): Chainable<Element>;
  }
}
