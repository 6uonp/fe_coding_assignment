import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalAddNew from './components/ModalAddNew';
import { Button, Row } from 'react-bootstrap';
import mockApi from './api/mockApi';
import PaginationCustom from './components/Pagination';
import Menu from './components/Menu';

interface Istate {
  isShowModal: boolean;
  dataList: any[];
  isLoading: boolean;
  totalData: Number;
  pageActive: Number;
  numberOfItems: Number;
}
function App() {
  const [state, setState] = useState<Istate>({
    isShowModal: false,
    dataList: [],
    isLoading: false,
    totalData: 0,
    pageActive: 1,
    numberOfItems: 5,
  });

  useEffect((): void => {
    getAllData();
  }, []);

  useEffect((): void => {
    getData();
  }, [state.pageActive]);

  const toggleModal = () => {
    setState((state) => ({ ...state, isShowModal: !state.isShowModal }));
  };

  const getData = async () => {
    try {
      setState((state) => ({ ...state, isLoading: true }));
      const params = { limit: state.numberOfItems, page: state.pageActive };
      const res: any = await mockApi.getData(params);
      if (res) {
        setState((state) => ({ ...state, dataList: res }));
      }
      setState((state) => ({ ...state, isLoading: false }));
    } catch {
      setState((state) => ({ ...state, isLoading: false }));
    }
  };

  const getAllData = async () => {
    try {
      setState((state) => ({ ...state, isLoading: true }));

      const res: any = await mockApi.getAllData();
      if (res) {
        setState((state) => ({ ...state, totalData: res.length }));
      }
      setState((state) => ({ ...state, isLoading: false }));
    } catch {
      setState((state) => ({ ...state, isLoading: false }));
    }
  };

  const onChangePage = (pageSelet: Number) => {
    setState((state) => ({ ...state, pageActive: pageSelet }));
  };

  const columns = [
    { header: 'Name', value: 'name' },
    { header: 'Email', value: 'email' },
    { header: 'Position', value: 'position' },
  ];

  return (
    <Row className="main__body">
      <section className="col-6 mt-3 wrapper">
        <List
          isLoading={state.isLoading}
          columns={columns}
          data={state.dataList}
        />
        <Button className="col-12 mb-2" onClick={toggleModal}>
          + New
        </Button>
        <ModalAddNew isShow={state.isShowModal} toggleModal={toggleModal} />
        <PaginationCustom
          isLoading={state.isLoading}
          onChangePage={onChangePage}
          totalPage={Math.ceil(
            Number(state.totalData) / Number(state.numberOfItems),
          )}
        />
      </section>
      <section className="col-6 mt-3 wrapper">
        <Menu />
      </section>
    </Row>
  );
}

export default App;
