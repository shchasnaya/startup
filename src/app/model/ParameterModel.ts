
export interface ParameterModel {
  id: string
  name: string
  description: string
  level: number
  parentCriteria: string | null;
  children?: ParameterModel[]
}