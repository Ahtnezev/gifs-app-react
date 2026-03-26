import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";
import { act, renderHook } from "@testing-library/react";

describe('useCounter', () => {

    // let result;
    // beforeEach(() => {
    //     // console.log('Before each');
    //     const { result:hookValue } = renderHook(() => useCounter());
    //     result = hookValue;
    // });

    // to do test with hooks we need to use renderHook fn
    test('1t.should initilize with default value of 10', () => {
        const { result } = renderHook(() => useCounter());

        expect(result.current.counter).toBe(10);
    });

    test('2t.should initilize with default value 20', () => {
        const initialValue = 20;
        const { result } = renderHook(() => useCounter(initialValue));

        expect(result.current.counter).toBe(initialValue);
    });

    test('3t.should increment counter when handleAdd is called', () => {
        const {result} = renderHook(() => useCounter());

        // if out funct is async we need to put this in act fn too
        act( ()=> { 
            result.current.handleAdd();
        });

        expect(result.current.counter).toBe(11);
    });

    test('4t.should decrement counter when handleSubstract is called', () => {
        const {result} = renderHook(() => useCounter());

        act( ()=> { 
            result.current.handleSubstract();
        });

        expect(result.current.counter).toBe(9);
    });

    test('5t.should reset counter and initialize to your default value', () => {
        const defaultValue = 10;
        const {result} = renderHook(() => useCounter());


        act(()=>{
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
            // result.current.handleReset();
        });

        console.log({counter: result.current.counter});
        expect(result.current.counter).toBe(5); // 

        act(() => {
            result.current.handleReset();
        });

        expect(result.current.counter).toBe(defaultValue); //
    });

});