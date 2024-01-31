import GET_TOOL_BY_ID from "constants/bmdashboard/toolsConstants";

export const toolReducer = (tool = null, action) => {
  if (action.type === GET_TOOL_BY_ID) {
    return action.payload;
  }
  return tool;
};