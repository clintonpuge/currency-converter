import React, { Component } from 'react';
import {
  Header,
} from 'semantic-ui-react';
import { getCurrencies, onConvertCurrencies, onDownload } from './actions';
import { connect } from "react-redux";
import './App.css';
import Content from './components/Content.js';

class App extends Component {

  state = {
    currencies: []
  }

  componentDidMount() {
    this.props.getCurrencies();
  }

  dropdownOnChange = (ev, { value, id }) => {
    this.setState({
      [id]: value
    });
  }

  onInputChange = (ev) => {
    const { id, value } = ev.target;
    this.setState({ [id]: value });
  }

  handleMultiChange = (selectedOption) => {
    this.setState({ currencies: selectedOption });
  }

  onSubmit = () => {
    const { fromCurrency, toCurrency, amount } = this.state;
    // basic validation
    if (fromCurrency !== '' && toCurrency !== '' && amount !== '') {
      this.props.onConvertCurrencies({ fromCurrency, toCurrency, amount });
    }
  }

  onDownload = () => {
    const { amountForcsv, currencies, fromCurrencyForCsv } = this.state;
    if (amountForcsv && currencies && fromCurrencyForCsv) {
      this.props.onDownload({ currencies, amountForcsv, fromCurrencyForCsv });
    }
  }
  
  render() {
    const style = {
      h1: {
        marginTop: '3em',
      },
    }
    const { currencies, loading, total } = this.props;
    return (
      <div className="App">
        <Header as='h1' content='A Currency Converter Application' style={style.h1} />
        <Content
          total={total}
          loading={loading}
          currencies={currencies}
          onSubmit={this.onSubmit}
          onDownload={this.onDownload}
          onInputChange={this.onInputChange} 
          dropdownOnChange={this.dropdownOnChange}
          handleMultiChange={this.handleMultiChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    currencies: state.currencies,
    error: state.error,
    total: state.total
  };
};

export default connect(mapStateToProps, { getCurrencies, onConvertCurrencies, onDownload })(App);
