import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './views/Layout/Layout';

const products = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
];

function App() {
  return (
    <>
      <h1>Welcome!</h1>
      {/* <Layout /> */}
      {/* <Router>
        <Routes>
          <Route path='/' element={<Manatee />} />
          <Route path='/narwhal' element={<Narwhal />}></Route>
          <Route path='/whale' element={<Whale />}></Route>
        </Routes>
      </Router> */}
      <FiterableProductTable products={products} />
      <Calculator />
    </>
  );
}

const FiterableProductTable = ({ products }) => {
  const [name, setName] = useState('');
  const [stock, setStock] = useState(false);

  return (
    <>
      <SearchBar
        name={name}
        stock={stock}
        setName={setName}
        setStock={setStock}
      />
      <ProductTable name={name} stock={stock} products={products} />
    </>
  );
};

const SearchBar = ({ name, stock, setName, setStock }) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>
        <input
          type="checkbox"
          value={stock}
          onChange={(e) => {
            setStock(e.target.value);
          }}
        />{' '}
        Only show products in stock
      </label>
    </form>
  );
};

const ProductTable = ({ name, stock, products }) => {
  let row = [];
  let lastcategory = '';
  // console.log('name: ', name);
  products.forEach((product, index) => {
    if (product.name.includes(name)) {
      if (product.category != lastcategory) {
        row.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          ></ProductCategoryRow>
        );
      }
      row.push(
        <ProductRow
          name={product.name}
          price={product.price}
          stocked={product.stocked}
          key={index}
        />
      );
      lastcategory = product.category;
    }
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </table>
    </>
  );
};

const ProductCategoryRow = ({ category }) => {
  return (
    <>
      <tr>
        <td colSpan="2">{category}</td>
      </tr>
    </>
  );
};

const ProductRow = ({ name, price, stocked }) => {
  const product_name = stocked ? (
    name
  ) : (
    <span style={{ color: 'red' }}> {name} </span>
  );
  return (
    <>
      <tr>
        <td>{product_name}</td>
        <td>{price}</td>
      </tr>
    </>
  );
};

// Lifting state up

const Calculator = () => {
  const [temperature, setTemperature] = useState(100);
  const [scale, setScale] = useState('c');

  const toCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  const toFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const tryConvert = (temperature, convert) => {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  };

  const handleCelsiusChange = (temperature) => {
    setScale('c');
    setTemperature(temperature);
  };

  const handleFahrenheit = (temperature) => {
    setScale('f');
    setTemperature(temperature);
  };

  function getTemperature() {
    const celsisu =
      scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return { celsius: celsisu, fahrenheit: fahrenheit };
  }

  return (
    <>
      <div>
        <TemperatureInput
          scale="c"
          temperature={getTemperature().celsius}
          onTemperatureChange={handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={getTemperature().fahrenheit}
          onTemperatureChange={handleFahrenheit}
        />
      </div>
      {/* {console.log(getTemperature().celsius)} */}
    </>
  );
};

const TemperatureInput = (props) => {
  const scaleNames = {
    c: 'celsius',
    f: 'fahrenheit',
  };

  const handleTemperatureChange = (e) => {
    console.log(e.target.value);
    props.onTemperatureChange(e.target.value);
  };

  return (
    <>
      <fieldset>
        <legend>Enter temperature in {scaleNames[props.scale]}:</legend>
        {/* {console.log(props.scale)} */}
        <input value={props.temperature} onChange={handleTemperatureChange} />
      </fieldset>
    </>
  );
};

export default App;
