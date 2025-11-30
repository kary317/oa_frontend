import http from "./http";

const getAbsentTypes = () => {
  const path = "/absent/type/";
  return http.get(path);
};

const getResponder = () => {
  const path = "/absent/responder/";
  return http.get(path);
};

const applyAbsent = (data) => {
  const path = "/absent/absent/";
  return http.post(path, data);
};
export default {
  getAbsentTypes,
  getResponder,
  applyAbsent,
};
