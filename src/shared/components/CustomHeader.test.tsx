import { describe, test, expect } from "vitest";
import {render, screen} from  '@testing-library/react';
import { CustomHeader } from "./CustomHeader";

describe('CustomHeader', () => {
  const title = "Test title";

  test('should render the title correctly', () =>{
    render( <CustomHeader title={title} /> );

    // screen.debug(); // to see the current print in console, if we dont know what is printing
    expect( screen.getByText(title) ).toBeDefined();
  });

  test('should render the description when provided', () =>{
    const description = 'Test description';
    
    render( <CustomHeader title={title} description={description} /> );
    // screen.debug();
    expect( screen.getByText(description) ).toBeDefined();
    expect( screen.getByRole('paragraph') ).toBeDefined();
    expect( screen.getByRole('paragraph').innerHTML ).toBe(description);
  });

  test('should not render description when not provided', () =>{
    // container - render()
    const {container} = render( <CustomHeader title={title} /> );
    // screen.debug();
    // expect( screen.getByRole('paragraph') ).not.toBeDefined(); //~ bad
    const divElement = container.querySelector('.content-center');
    const h1 = divElement?.querySelector('h1');
    const p = divElement?.querySelector('p');
    // console.log(h1?.innerHTML);
    
    expect(h1?.innerHTML).toBe(title);
    expect(p).toBeNull();
  });
  
});