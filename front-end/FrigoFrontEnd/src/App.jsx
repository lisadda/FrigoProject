import { useState } from 'react'
import './App.css'
import { MonFrigo } from './components/MonFrigo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MonFrigo />
    </div>
  )
}

export default App
