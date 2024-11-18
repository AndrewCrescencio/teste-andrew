export interface Category {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  // parent?: string;
  parent?: { id: string }
  hasChildren: boolean
  children?: Category[]
}
