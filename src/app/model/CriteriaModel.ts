export interface CriteriaModel {
  id: string
  name: string
  description: string
  default?: boolean
}

export interface postCriteriaModel {
  id?: string
  name: string
  description: string
  criteriaIds?: string[]
}