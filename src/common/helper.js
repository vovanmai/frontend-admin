import { get } from 'lodash'
import { notification } from "ant-design-vue";
export const showNotification = (message, type = 'error') => {
  notification[type]({
    message: message,
  });
};