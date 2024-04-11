import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hook/useForm"

const PokemonProvider = ({ children }) => {
    const baseUrl = 'https://pokeapi.co/api/v2/'

    const [allPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [offset, setOffset] = useState(0)

    // Utilizar CustomHook - UseForm
    const { valueSearch, onInputChange, onResetForm} = useForm({
        valueSearch: '',
    })

    // Estados para la aplicación simples
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)

    // Llamar 50 pokemones a la Api
    const getAllPokemons = async (limit = 50) => {
        const res = await fetch(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json()
        // console.log(data)

        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const results = await Promise.all(promises)
        setAllPokemons([...allPokemons, ...results])
        setLoading(false)
        // console.log(results)
    }

    // Llamar todos los pokemones
    const getGlobalPokemons = async() => {
        const res = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`)
        const data = await res.json()
        // console.log(data)

        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const results = await Promise.all(promises)
        setGlobalPokemons(results)
        setLoading(false)
        // console.log(results)
    }

    // Llamar a un pokemon por ID
    const getPokemonByID = async(id) => {
        const res = await fetch(`${baseUrl}pokemon/${id}`)
        const data = await res.json()
        return data
    }

    useEffect(() => {
        getAllPokemons()
    }, [offset])

    useEffect(() => {
        getGlobalPokemons()
    }, [])

    // Btn Cargar mas
    const onClickLoadMore = () => {
        setOffset(offset + 50)
    }

    // Filter Funtion + State
    const [typeSelected, setTypeSelected] = useState({
        grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
    })

    const [filteredPokemons, setFilteredPokemons] = useState([])
    const handleCheckbox = e => {
        setTypeSelected({
            ...typeSelected,
            [e.target.name]: e.target.checked,
        })
        if (e.target.checked){
            const filteredResults = globalPokemons.filter(pokemon =>
                pokemon.types
                    .map(type => type.type.name)
                    .includes(e.target.name)
            )
            console.log(filteredResults)
        }
    }

  return (
    <PokemonContext.Provider value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        getAllPokemons,
        getPokemonByID,
        globalPokemons,
        setGlobalPokemons,
        onClickLoadMore,
        // Loader
        loading,
        setLoading,
        // Btn Filter
        active,
        setActive,
        // Filter Container Checbox
        handleCheckbox,
        filteredPokemons,
    }}>
        {children}
    </PokemonContext.Provider>
  )
}

export default PokemonProvider
