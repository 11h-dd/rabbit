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
  // 发送短信验证码(绑定已有账号)
  static sendMsgCodeOfBindQQ(
    mobile: string,
    unionId: string,
    source: number = 1
  ) {
    return XtxRequestManager.instance.request<
      XtxResponse<null>,
      { mobile: string; unionId: string; source: number }
    >({
      url: "/login/social/code",
      params: { mobile, unionId, source },
    });
  }
  // QQ登录: 绑定站点已有账号
  static loginByBindAccount(mobile: string, code: string, unionId: string) {
    return XtxRequestManager.instance.request<
      XtxResponse<User>,
      { mobile: string; code: string; unionId: string }
    >({
      url: "/login/social/bind",
      method: "post",
      data: { mobile, code, unionId },
    });
  }
  static checkAccountUnique(account: string) {
    return XtxRequestManager.instance.request<XtxResponse<{ valid: boolean }>>({
      url: "/register/check",
      params: { account },
    });
  }
}
