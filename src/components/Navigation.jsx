import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { Link, Outlet } from 'react-router-dom'
import Logo from '/logo.png'
import Lupa from '../icons/Lupa'

const Navigation = () => {
    // const {} = useContext(PokemonContext)
    // console.log()

  return (
    <>
        <header className='container'>
            <Link to='/' className='logo'>
                <img src={Logo} alt='Logo Pokedex'/>
            </Link>

            <form 
                // onSubmit={onSearchSubmit}
            >
                <div className='form-group'>
                    <Lupa />
                    <input
                        type='search'
                        name='valueSearch'
                        id=''
                        // value={valueSearch}
                        // onChange={onInputChange}
                        placeholder='Buscar nombre de pokemon'
                    />
                </div>

                <button className='btn-search'>Buscar</button>
            </form>
        </header>
      <Outlet />
    </>
  )
}

export default Navigation
