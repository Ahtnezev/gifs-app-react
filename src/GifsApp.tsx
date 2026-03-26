import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {

  const {gifs, handleSearch, handleTermClicked, previousTerms} = useGifs();

  return (
    <>
        {/* header */}
        <CustomHeader
            title="Buscador de Gifs"
            description="Descubre y comparte el Gif perfecto"
        />

        {/* search */}
        <SearchBar
            placeholder="Buscar gifs"
            onQuery={handleSearch}
        />

        {/* previous searches */}
        <PreviousSearches
          searches={previousTerms}
          // onLabelClicked={handleTermClick}
          onLabelClicked={(term:string)=> handleTermClicked(term)}
        />

        {/* gifs */}
        <GifList gifs={gifs} />
    </>
  )
}
