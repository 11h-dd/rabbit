import type { XtxResponse } from "@/types/Response";
import type { User } from "@/types/Users";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class AuthAPI {
  //用户名密码登录
  static loginByAccount(account: string, password: string) {
    return XtxRequestManager.instance.request<
      XtxResponse<User>,
      {
        account: string;
        password: string;
      }
    >({
      url: "/login",
      method: "post",
      data: {
        account,
        password,
      },
    });
  }
  //手机短信验证码
  static sendMsgCodeOfMobileLogin(mobile: string) {
    return XtxRequestManager.instance.request<XtxResponse<null>>({
      url: "/login/code",
      params: mobile,
    });
  }
  //验证码
  static loginByMobileMsgCode(mobile: number, code: number) {
    return XtxRequestManager.instance.request<
      XtxResponse<User>,
      {
        mobile: number;
        code: number;
      }
    >({
      url: "/login/code",
      method: "post",
      data: {
        mobile,
        code,
      },
    });
  }
  //QQ 三方登录请求
  static loginByQQOpenid(unionId: string, source?: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    return XtxRequestManager.instance.request<
      XtxResponse<User>,
      {
        unionId: string;
        source: 1 | 2 | 3 | 4 | 5 | 6 | 7;
      }
    >({ url: "/login/social", method: "post", data: { unionId, source: 1 } });
  }
}
