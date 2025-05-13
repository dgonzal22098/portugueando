import { render, screen } from "@testing-library/react";
import Button from "../componentes/Button";
import React from "react";

describe('Button component', () => {
  it('Debería mostrar el texto pasado como prop', () => {
    render(<Button texto="Enviar" type="submit" />);
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  })
})