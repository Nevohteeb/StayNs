import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
// Nav Components:
import Header from './components/Header'
import Footer from './components/Footer'
// Pages:
import Homepage from './components/Homepage'
import SearchForm from './components/SearchForm'
import Results from './components/Results'
import SingleProperty from './components/SingleProperty'
import EmailForm from './components/EmailForm'


function App() {

  return (
    <HashRouter>
      <Header/>
      <div className='main-container'>
        <Routes>
          {/* Set up individual routes */}
          <Route exact path='/' element={<Homepage/>} />
          <Route exact path='/search' element={<SearchForm/>} />
          <Route exact path='/results' element={<Results/>} />
          <Route path="/property/:id" element={<SingleProperty />} />
          <Route path="/enquire" element={<EmailForm />} />
        </Routes>
      </div>
      <Footer/>
      <Toaster/>
    </HashRouter>
  )
}

export default App
