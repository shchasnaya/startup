import {
  PROFILE_ROUTE,
  LANDING_ROUTE,
  PARAMS_STATISTICS_ROUTE, ANALISE_ROUTE,SET_CRITERIA_ROUTE
} from "../utils/const";
import Profile from "../features/profile/Profile";
import Landing from "../features/landing/Landing";
import Criteria from "../features/profile/criteria/Criteria";
import Analise from "../features/pages/analise/Analise";
import SetCriteria from "../features/pages/set-criteria/SetCriteria";

export const authRoutes = [
  {
    path: PROFILE_ROUTE,
    element: Profile
  },
  {
    path: PARAMS_STATISTICS_ROUTE,
    element: Criteria
  },
  {
    path: LANDING_ROUTE,
    element: Landing
  },
  {
    path: ANALISE_ROUTE,
    element: Analise
  },
  {
    path: SET_CRITERIA_ROUTE,
    element: SetCriteria
  }
]

export const publicRoutes = [
  {
    path: LANDING_ROUTE,
    element: Landing
  }
]