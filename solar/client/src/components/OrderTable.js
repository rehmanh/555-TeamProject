import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./OrderTable.css"
import Cart from './Cart';
import { Container, Row, Col, Table } from 'react-bootstrap';

export default function OrderTable() {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);


    useEffect(() => {
        // Fetch the available items from the backend API
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleItemSelection = (itemId) => {
        const itemIndex = selectedItems.indexOf(itemId);
        if (itemIndex !== -1) {
            // If the item is already selected, remove it from the list
            setSelectedItems(prevItems => prevItems.filter(item => item !== itemId));
        } else {
            // Otherwise, add it to the list
            const selectedItem = items.find(item => item.id === itemId);
            setSelectedItems(prevItems => [...prevItems, itemId]);
        }
    };

    function handleQuantityChange(id, quantity) {
        const newItems = [...items];
        const index = newItems.findIndex(item => item.id === id);
        newItems[index].quantity = quantity;
        setItems(newItems);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Submit the order to the backend API
        axios.post('/api/orders/', { items: selectedItems })
            .then(response => {
                console.log(response.data);
                // Redirect the user to the order confirmation page
                window.location.href = "/orders/" + response.data.id + "/confirm/";

            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleRemoveItem = (itemId) => {
        setSelectedItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    return (
        <div>
            <h1>Order Page</h1>
            <h2>Items</h2>
            <form className="otForm" onSubmit={handleSubmit}>
                {items.map(item => (
                    <ul>
                        <Container>
                            <Row>
                                <Col xs={14} md={10}>
                                    {item.id}. {item.title}
                                </Col>
                                <Col xs={4} md={2}>
                                    <input
                                        type="number"
                                        min="0"
                                        max="99"
                                        value={item.quantity}
                                        onChange={(event) => handleQuantityChange(item.id, parseInt(event.target.value))}
                                    />
                                </Col>
                            </Row>
                        </Container>
                        <div class="line"></div>
                    </ul>
                ))}
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
}