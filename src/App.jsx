import { useState, useCallback, useEffect,useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
// useRef

 const passwordRef =useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzasdfghjklpoiuytrewq";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <br />
        <div className="flex shadow rounded-lg overflow-hidden mb-4 text-center">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
           onClick = {copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
           
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
        </div>

        <div className="flex items-center gap-x-2 mt-3">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label className="text-white">Include Numbers</label>
        </div>

        <div className="flex items-center gap-x-2 mt-2">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label className="text-white">Include Special Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
