import message from "@/until/message";

declare module "vue" {
  interface ComponentCustomProperties {
    $message: typeof message;
  }
}
