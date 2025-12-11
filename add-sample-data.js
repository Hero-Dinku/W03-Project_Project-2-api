// save as add-sample-data.js
const mongoose = require('mongoose');
require('dotenv').config();

async function addSampleData() {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const Category = require('./models/Category');
    const Publisher = require('./models/Publisher');
    
    // Add sample categories
    const categories = [
        { name: 'Fiction', description: 'Imaginative narrative works' },
        { name: 'Non-Fiction', description: 'Factual and informative works' },
        { name: 'Science Fiction', description: 'Futuristic and technological themes' }
    ];
    
    for (const catData of categories) {
        const category = new Category(catData);
        await category.save();
        console.log(`Added category: ${catData.name}`);
    }
    
    // Add sample publishers
    const publishers = [
        { name: 'Penguin Random House', location: 'New York, USA', yearFounded: 2013 },
        { name: 'HarperCollins', location: 'London, UK', yearFounded: 1989 },
        { name: 'Simon & Schuster', location: 'New York, USA', yearFounded: 1924 }
    ];
    
    for (const pubData of publishers) {
        const publisher = new Publisher(pubData);
        await publisher.save();
        console.log(`Added publisher: ${pubData.name}`);
    }
    
    console.log('Sample data added successfully!');
    mongoose.disconnect();
}

addSampleData().catch(console.error);
