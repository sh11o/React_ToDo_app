import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

function App() {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [contents, setContent] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('')

  useEffect(() => {
    getContents();
  }, []);

  async function getContents() {
    const { data } = await supabase.from('study-record').select()
    setContent(data)
    setIsLoading(false)
  }

  async function insertContents() {
    const { error } = await supabase.from('study-record').insert([{ title, time }])
    if (error) {
      console.error("データ追加エラー:", error);
      return;
    }
    await getContents()
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeTime = (e) => {
    setTime(e.target.value)
  }

  const onClickButton = async () => {
    if(title === '' || time === ''){
      setError('入力されていない項目があります')
      return
    }

    await insertContents()

    setTitle('')
    setTime('')
    setError('')
  }

  const sumTime = contents.reduce((sum, content) => sum + parseInt(content.time), 0)

  if(isLoading) {
    return (
      <h1>
        Loading...
      </h1>
    )
  } else {
    return (
      <>
        <div>
          <p>学習内容 <input type='text' onChange={onChangeTitle} value={title} /> </p>
          <p>学習時間 <input type='text' onChange={onChangeTime} value={time} /> 時間(h)</p>
          <p>入力されている学習内容 : {title}</p>
          <p>入力されている学習時間 : {time}</p>
          <button onClick={onClickButton}>登録</button>
          {error && <p>{error}</p>}
        </div>
        <div>
          {
            contents.map((content) => (
              <p key={content.id}>| {content.title} | {content.time} |</p>
            ))
          }
          <p>合計時間 : {sumTime} 時間</p>
        </div>
      </>
    )
  }
}

export default App
