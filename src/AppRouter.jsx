import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import PokemonPage from './pages/PokemonPage'
import SearchPage from './pages/SearchPage'

const AppRouter = () => {
  return <Routes>
    <Route path='/' element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path='pokemon/:id' element={<PokemonPage />} />
        <Route path='search' element={<SearchPage />}/>
    </Route>
    <Route path='*' element={<Navigate to='/' />} />
  </Routes>
}

export default AppRouter
