const express = require('express');
const router = express.Router();
const Order = require("./Order");

const menuItems = [
  { id: 1, name: "Vanilla Scoop", price: 50, category: "ICE CREAM", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Chocolate Scoop", price: 55, category: "ICE CREAM", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Strawberry Scoop", price: 55, category: "ICE CREAM", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Mango Scoop", price: 60, category: "ICE CREAM", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Butterscotch Scoop", price: 60, category: "ICE CREAM", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Orange Juice", price: 40, category: "JUICE", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Mango Juice", price: 45, category: "JUICE", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Pineapple Juice", price: 45, category: "JUICE", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80" },
  { id: 9, name: "Watermelon Juice", price: 40, category: "JUICE", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80" },
  { id: 10, name: "Mixed Fruit Juice", price: 50, category: "JUICE", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80" },
];

router.get('/', (req, res) => {
  res.json(menuItems);
});

router.get('/popular', async (req, res) => {
  try {
    const orders = await Order.find();
    let itemCounts = {};
    
    orders.forEach(order => {
      order.items.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
      });
    });
    
    let popularItem = "Mango Juice"; 
    let max = 0;
    
    for (let item in itemCounts) {
      if (itemCounts[item] > max) {
        max = itemCounts[item];
        popularItem = item;
      }
    }
    
    res.json({ popular: { name: popularItem } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
