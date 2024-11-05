import React, { useEffect, useState } from 'react';

const ManageProducts = () => { // Capitalized "manageProducts" to "ManageProducts"
    // Component logic
    const [products, setProducts] = useState([]);
    const [soldProducts, setSoldProducts] = useState([]); // State for sold products
    const [productDetails, setProductDetails] = useState({ name: '', description: '', category: '', price: '', quantity: '' });
    const [sellDetails, setSellDetails] = useState({ productName: '', quantity: '' });
    const [editProductIndex, setEditProductIndex] = useState(null);

    useEffect(() => {
        const localProducts = JSON.parse(localStorage.getItem('products')) || [];
        const localSoldProducts = JSON.parse(localStorage.getItem('soldProducts')) || [];
        setProducts(localProducts);
        setSoldProducts(localSoldProducts);
    }, []);

    const handleAddProduct = () => {
        const newProduct = {
            name: productDetails.name,
            description: productDetails.description,
            category: productDetails.category,
            price: parseFloat(productDetails.price),
            quantity: parseInt(productDetails.quantity)
        };

        if (!newProduct.name || !newProduct.description || !newProduct.category || isNaN(newProduct.price) || isNaN(newProduct.quantity)) {
            alert('Please fill in all fields correctly.');
            return;
        }

        setProducts([...products, newProduct]);
        localStorage.setItem('products', JSON.stringify([...products, newProduct]));
        setProductDetails({ name: '', description: '', category: '', price: '', quantity: '' });
    }

    const editProduct = (index) => {
        const product = products[index];
        setProductDetails({ name: product.name, description: product.description, category: product.category, price: product.price.toString(), quantity: product.quantity.toString() });
        setEditProductIndex(index);
    }

    const updateProduct = () => {
        const updatedProducts = [...products];
        updatedProducts[editProductIndex] = {
            name: productDetails.name,
            description: productDetails.description,
            category: productDetails.category,
            price: parseFloat(productDetails.price),
            quantity: parseInt(productDetails.quantity)
        };
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setEditProductIndex(null);
        setProductDetails({ name: '', description: '', category: '', price: '', quantity: '' });
    }

    const deleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    }

    const handleSellProduct = () => {
        const { productName, quantity } = sellDetails;
        const productIndex = products.findIndex(product => product.name === productName);

        if (productIndex === -1) {
            alert("Product not found.");
            return;
        }

        const product = products[productIndex];
        const quantityToSell = parseInt(quantity);

        if (isNaN(quantityToSell) || quantityToSell <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        if (quantityToSell > product.quantity) {
            alert("Insufficient stock available.");
            return;
        }

        // Record the sold product
        const soldProduct = {
            name: product.name,
            quantity: quantityToSell,
            price: product.price
        };
        
        // Update the sold products state
        setSoldProducts([...soldProducts, soldProduct]);
        localStorage.setItem('soldProducts', JSON.stringify([...soldProducts, soldProduct]));

        // Deduct the sold quantity
        product.quantity -= quantityToSell;
        const updatedProducts = [...products];
        updatedProducts[productIndex] = product;

        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));

        // Reset sell details
        setSellDetails({ productName: '', quantity: '' });
    }

    const deleteSoldProduct = (index) => {
        const updatedSoldProducts = soldProducts.filter((_, i) => i !== index);
        setSoldProducts(updatedSoldProducts);
        localStorage.setItem('soldProducts', JSON.stringify(updatedSoldProducts));
    }

    return (
        <section>
            <h2>Product Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.name}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={() => editProduct(index)}>Edit</button>
                                <button onClick={() => deleteProduct(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Add Product</h3>
            <input type="text" placeholder="Product Name" value={productDetails.name} onChange={e => setProductDetails({ ...productDetails, name: e.target.value })} />
            <input type="text" placeholder="Product Description" value={productDetails.description} onChange={e => setProductDetails({ ...productDetails, description: e.target.value })} />
            <input type="text" placeholder="Category" value={productDetails.category} onChange={e => setProductDetails({ ...productDetails, category: e.target.value })} />
            <input type="number" placeholder="Price" value={productDetails.price} onChange={e => setProductDetails({ ...productDetails, price: e.target.value })} />
            <input type="number" placeholder="Initial Quantity" value={productDetails.quantity} onChange={e => setProductDetails({ ...productDetails, quantity: e.target.value })} />
            <button onClick={editProductIndex !== null ? updateProduct : handleAddProduct}>
                {editProductIndex !== null ? 'Update Product' : 'Add Product'}
            </button>

            <h3>Sell Product</h3>
            <input
                type="text"
                placeholder="Product Name"
                value={sellDetails.productName}
                onChange={e => setSellDetails({ ...sellDetails, productName: e.target.value })}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={sellDetails.quantity}
                onChange={e => setSellDetails({ ...sellDetails, quantity: e.target.value })}
            />
            <button onClick={handleSellProduct}>Sell Product</button>

            <h3>Sold Products</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity Sold</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {soldProducts.map((soldProduct, index) => (
                        <tr key={`${soldProduct.name}-${index}`}>
                            <td>{soldProduct.name}</td>
                            <td>{soldProduct.quantity}</td>
                            <td>${(soldProduct.price * soldProduct.quantity).toFixed(2)}</td>
                            <td>
                                <button onClick={() => deleteSoldProduct(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default ManageProducts; 