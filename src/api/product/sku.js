import request from "@/utils/request";

//1.sku列表的接口
export const reqSkuList = (page, limit) =>
  request({ url: `/admin/product/list/${page}/${limit}`, method: "get" });
//2.上架
export const reqSale = (skuId) =>
  request({ url: `/admin/product/onSale/${skuId}`, method: "get" });
//3.下架
export const reqCancel = (skuId) =>
  request({ url: `/admin/product/cancelSale/${skuId}`, method: "get" });
//4.获取SKU详情的接口
export const reqSkuById = (skuId) =>
  request({ url: `/admin/product/getSkuById/${skuId}`, method: "get" });
