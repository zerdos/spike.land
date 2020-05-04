import React from 'react';
import App from '../../src/App';
import { mount } from 'cypress-react-unit-test'

describe('App Component', () => {
   it("contains 'learn react'", () => {
      mount(<App />);

      cy.contains('header', 'Learn React').should('be.visible');
   });
});
