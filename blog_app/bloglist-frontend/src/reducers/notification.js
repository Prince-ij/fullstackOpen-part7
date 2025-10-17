import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: '',
    content: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return action.payload
        }
    }
})

export const Notify = (payload) => {
    return async dispatch => {
        dispatch(setNotification(payload))
        setTimeout(() => dispatch(removeNotification({content: '', type: ''})), 3000)
    }
}

export const {setNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer
