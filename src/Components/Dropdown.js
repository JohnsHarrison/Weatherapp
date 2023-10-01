import { useEffect,useState } from "react"
import { AiFillCaretLeft,AiFillCaretDown } from "react-icons/ai";

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
        return<div className="dropdown_option" key={id} onClick={()=>{setParentState(result)}}>{result.LocalizedName}</div>
    })

    return(
        <div className="box" onClick={()=>{setIsOpen(!isOpen)}}>
            <div className="dropdown">
                {!parentState.ID ? <p className="dropdown_label">SELECT</p> : <p className="dropdown_label">{parentState.LocalizedName}</p>}  
                <div style={{"display":"flex"}}>
                    {
                        isOpen ? <AiFillCaretLeft/> : <AiFillCaretDown/>
                    }
                </div>
                  
            </div>
           
            {
                !isOpen && <div className="dropdown_content">{responseList}</div>
            }
        </div>
    )
}

export default Dropdown