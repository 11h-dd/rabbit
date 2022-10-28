import message from "@/until/message";

declare module "vue" {
  interface ComponentCustomProperties {
    $message: typeof message;
    $confirm: typeof Confirm;
  }
}
declare global {
  interface Window {
    QC: any;
  }
}
