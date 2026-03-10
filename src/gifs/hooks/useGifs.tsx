import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-query.action";

// cache
// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
    const [gifs, setGifs] = useState<Gif[]>([]); // know what type we need to received :p
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const gifsCache = useRef<Record<string, Gif[]>>({}); // no causa renders

    const handleTermClick = async (term: string) => {
        if(gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }

        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
    };

    const handleSearch = async (query: string = '') => {
        query = query.trim().toLocaleLowerCase();

        if (query.length === 0) return;
        if (previousTerms.includes(query)) return;

        // #1
        // const currentTerms = previousTerms.slice(0, 6);
        // currentTerms.unshift(query);
        // setPreviousTerms(currentTerms);

        // #2
        setPreviousTerms([query, ...previousTerms].splice(0, 7));

        const gifs = await getGifsByQuery(query);
        setGifs(gifs);

        gifsCache.current[query] = gifs;
        // se vuelve a renderizar y se pierde la info previa, sacamos del component (opcional), usaremos useRef
        // console.log(gifsCache);
    }


    return {
        // values
        gifs,
        previousTerms,

        // methods / actions
        handleSearch,
        handleTermClick
    }
}
