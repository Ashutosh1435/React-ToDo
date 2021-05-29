import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

let initializeForm = {
  name: "",
  rate: 0,
  quantity: 0,
  discount: 0,
  tax: 0,
  basicCost: 0,
  taxAmount: 0,
  totalCost: 0
}
let vars = {
  totalBasicCost: 0,
  totalDiscount: 0,
  totaltax: 0,
  totalPrice: 0
}

function App() {

  const [invoice, setInvoice] = useState(initializeForm);
  const [data, setData] = useState([]);
  const [record, setRecord] = useState(vars)
  const clickHandler = () => {
    let basicCost = parseInt(invoice.quantity) * parseInt(invoice.rate);
    const discountAmount = (basicCost * parseInt(invoice.discount)) / 100;
    basicCost = basicCost - parseInt(discountAmount);
    const taxAmount = (basicCost * parseInt(invoice.tax)) / 100;
    const totalCost = basicCost + taxAmount;
    setInvoice((invoice) => ({
      ...invoice,
      basicCost: basicCost,
      taxAmount: taxAmount,
      totalCost: totalCost
    }));
    setData((data) => ([...data,
    {
      name: invoice.name,
      rate: invoice.rate,
      quantity: invoice.quantity,
      discount: invoice.discount,
      tax: invoice.tax,
      basicCost: basicCost.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      totalCost: totalCost.toFixed(2)
    }
    ]))
    setRecord((record) => ({
      totalBasicCost: record.totalBasicCost + basicCost,
      totalDiscount: parseFloat(record.totalDiscount) + parseFloat(invoice.discount),
      totaltax: record.totaltax + taxAmount,
      totalPrice: record.totalPrice + totalCost
    }))
  }
  const deleteHandler = (row) => {
    const newArr = data.filter((item) => item.name !== row.name)
    setData(newArr);
    setInvoice(initializeForm)
    newArr.forEach(element => {
      vars.totalBasicCost += element.basicCost;
      vars.totalDiscount += element.discount;
      vars.totaltax += parseFloat(element.taxAmount);
      vars.totalPrice += element.totalCost;
    });
    setRecord(vars);
  }

  return (
    <div>
      <div>
        <div style={{ marginLeft: 100, textAlign: 'center', margin: 10, position: 'static', display: 'inline-block', width: 300, height: 100, backgroundColor: 'red' }}>
          <h1>Total Basic Cost : {record.totalBasicCost ? record.totalBasicCost : 0}</h1>
        </div>
        <div style={{ textAlign: 'center', margin: 10, position: 'static', display: 'inline-block', width: 300, height: 100, backgroundColor: 'orange' }}>
          <h1>Total Discount : {record.totalDiscount ? record.totalDiscount : 0}</h1>
        </div>
        <div style={{ textAlign: 'center', margin: 10, position: 'static', display: 'inline-block', width: 300, height: 100, backgroundColor: 'blue' }}>
          <h1>Total Tax : {record.totaltax ? record.totaltax : 0}</h1>
        </div>
        <div style={{ margin: 'auto', textAlign: 'center', margin: 10, position: 'static', display: 'inline-block', width: 300, height: 100, backgroundColor: 'lightGreen' }}>
          <h1>Total Price : {record.totalPrice ? record.totalPrice : 0}</h1>
        </div>
      </div>
      <h1 className="center">INVOICE</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Discount %</th>
            <th>Taxes %</th>
            <th>Basic Cost </th>
            <th>Tax Amount</th>
            <th>Total Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><InputGroup size="sm" className="mb-3">
              <FormControl
                placeholder="Name"
                value={invoice.name}
                onChange={(event) => setInvoice({ ...invoice, name: event.target.value })}
                style={{ maxWidth: 60 }}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm" />
            </InputGroup></td>
            <td><InputGroup size="sm" className="mb-3">
              <FormControl
                placeholder="Rate"
                value={!invoice.rate === 0 ? invoice.rate : null}
                onChange={(event) => setInvoice({ ...invoice, rate: event.target.value })}
                style={{ maxWidth: 60 }}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm" />
            </InputGroup></td>
            <td><InputGroup size="sm" className="mb-3">
              <FormControl
                placeholder="Quantity"
                value={!invoice.quantity === 0 ? invoice.quantity : null}
                onChange={(event) => setInvoice({ ...invoice, quantity: event.target.value })}
                style={{ maxWidth: 60 }}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm" />
            </InputGroup></td>
            <td><InputGroup size="sm" className="mb-3">
              <FormControl
                placeholder="Discount"
                value={!invoice.discount === 0 ? invoice.discount : null}
                onChange={(event) => setInvoice({ ...invoice, discount: event.target.value })}
                style={{ maxWidth: 65 }}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm" />
            </InputGroup></td>
            <td><InputGroup size="sm" className="mb-3">
              <FormControl
                placeholder="Taxes"
                value={!invoice.tax === 0 ? invoice.tax : null}
                onChange={(event) => setInvoice({ ...invoice, tax: event.target.value })}
                style={{ maxWidth: 60 }}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm" />
            </InputGroup></td>
            <td>{invoice.basicCost ? invoice.basicCost : null}</td>
            <td>{invoice.taxAmount ? invoice.taxAmount : null}</td>
            <td>{invoice.totalCost ? invoice.totalCost : null}</td>
            <td>
              <button className="primary" onClick={clickHandler}>Add New</button>
            </td>
          </tr>

        </tbody>
      </Table>
      {
        data.length ? (
          <>
            <h1 className="center">ADDED INVOICES</h1>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Rate</th>
                  <th>Quantity</th>
                  <th>Discount %</th>
                  <th>Taxes %</th>
                  <th>Basic Cost </th>
                  <th>Tax Amount</th>
                  <th>Total Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((row) => (
                    <tr>
                      <td><InputGroup size="sm" className="mb-3">
                        <FormControl
                          placeholder="Name"
                          name="name"
                          value={row.name}
                          // onChange={(event) => changeHandler(event)}
                          style={{ maxWidth: 60 }}
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup></td>
                      <td><InputGroup size="sm" className="mb-3">
                        <FormControl
                          placeholder="Rate"
                          name="rate"
                          value={row.rate}
                          // onChange={(event) => changeHandler(event)}
                          style={{ maxWidth: 60 }}
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup></td>
                      <td><InputGroup size="sm" className="mb-3">
                        <FormControl
                          placeholder="Quantity"
                          name="quantity"
                          value={row.quantity}
                          // onChange={(event) => changeHandler(event)}
                          style={{ maxWidth: 60 }}
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup></td>
                      <td><InputGroup size="sm" className="mb-3">
                        <FormControl
                          placeholder="Discount"
                          name="discount"
                          value={row.discount}
                          // onChange={(event) => changeHandler(event)}
                          style={{ maxWidth: 65 }}
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup></td>
                      <td><InputGroup size="sm" className="mb-3">
                        <FormControl
                          placeholder="Taxes"
                          name="tax"
                          value={row.tax}
                          // onChange={(event) => changeHandler(event)}
                          style={{ maxWidth: 60 }}
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm" />
                      </InputGroup></td>
                      <td>{row.basicCost}</td>
                      <td>{row.taxAmount}</td>
                      <td>{row.totalCost}</td>
                      <td>
                        <button className="primary" onClick={() => deleteHandler(row)}>Delete</button>
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </Table>
          </>
        ) : null
      }

    </div>
  )
}

export default App;

