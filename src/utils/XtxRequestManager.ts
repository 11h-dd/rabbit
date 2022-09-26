import axios, { AxiosError, type AxiosResponse } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { useUserStore } from "@/stores/userStore";
import router from "@/router";
interface XtxAxiosInstance extends AxiosInstance {
  request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
}
export default class XtxRequestManager {
  private static _singletonInstance: XtxRequestManager;
  private readonly _instance: XtxAxiosInstance;
  private _userStore = useUserStore();
  public static baseURL = "https://pcapi-xiaotuxian-front-devtest.itheima.net/";
  private constructor() {
    this._instance = axios.create({ baseURL: XtxRequestManager.baseURL });
    this._instance.interceptors.request.use(
      this._addTokenToRequestHeader.bind(this)
    );
    this._instance.interceptors.response.use(
      this._peelOffAxiosResponse,
      this._unauthorized.bind(this)
    );
  }
  private _peelOffAxiosResponse(response: AxiosResponse) {
    return response.data;
  }
  private _unauthorized(err: unknown) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        this._userStore.$reset();
        router.replace("/login");
      }
      throw Error();
    }
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
  public request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T> {
    return this._instance.request<T, D>(config);
  }
}
