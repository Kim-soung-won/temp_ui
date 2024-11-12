export const apiPathKeys = {
  root: "/",
  core() {
    return apiPathKeys.root.concat(`core`);
  },
  auth() {
    return apiPathKeys.root.concat(`auth`);
  },
};
