import { useContext } from "react"
import { PokemonContext } from "../context/PokemonContext"
import FilterBar from "../components/FilterBar"
import PokemonList from "../components/PokemonList"
import Filtrar from "../icons/Filtrar"

const HomePage = () => {
  const {onClickLoadMore, active, setActive } = useContext(PokemonContext)
  return (
    <>
      <div className='container-filter container'>
				<div className='icon-filter' onClick={() => setActive(!active)}>
					<Filtrar />
					<span>Filtrar</span>
				</div>
			</div>
      <PokemonList />
      <FilterBar />
      <div className="container-btn-load-more container">
        <button className="btn-load-more" onClick={onClickLoadMore}>
          Cargar más
        </button>
      </div>
    </>
  )
}

export default HomePage
