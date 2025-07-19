import { configureStore } from '@reduxjs/toolkit'
import pasteSlice from '../slice/pasteSlice'

export default configureStore({
  reducer: {
    paste:pasteSlice
  }
})