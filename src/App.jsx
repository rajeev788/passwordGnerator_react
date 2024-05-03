import { useState ,useCallback,useEffect,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef=useRef(null)
  const passwordgenerator =useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrdtuvwxyz"
    if(numberAllowed) str+='0123456789'
    if(characterAllowed) str+='#@$%^&*()_+><??{}||'
    for (let i = 1; i <=length; i++) {
      const char = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)

  }
    ,[length,numberAllowed,characterAllowed,setPassword])
  const copypassword=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordgenerator()},[length,numberAllowed,characterAllowed,passwordgenerator])

  return (
  <div className='w-full max-w-md px-3 py-2 mx-auto bg-gray-200 shadow-2xl rounded-xl outline-4 ' ><h1 className='my-4 text-cyan-600'>Password generator</h1>
    <div className='mb-4 overflow-hidden rounded-lg'>
      <input
      type="text"
      value={password}
      className="w-full px-3 py-1 rounded-sm shadow-md outline-none"
      placeholder='password'
      readOnly
      ref={passwordRef}/>
     
      
    <button onClick={copypassword} className=' text-black  outline-none px-3 py-0.5 shrink-0 bg-blue-500 '>copy</button>
      
    </div>
    <div className='flex gap-2 text-sm text-red-500 shadow-inner'>
      <div className='items-center felx gap-x-1'>
        <input type='range' min={6} max={40}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}></input>
        <label htmlFor='length'>length:{length}</label>
      </div>
      <div className='flex items-center gap-2 rounded-md'>
        <input type="checkbox" 
        className='rounded-md'
        defaultChecked={numberAllowed}
        id="number input" 
        onChange={()=> {setnumberAllowed((prev)=>!prev);}} />    <label htmlFor='number input'>numbers</label> 
        </div>
        <div className='flex items-center gap-2 bg-green'>
        <input type="checkbox" 
        className='rounded'
        defaultChecked={numberAllowed}
        id="charcater input" 
        onChange={()=> {setcharacterAllowed((prev)=>!prev);}} />    <label htmlFor='charater input'>character</label> 
        </div>
    </div>
  

  </div>
  )
}

export default App
