import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [text, setText] = useState('')
  const [time, setTime] = useState('')
  const [contents, setContent] = useState([])
  const [error, setError] = useState('')

  const onChangeText = (e) => {
    setText(e.target.value)
  }

  const onChangeTime = (e) => {
    setTime(e.target.value)
  }

  const onClickButton = () => {
    if(text === '' || time === ''){
      setError('入力されていない項目があります')
      return
    }

    setContent((prevContent) => {
      return [...prevContent, { text, time }]
    })
    setText('')
    setTime('')
    setError('')
  }

  const sumTime = contents.reduce((sum, content) => sum + parseInt(content.time), 0)

  return (
    <>
      <div>
        <p>学習内容 <input type='text' onChange={onChangeText} value={text} /> </p>
        <p>学習時間 <input type='text' onChange={onChangeTime} value={time} /> 時間(h)</p>
        <p>入力されている学習内容 : {text}</p>
        <p>入力されている学習時間 : {time}</p>
        <button onClick={onClickButton}>登録</button>
        {error && <p>{error}</p>}
      </div>
      <div>
        <p>合計時間 : {sumTime} 時間</p>
      </div>
    </>
  )
}

export default App
