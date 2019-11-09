import React from 'react';
import ReactDom from 'react-dom';

class ProductRow extends React.Component {
  render = () => {
    const { product } = this.props;
    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}
class ProductCategoryRow extends React.Component {
  render = () => {
    const { product } = this.props;
    return (
      <tr>
        <th colSpan='2'>{product.category}</th>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render = () => {
    const { products } = this.props;
    let lastCategory = null;
    const rows = [];
    products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow product={product} key={product.category} />
        );
      }
      rows.push(
        <ProductRow product={product} key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render = () => {
    return (
      <form>
        <input type='text' placeholder='search'/>
        <p>
          <input type="checkbox" />{' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount = () => {
    this.timerID = setInterval(() => { this.tick() }, 1000);
  }

  componentWillMount = () => {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render = () => {
    return <h2>{this.state.date.toLocaleTimeString()}.</h2>
  }
}

class FilterableProductTable extends React.Component {
  render = () => {
    const { products } = this.props;
    return (
      <>
        <Clock />
        <SearchBar />
        <ProductTable products={products}/>
      </>
    );
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

const attachable = document.getElementById('root');
const app = <FilterableProductTable products={PRODUCTS} />
ReactDom.render(app, attachable);
