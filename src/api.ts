export const MAIN_QUERY = `
  query MainQuery {
    base_order {
      item_id
      quantity
    }

    items {
      id
      name
      link
      category
    }
  }
`

export type Item = {
  id: number
  name: string
  link?: string | null
  category?: string | null
}

export type OrderItem = {
  item_id: number
  quantity: string
}

export type BaseItem = {
  item_id: number
  quantity: string
}

export type MainQuery = {
  base_order: BaseItem[]
  items: Item[]
}
