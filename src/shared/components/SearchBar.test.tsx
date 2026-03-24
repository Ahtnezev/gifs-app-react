import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe('Searchbar', () => {
    test('should render search bar correctly', () => {
        const {container} = render(<SearchBar onQuery={() => {}} />);

        expect(container).toMatchSnapshot(); // create a __snapshots__/<fileName>
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    });
    
    test('should call onQuery with the correct value after 700ms', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'anyaforger' } });

        // screen.debug();
        // await new Promise((resolve) => setTimeout(resolve, 701));
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('anyaforger');
        });
    });

    test('should call only once wuth the last value (debounce)', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: {value:'t'} });
        fireEvent.change(input, { target: {value:'te'} });
        fireEvent.change(input, { target: {value:'tes'} });
        fireEvent.change(input, { target: {value:'test'} });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledWith('test');
            expect(onQuery).toHaveBeenCalledTimes(1);
        });
    });

    test('should call onQuery when button clicked with the input value', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: {value:'wasaa'} });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('wasaa');
    });

    test('should the input has the correct placeholder prop', () => {
        const value = 'Buscar gif';
        render(<SearchBar onQuery={() => {}} placeholder={value} />);

        screen.debug();

        expect(screen.getByPlaceholderText(value)).toBeDefined();



    });

});