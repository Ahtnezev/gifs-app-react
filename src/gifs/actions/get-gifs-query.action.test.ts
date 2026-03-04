import { describe, expect, test } from "vitest";
import { getGifsByQuery } from "./get-gifs-query.action";

import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from '../api/giphy.api';

import {giphySearchResponseMock} from './../../../tests/mocks/giphy.response.data';


describe('getGifQueryAction', () => {
    const mock = new AxiosMockAdapter(giphyApi);
    
    // test('should return a list of gifs', async() => {
    //     const gifs = await getGifsByQuery('goku');
    //     const [gif1] = gifs;
    //     // console.log(gifs);
    //     // console.log(gif1);
        
    //     expect(gifs.length).toBe(10);

    //     expect(gif1).toStrictEqual({ // toBe
    //         id: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //         title: expect.any(String),
    //         url: expect.any(String)
    //     });
    // });

    test('should rereturn a list of gifs', async () => {
        
        mock.onGet('/search').reply(200, giphySearchResponseMock); // [1,2,3,4]

        const gifs = await getGifsByQuery('goku');
        // console.log(gifs); // status code 404 without giphySearchResponseMock on .reply fn
        expect(gifs.length).toBe(10);
        gifs.forEach((gif) => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');
        });

    });

});