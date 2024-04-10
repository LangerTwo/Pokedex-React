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
    }, [])

    useEffect(() => {
        getGlobalPokemons()
    }, [])

  return (
    <PokemonContext.Provider value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        getAllPokemons,
        getPokemonByID,
    }}>
        {children}
    </PokemonContext.Provider>
  )
}

export default PokemonProvider
