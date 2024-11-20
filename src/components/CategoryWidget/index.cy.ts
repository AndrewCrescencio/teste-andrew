import CategoryWidget from '@/components/CategoryWidget/index.vue'
import { createPinia } from 'pinia'

describe('CategoryWidget.vue component', () => {
  let categoriesStoreMock: any
  let subcategoriesStoreMock: any

  beforeEach(() => {
    // Mock Pinia store
    categoriesStoreMock = {
      updateCategory: cy.stub().resolves(true),
    }

    subcategoriesStoreMock = {
      updateSubcategory: cy.stub().resolves(true),
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
        category: { id: 'category-uuid-id', name: 'Test Category', createdAt: '', updatedAt: '', hasChildren: false },
        isSubCategory: false,
      },
    })
  })

  it('should render category name', () => {
    cy.get('p').should('contain', 'Test Category')
  })

  it('should enter edit mode when the "Renomear" button in the menu is clicked', () => {
    cy.get('button[aria-haspopup="dialog"]').click()
    cy.get('button[aria-label="Renomear"]').click()
    cy.get('input').should('have.value', 'Test Category')
    cy.get('button[aria-label="Cancelar"]').should('exist')
    cy.get('button[aria-label="Salvar"]').should('exist')
  })

  it.only('should call saveEdit when the "Salvar" button is clicked', () => {
    cy.get('button[aria-haspopup="dialog"]').click()

    cy.get('button[aria-label="Renomear"]').click()
    cy.get('input').clear().type('New category name')
    cy.get('button[aria-label="Salvar"]').click()
    cy.wrap(categoriesStoreMock.updateCategory).should('have.been.calledWith', 'New category name', 'category-uuid-id')
  })

  it('should not call saveEdit if category name is unchanged', () => {
    cy.get('button[aria-haspopup="dialog"]').click()

    cy.get('button[aria-label="Renomear"]').click()
    cy.get('input').clear().type('Test Category') // Same as original
    cy.get('button[aria-label="Salvar"]').should('be.disabled')
  })
})
