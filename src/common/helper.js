import { filter, get } from 'lodash'
import { notification } from 'ant-design-vue'
import dayjs from "dayjs"
export const showNotification = (message, type = 'error') => {
  notification[type]({
    message: message,
  });
};

export const filterEmptyArray = (array) => {
  return filter(array, (value) => {
    return value !== '' && value !== null && value !== undefined
  })
};

export const rangePresets = () => {
  return [
    {
      label: 'Hôm nay',
      value: [dayjs(), dayjs()],
    },
    {
      label: '7 ngày gần nhất',
      value: [dayjs().add(-6, 'day'), dayjs()],
    },
    {
      label: 'Trong tuần này',
      value: [dayjs().startOf('week'), dayjs()],
    },
    {
      label: 'Trong tháng này',
      value: [dayjs().startOf('month'), dayjs()],
    },
    {
      label: 'Trong tháng trước',
      value: [dayjs().add(-1, 'month').startOf('month'), dayjs().add(-1, 'month').endOf('month')],
    },
  ]
};
