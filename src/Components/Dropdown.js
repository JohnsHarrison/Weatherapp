import { useEffect,useState } from "react"

function Dropdown({parentState,handleAPI,setParentState}){

    const [response,setResponse] = useState([])
    const [isOpen, setIsOpen] = useState([false])

    async function APICall(){
        setResponse(await handleAPI())
    }

    useEffect(()=>{
        return()=>{
            APICall()
        }
        
    },[handleAPI,parentState])

    const responseList = response.map((result,id)=>{
        return<div key={id} onClick={()=>{setParentState(result)}}>{result.LocalizedName}</div>
    })

    return(
        <div onClick={()=>{setIsOpen(!isOpen)}}>
            {!parentState.ID ? <p>SELECT</p> : <p>{parentState.LocalizedName}</p>}
            {
                !isOpen && <div>{responseList}</div>
            }
        </div>
    )
}

export default Dropdown