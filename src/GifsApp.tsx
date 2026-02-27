import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHader } from "./shared/components/CustomHader"
import { SearchBar } from "./shared/components/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {

  const {gifs, handleSearch, handleTermClick, previousTerms} = useGifs();

  return (
    <>
        {/* header */}
        <CustomHader
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
          onLabelClicked={(term:string)=> handleTermClick(term)}
        />

        {/* gifs */}
        <GifList gifs={gifs} />
    </>
  )
}
