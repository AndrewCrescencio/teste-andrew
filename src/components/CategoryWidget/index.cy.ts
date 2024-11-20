import CategoryWidget from '@/components/CategoryWidget/index.vue'
import { createPinia } from 'pinia'

describe('CategoryWidget.vue component', () => {
  let categoriesStoreMock: any
  let subcategoriesStoreMock: any

  beforeEach(() => {
    // Mock Pinia store
    categoriesStoreMock = {
      updateCategory: cy.stub().resolves(),
    }

    subcategoriesStoreMock = {
      updateSubcategory: cy.stub().resolves(),
    }

    const pinia = createPinia()
    pinia.use(({ store }) => {
      if (store.$id === 'categories') {
        return categoriesStoreMock
      }
      if (store.$id === 'subcategories') {
        return subcategoriesStoreMock
      }
    })

    cy.mount(CategoryWidget, {
      global: {
        plugins: [pinia],
      },
      props: {
        category: { id: 1, name: 'Test Category' },
        isSubCategory: false,
      },
    })
  })

  it('should render category name', () => {
    cy.get('p').should('contain', 'Test Category')
    // cy.get('button[aria-label="Renomear"]').should('exist')
    // cy.get('button[aria-label="Excluir"]').should('exist')
  })

  it('should enter edit mode when the "Renomear" button in the menu is clicked', () => {
    cy.get('button[aria-haspopup="dialog"]').click()
    cy.get('button[aria-label="Renomear"]').click()
    cy.get('input').should('have.value', 'Test Category')
    cy.get('button[aria-label="Cancelar"]').should('exist')
    cy.get('button[aria-label="Salvar"]').should('exist')
  })

  it('should call saveEdit when the "Salvar" button is clicked', () => {
    cy.get('button[aria-haspopup="dialog"]').click()

    cy.get('button[aria-label="Renomear"]').click()
    cy.get('input').clear().type('Material Escolar')
    cy.get('button[aria-label="Salvar"]').click()
    cy.wrap(categoriesStoreMock.updateCategory).should('have.been.calledWith', 'Material Escolar', 1)
  })

  it('should not call saveEdit if category name is unchanged', () => {
    cy.get('button[aria-haspopup="dialog"]').click()

    cy.get('button[aria-label="Renomear"]').click()
    cy.get('input').clear().type('Test Category') // Same as original
    cy.get('button[aria-label="Salvar"]').should('be.disabled')
    // cy.get(categoriesStoreMock.updateCategory).should('not.have.been.called')
  })

  // it('should show validation error if category name is less than 3 characters', () => {
  //   cy.get('button[aria-label="Renomear"]').click()
  //   cy.get('input').clear().type('a') // Invalid category name
  //   cy.get('button[aria-label="Salvar"]').click()
  //   cy.get('small#categoryName-help').should('contain', 'O nome da categoria deve ter pelo menos 3 caracteres')
  // })

  // it('should call deleteItem when the "Excluir" button is clicked', () => {
  //   const deleteSpy = cy.spy().as('deleteSpy')
  //   cy.get('button[aria-label="Excluir"]').click()
  //   cy.get('@deleteSpy').should('have.been.calledWith', { category: { id: 1, name: 'Test Category' }, isSubCategory: false })
  // })

  // it('should cancel editing when clicked outside', () => {
  //   cy.get('button[aria-label="Renomear"]').click()
  //   cy.get('input').clear().type('Updated Category')
  //   cy.get('body').click() // Simulate click outside to trigger onClickOutside
  //   cy.get('button[aria-label="Renomear"]').should('exist') // Check if edit mode is canceled
  // })
})
