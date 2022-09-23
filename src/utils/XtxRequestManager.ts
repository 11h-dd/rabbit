import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { useUserStore } from "@/stores/userStore";
export default class XtxRequestManager {
  private static _singletonInstance: XtxRequestManager;
  public readonly _instance: AxiosInstance;
  private _userStore = useUserStore();
  public static baseURL = "https://pcapi-xiaotuxian-front-devtest.itheima.net/";
  private constructor() {
    this._instance = axios.create({ baseURL: XtxRequestManager.baseURL });
    this._instance.interceptors.request.use(
      this._addTokenToRequestHeader.bind(this)
    );
  }
  static get instance() {
    if (typeof XtxRequestManager._singletonInstance === "undefined") {
      XtxRequestManager._singletonInstance = new XtxRequestManager();
    }
    return XtxRequestManager._singletonInstance;
  }
  private _addTokenToRequestHeader(config: AxiosRequestConfig) {
    const token = this._userStore.profile.token;
    if (token) config.headers = { Authorization: `Bearer ${token}` };
    return config;
  }
}
