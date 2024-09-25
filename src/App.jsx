import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Stats from './components/stats/Stats'
import Groups from './components/groups/Groups'
import NotFound from './components/notFound/NotFound'
import Layout from './components/layout/Layout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home/>}/>
        <Route path='stats' element={<Stats/>}/>
        <Route path='groups' element={<Groups/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}

export default App
