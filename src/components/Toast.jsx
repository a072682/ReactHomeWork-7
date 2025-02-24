import { useEffect, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Toast as BsToast } from "bootstrap";
import { removeMessage } from "../slice/toastSlice";

const TOAST_DURATION = 2000;

function Toast (){
    const dispatch = useDispatch();
    const messages = useSelector((state)=>{
        return(
            state.toast.messages
        )
    })

    const toastRefs = useRef({});

    useEffect(()=>{
        messages.forEach((message)=>{
            const toastELement = toastRefs.current[message.id];
            if(toastELement){
                const toastInstance = new BsToast(toastELement);
                toastInstance.show();

                setTimeout(()=>{
                    dispatch(removeMessage(message.id))
                }, TOAST_DURATION);
            }
        })
    },[messages])

    const handleDismiss = (message_id) => {
        dispatch(removeMessage(message_id));
    }


    return(
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
            {
                messages.map((messages)=>{
                    return(
                        <div key={messages.id} ref={(el) => toastRefs.current [messages.id] = el} className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className={`toast-header ${messages.status === "success"?("bg-success"):("bg-danger")} text-white`}>
                                <strong className="me-auto">{
                                    messages.status === "success"?("成功"):("失敗")
                                }</strong>
                                <button
                                    onClick={()=>{handleDismiss(messages.id)}}
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="toast-body">{messages.text}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Toast;