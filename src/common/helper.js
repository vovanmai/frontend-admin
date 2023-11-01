import { get } from 'lodash'
import { notification } from "ant-design-vue";
export const showNotification = (message, type = 'error') => {
    console.log(21212)
  notification[type]({
    message: message,
  });
};