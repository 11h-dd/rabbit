import { rest } from "msw";
import { faker } from "@faker-js/faker";
import XtxRequestManager from "@/utils/XtxRequestManager";

export const handlers = [
  rest.get("/test", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        makeArray(20, () => ({
          name: faker.name.firstName(),
          avatar: faker.internet.avatar(),
          phone: faker.phone.number(),
          cityName: faker.address.cityName(),
          email: faker.internet.email(),
        }))
      )
    );
  }),
  // 拦截收藏列表请求
  rest.get(`${XtxRequestManager.baseURL}member/collect`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        msg: "成功",
        result: {
          counts: 50,
          page: req.url.searchParams.get("page"),
          pageSize: req.url.searchParams.get("pageSize"),
          pages: 0,
          items: makeArray(4, () => ({
            id: faker.datatype.uuid(),
            name: faker.internet.userName(),
            desc: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${faker.datatype.number(
              { min: 1, max: 8 }
            )}.jpg`,
          })),
        },
      })
    );
  }),
];

function makeArray(length: number, generator: () => { [key: string]: any }) {
  return Array.from({ length }, generator);
}
