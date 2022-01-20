import axios from "axios";

export const TODO_SUCCESS_ACTION = 'TODO_SUCCESS_ACTION';
export const TODO_FAILURE_ACTION = 'TODO_FAILURE_ACTION';

//Thunk action creator
export const todoSuccess = (todo)=>{
    return({
        type: TODO_SUCCESS_ACTION,
        payload: todo
    })
}

export const todoFailure = (message)=>{
    return({
        type: TODO_FAILURE_ACTION,
        message: message
    })
}

//Thunk actions
//Get Request: list 
export const todoGetThunk = ()=>{
    return (dispatch)=>{
        let token = localStorage.getItem("token");
        axios.get(`${process.env.REACT_APP_API_SERVER}/todo`,
            {headers: {Authorization: `Bearer ${token}`}
        }).then((res)=>{
            dispatch(todoSuccess(res.data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(todoFailure(`get request error: ${err}`))
        })
    }
}

//Post Request: add 
export const todoPostThunk = (input)=>{
    return (dispatch)=>{
        let token = localStorage.getItem("token");
        axios.post(`${process.env.REACT_APP_API_SERVER}/todo`, {todo:input},
            {headers: {Authorization: `Bearer ${token}`}
        }).then((res)=>{
            dispatch(todoSuccess(res.data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(todoFailure(`post request error: ${err}`))
        })
    }
}

//Put Request: edit
export const todoPutThunk = (input, i)=>{
    return (dispatch)=>{
        let token = localStorage.getItem("token");
        axios.put(`${process.env.REACT_APP_API_SERVER}/todo/${i}`, {todo:input},
            {headers: {Authorization: `Bearer ${token}`}
        }).then((res)=>{
            dispatch(todoSuccess(res.data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(todoFailure(`post request error: ${err}`))
        })
    }
}

//Delete Request: delete 
export const todoDeleteThunk = (i)=>{
    return (dispatch)=>{
        let token = localStorage.getItem("token");
        axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${i}`,
            {headers: {Authorization: `Bearer ${token}`}
        }).then((res)=>{
            dispatch(todoSuccess(res.data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(todoFailure(`delete request error: ${err}`))
        })
    }
}

//Post Request: complete
export const todoCompleteThunk = (i)=>{
    return (dispatch)=>{
        let token = localStorage.getItem("token");
        axios.post(`${process.env.REACT_APP_API_SERVER}/todo/complete/${i}`, null,
            {headers: {Authorization: `Bearer ${token}`}
        }).then((res)=>{
            dispatch(todoSuccess(res.data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(todoFailure(`delete request error: ${err}`))
        })
    }
}
