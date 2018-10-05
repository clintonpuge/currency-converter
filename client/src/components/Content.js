import React from 'react';
import {
  Button,
  Segment,
  Input,
  Divider,
  Dropdown,
  Message,
} from 'semantic-ui-react';
import Select from 'react-select';

const Content = (props) => {
  const {
    currencies, 
    loading, 
    dropdownOnChange, 
    onSubmit,
    total,
    csvFormErr, 
    formErr,
    onDownload,
    handleMultiChange, 
    onInputChange 
  } = props;
  return (
    <div style={{ marginBottom: '200px', marginTop: '100px' }}>
      <Segment.Group horizontal padded='very'>
        <Segment basic loading={loading}>
          <Input
            label={<Dropdown options={currencies} id="fromCurrency" onChange={dropdownOnChange} search />}
            labelPosition='right'
            placeholder='Amount'
            id='amount'
            onChange={onInputChange}
          />
        </Segment>
        <Segment basic>
          <h3>to</h3>
        </Segment>
        <Segment basic loading={loading}>
          <Dropdown 
            placeholder='Currency' 
            search
            selection 
            options={currencies} 
            id="toCurrency" 
            onChange={dropdownOnChange} 
          />
        </Segment>
        <Segment basic>
          <Button content='Convert' onClick={onSubmit} />
        </Segment>
        <Segment basic>
          <Input disabled placeholder='Total...' value={total} />
        </Segment>
      </Segment.Group>
      { formErr && <Message
          error
          header='There was some errors with your submission'
          list={[
            'You must input a specific amount.',
            'You must select a currency to be converted from the dropdown',
            'You must select at least 1 currency.'
          ]}
        /> }
      <Divider />
      <h2>To CSV</h2>
      <Segment basic loading={loading}>
        <Input
          label={<Dropdown 
            options={currencies} 
            id="fromCurrencyForCsv" 
            onChange={dropdownOnChange} 
            search 
          />}
          labelPosition='right'
          id='amountForcsv'
          onChange={onInputChange}
          placeholder='Currency'
        />
      </Segment>
      <Segment basic>
        <h3>to</h3>
      </Segment>
      <Segment basic loading={loading}>
        <Select
          isMulti
          name="multi-currency"
          options={currencies}
          onChange={handleMultiChange}
          className="basic-multi-select"
          classNamePrefix="select"
          error
        />
      </Segment>
      <Segment basic>
        { csvFormErr && <Message
          error
          header='There was some errors with your submission'
          list={[
            'You must input a specific amount.',
            'You must select a currency to be converted from the dropdown',
            'You must select at least 1 or more currency.'
          ]}
        /> }
        <Button content='Download' onClick={onDownload} />
      </Segment>
    </div>
  );
};

export default Content;
