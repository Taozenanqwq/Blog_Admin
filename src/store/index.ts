import defaultSettings from '../settings.json';
import { LOGIN, UPDATE_SETTINGS, UPDATE_USERINFO } from './actionType';
export interface GlobalState {
  settings?: typeof defaultSettings;
  userInfo?: {
    name?: string;
    avatar?: string;
    job?: string;
    organization?: string;
    location?: string;
    email?: string;
    permissions: Record<string, string[]>;
  };
  userLoading?: boolean;
  useName?: string;
}

const initialState: GlobalState = {
  settings: defaultSettings,
  userInfo: {
    permissions: {},
  },
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS: {
      const { settings } = action.payload;
      return {
        ...state,
        settings,
      };
    }
    case UPDATE_USERINFO: {
      const { userInfo = initialState.userInfo, userLoading } = action.payload;
      return {
        ...state,
        userLoading,
        userInfo,
      };
    }
    case LOGIN: {
      const { userName } = action.payload;
      return {
        ...state,
        userName,
      };
    }
    default:
      return state;
  }
}
