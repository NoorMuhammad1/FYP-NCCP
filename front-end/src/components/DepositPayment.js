import Paper          from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table          from '@material-ui/core/Table';
import TableBody      from '@material-ui/core/TableBody';
import TableCell      from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead      from '@material-ui/core/TableHead';
import TableRow       from '@material-ui/core/TableRow';
import React          from 'react';
import { Button }     from 'react-bootstrap';

const TAX_RATE = 0.07;

const useStyles = makeStyles({
                               table: {
                                 minWidth: 700,

                               },
                             });

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('coccus', 5, 1.15),
  createRow('sarcinae', 3, 45.99),
  createRow('staphylococci', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function () {
  const classes = useStyles();

  return (
    <TableContainer style={styles.tablecontainerstyling}


                    component={Paper}>
      <Table style={
        styles.tablestyling
      }


             className={classes.table} aria-label="spanning table">

        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Payment invoice
            </TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Deposit</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Microorganism Name</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
        <div style={styles.buttoncontainer}>
          <Button style={styles.buttoncontainerinner}>
            Pay with Credit/Debit Card
          </Button>
        </div>


      </Table>

    </TableContainer>

  );
}

const styles = {

  // tablestyling:{

  // //   border: '1px solid red',
  //   width: 800,

  // },

  tablestyling: {
    width: 900

  },

  tablecontainerstyling: {

    // border: '1px solid red',
    height   : 500,
    marginTop: 10,
    width    : 1000
  },

  buttoncontainer     : {

    display       : 'flex-right',
    justifyContent: 'flex-end',
    alignItems    : 'center',

  },
  buttoncontainerinner: {
    fontSize  : 10,
    background: 'sky-blue',
  }

};

