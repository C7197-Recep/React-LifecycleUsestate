import logo from './logo.svg';
import './App.css';
import TestComponent from "./TestComponent";
import {useState} from "react";

function App() {

  /*SINIFA İHTİYAÇ DUYMADAN GLOBAL STATE DEĞİŞKENİ VE 
  BU DEĞİİKENİ DEĞİŞTİRMEK İÇİN FONKSİYON OLUŞURMAK İSTERSEK,
  useState Hookunu KULLANIYORUZ.
  BURADAKİ isVisible VS.NİN TestComponent.js İÇİNDEKİLERLE İLGİSİ YOK*/
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="App">
      {isVisible ? 
        <TestComponent color="red"></TestComponent>
      : 
        null
      }
      <button onClick={()=>setIsVisible(!isVisible)}>REMOVE</button>
    </div>
  );
}

export default App;
