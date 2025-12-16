import http from "./http";

const getDepartmentStaffCount = () => {
  const path = "/home/department/staff/count/";
  return http.get(path);
};

export default {
  getDepartmentStaffCount,
};
