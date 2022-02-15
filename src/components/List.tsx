import React from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import ModalAddNew from './ModalAddNew';

interface Props {
  columns: { header: string; value: string }[];
  data: any[];
  isLoading: boolean;
}

const List = (props: Props): JSX.Element => {
  return (
    <>
      {props.isLoading ? (
        <div style={{ textAlign: 'center', height: '200px' }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <Table bordered striped size="sm" style={{ margin: 0 }}>
          <thead>
            <tr>
              {props.columns.map((column, index) => (
                <th key={index}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.map((el: any, indexRow) => {
              return (
                <tr key={indexRow}>
                  {props.columns.map((item, index) => {
                    return <td key={index}>{el[item.value]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default List;
