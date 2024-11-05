import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [totalStockValue, setTotalStockValue] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const localProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(localProducts);
        calculateTotalStockValue(localProducts);
    }, []);

    const calculateTotalStockValue = (products) => {
        const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        setTotalStockValue(total);
    }

    return (
        <section>
            <h2>Dashboard</h2>
            <h3>Total Stock Value: ${totalStockValue.toFixed(2)}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.name}>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Dashboard;