import userStore from '@/store/modules/user.ts'
import pinia from '@/store'
import { isArray } from 'lodash'

export const getGreeting = () => {
  const currentTime = new Date().getHours()
  if (currentTime <= 9) {
    return '早上好!'
  } else if (currentTime <= 12) {
    return '上午好!'
  } else if (currentTime <= 18) {
    return '下午好!'
  } else {
    return '晚上好!'
  }
}

const useUserStore = userStore(pinia)
export const hasBtnPermission = (btnName: string) => {
  const btnArr = useUserStore.buttons
  // console.log('ooooo', btnArr)
  // @ts-ignore
  return Array.isArray(btnArr) && btnArr.includes(btnName)
}
