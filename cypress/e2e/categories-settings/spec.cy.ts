import { createTestingPinia } from '@pinia/testing'

describe('Categories Settings page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/categories/settings', {
      onBeforeLoad: (window) => {
        window.Pinia = createTestingPinia({
          createSpy: cy.spy,
        })
      },
    })
  })

  it('should load categories', () => {
    cy.get('h1').should('be.visible').contains('Categorias')

    cy.get('.i-tabler-loader-2').should('be.visible')

    cy.intercept('GET', 'https://cfkodjtaig.execute-api.us-east-1.amazonaws.com/andrew/categories', (req) => {
      req.reply((res) => {
        res.send({
          delay: 1000, // Simulate a delay of 1s
          body: [
            { id: 1, name: 'Category 1', hasChildren: false },
            { id: 2, name: 'Category 2', hasChildren: true },
          ],
        })
      })
    })

    cy.get('.i-tabler-loader-2').should('not.be.visible')

    cy.get('.category-name').should('have.length', 2)
  })
})
