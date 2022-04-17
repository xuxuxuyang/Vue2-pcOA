import request from "@/utils/request";

// 权限管理相关的API请求函数
const api_name = "/admin/acl/permission";
export default {
  // 1.获取权限(菜单/功能)列表
  getPermissionList() {
    return request({
      url: `${api_name}`,
      method: "get",
    });
  },
  // 2.删除一个权限项
  removePermission(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: "delete",
    });
  },
  // 3.保存一个权限项
  addPermission(permission) {
    return request({
      url: `${api_name}/save`,
      method: "post",
      data: permission,
    });
  },
  // 4.更新一个权限项
  updatePermission(permission) {
    return request({
      url: `${api_name}/update`,
      method: "put",
      data: permission,
    });
  },
  // 5.查看某个角色的权限列表
  toAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: "get",
    });
  },
  // 6.给某个角色授权
  doAssign(roleId, permissionId) {
    return request({
      url: `${api_name}/doAssign`,
      method: "post",
      params: { roleId, permissionId },
    });
  },
};
