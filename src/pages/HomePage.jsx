import FilterBar from "../components/FilterBar"
import PokemonList from "../components/PokemonList"
import Filtrar from "../icons/Filtrar"

const HomePage = () => {
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
    </>
  )
}

export default HomePage
