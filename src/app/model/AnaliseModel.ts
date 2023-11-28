import {ParameterModel} from "./ParameterModel";

export interface setAnaliseModel {
  id: string
  name: string
  description: string
}

export interface AnaliseModel {
  id: string
  name: string
  description: string
  level: number
  parentCriteria: string | null;
  questions?: QuestionModel[]
  children?: AnaliseModel[]
}

export interface QuestionModel {
  id: string
  question: string
  type: typeQuestion
  answers: AnswerModel[]
}

export enum typeQuestion {
  SLIDER = 'SLIDER',
  RADIOBUTTON = 'RADIOBUTTON',
  CHECKBOX = 'CHECKBOX'
}

export interface AnswerModel {
  id: string
  answer: string
  value: number
  width?: string
}

export type PostAnswer = {
  questionId: string
  value: number | null
  isSkipped?: boolean
  isSkippedBlock?: boolean
  topCriteriaId?: string
}
