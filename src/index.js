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
    const { filterText, inStockOnly, products } = this.props;
    let lastCategory = null;
    const rows = [];
    products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow product={product} key={product.category} />
        );
      }
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
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
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render = () => {
    const { filterText, inStockOnly } = this.props;
    return (
      <form>
        <input type='text' placeholder='search' value={filterText} onChange={this.handleFilterTextChange} />
        <p>
          <input type='checkbox' checked={inStockOnly} onChange={this.handleInStockChange} />{' '}
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
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    }

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render = () => {
    const { products } = this.props;
    return (
      <>
        <Clock />
        <SearchBar 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable 
          products={products} 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
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
