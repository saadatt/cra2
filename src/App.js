import React, { useState } from 'react';
import './App.css';
import Counter from './Counter';
import AddCounterForm from './AddCounterForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input} from 'reactstrap';


function App() {

    const InitialCountersState = [
        { id: 123, name: 'Counter 1', count: 2 },
        { id: 234, name: 'Counter 2', count: 5 },
        { id: 345, name: 'Counter 3', count: 8 },
        { id: 456, name: 'Counter 4', count: 48 },
    ];

    const [counters, setCounters] = useState(InitialCountersState);
    const [isOpenModalDeleteConfirmation, setIsOpenModalDeleteConfirmation] = useState(false);
    const [confirmModalOriginName, setConfirmModalOriginName ] = useState();
    const [confirmModalOriginId, setConfirmModalOriginId ] = useState();
    const [isActiveDeleteConfirmationButton, setIsActiveDeleteConfirmationButton]= useState(false);
    const [confirmUserInputValue, setConfirmUserInputValue]= useState();

    const resetTotalCount = () => {

        console.log('resetTotalCount');
        const newCounters = counters.map(el => ({ ...el, count: 0 }));
        setCounters(newCounters);
    };

    const incrementCounter = (id) => {
        console.log('INC ' + id);
        const index = counters.findIndex(el => el.id === id);
        const newCounters = [...counters];
        newCounters[index].count = newCounters[index].count + 1;
        setCounters(newCounters);
    };

    const decrementCounter = (id) => {
        console.log('DECR ' + id);
        const newCounters = counters.map(el => {
            if (el.id === id) return { ...el, count: el.count - 1 };
            return el;
        });
        setCounters(newCounters);
    };


    const confirmRemoveCounter = (id, name) => {
        setIsOpenModalDeleteConfirmation(true);
        setConfirmModalOriginName(name);
        setConfirmModalOriginId(id);
        //const newCounters = counters.filter(el => el.id !== id);
        //setCounters(newCounters);
    };
    const removeConfirmed = () => {
        const newCounters = counters.filter(el => el.id !==confirmModalOriginId);
        setCounters(newCounters);
        setIsOpenModalDeleteConfirmation(false);
        setIsActiveDeleteConfirmationButton(false);
    };

    const confirmDeleteCancel =() => {
        setIsOpenModalDeleteConfirmation(false);
        setIsActiveDeleteConfirmationButton(false);
    }
    const addCounter = (name, count) => {
        const newCounters = [...counters, {
            id: Math.random(),
            name,
            count: count
        }];
        setCounters(newCounters);
    };

    const modalConfirmationUserInputChange = (e) => {
      const inputText = e.target.value;
      if(inputText === confirmModalOriginName) {
          setIsActiveDeleteConfirmationButton(inputText.trim().toLowerCase() ===confirmModalOriginName.trim().toLowerCase());
      }
    }


    return (
        <div className="container">
            <h1>Counters</h1>

            Total {counters.reduce((acc, cur) => acc + cur.count, 0)}
            <button onClick={resetTotalCount} className="btn btn-danger">Reset total count</button>

            <hr />

            {
                counters.map(el => <Counter key={el.id}
                                            id={el.id}
                                            name={el.name}
                                            count={el.count}
                                            increment={incrementCounter}
                                            decrement={decrementCounter}
                                            remove={confirmRemoveCounter}
                />)
            }

            <hr />

            <AddCounterForm onSubmit={addCounter} />

                <Button color="primary" >primary</Button>{' '}
                <Modal isOpen={isOpenModalDeleteConfirmation} toggle={confirmDeleteCancel}>
                    <ModalHeader >Delete Confirmation</ModalHeader>
                    <ModalBody>
                        <p>
                       Enter counter name <strong>{confirmModalOriginName}</strong> to delete
                        </p>
                        {confirmUserInputValue}

                        <FormGroup>

                            <Input  type="email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="with a placeholder"
                                    onChange={modalConfirmationUserInputChange}
                            />

                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" disabled={!isActiveDeleteConfirmationButton} onClick={removeConfirmed}>Delete</Button>{' '}
                        <Button color="light" >Cancel</Button>
                    </ModalFooter>
                </Modal>

            </div>


    );
}

export default App;