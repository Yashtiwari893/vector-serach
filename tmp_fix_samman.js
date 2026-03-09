const mongoConnection = require('./utilities/connetion');
const mongoose = require('mongoose');
require('dotenv').config();

async function fix() {
    try {
        const primary = mongoConnection.useDb('exhibitor');
        const User = primary.model('user', new mongoose.Schema({}, {strict: false, timestamps: true}));
        
        console.log("Searching for Samman...");
        const samman = await User.findOne({name: /Samman/i});
        if (samman) {
            console.log("Found Samman:", samman.name, "Current category:", samman.category);
            await User.updateOne({_id: samman._id}, {$set: {category: ['Startup']}});
            console.log("Updated Samman's category to ['Startup']");
        } else {
            console.log("Samman not found.");
        }
        
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

fix();
