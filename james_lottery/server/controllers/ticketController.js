const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');
const Lottery = require('../models/Lottery');

// Function to generate tickets based on frequency
const generateTickets = (frequency, maxTickets = 100, config = {}) => {
    let tickets = [];
    
    let prefix, startNumber;
    switch (frequency) {
      case "daily":
      case "Daily":
        prefix = config.dailyPrefix || "D"; 
        startNumber = config.dailyStartNumber || 4500; 
        break;
      case "weekly":
      case "Weekly":
        prefix = config.weeklyPrefix || "W"; 
        startNumber = config.weeklyStartNumber || 48000; 
        break;
      case "monthly":
      case "Monthly":
        prefix = config.monthlyPrefix || "M"; 
        startNumber = config.monthlyStartNumber || 21500; 
        break;
      default:
        console.error(`Unknown frequency: ${frequency}`);
        return tickets; 
    }

    console.log(`Generating tickets with prefix: ${prefix}, starting number: ${startNumber}, quantity: ${maxTickets}`);
    
    for (let j = 0; j < maxTickets; j++) {
      const number = startNumber + j; 
      const ticket = `${prefix}-${number}`; 
      tickets.push(ticket); 
      console.log(`Generated ticket: ${ticket}`); // Log each generated ticket
    }
    
    return tickets; 
};
  

// Generate unique tickets for a lottery
// Generate unique tickets for a lottery
exports.generateTickets = async (req, res) => {
  const { quantity } = req.body;
  const { lotteryId } = req.params;

  console.log(`Request to generate tickets: lotteryId = ${lotteryId}, quantity = ${quantity}`);

  try {
    const lottery = await Lottery.findById(lotteryId);
    if (!lottery) {
      console.error('Lottery not found');
      return res.status(404).json({ message: 'Lottery not found' });
    }

    console.log(`Lottery found: ${lottery}`);
    const generatedTickets = generateTickets(lottery.frequency, quantity, {
      dailyPrefix: lottery.prefix,
      dailyStartNumber: lottery.startNumber
    });

    console.log(`Generated tickets: ${generatedTickets}`);

    // Use Promise.all to handle all ticket checks and insertions in parallel
    const uniqueTickets = await Promise.all(
      generatedTickets.map(async (ticketNumber) => {
        const existingTicket = await Ticket.findOne({ number: ticketNumber });
        if (!existingTicket) {
          console.log(`Adding unique ticket: ${ticketNumber}`);
          return { lotteryId, number: ticketNumber };
        } else {
          console.log(`Ticket already exists: ${ticketNumber}`);
          return null; // Ticket already exists
        }
      })
    );

    // Filter out null values
    const ticketsToInsert = uniqueTickets.filter(ticket => ticket !== null);

    if (ticketsToInsert.length > 0) {
      console.log(`Inserting unique tickets: ${ticketsToInsert}`);
      await Ticket.insertMany(ticketsToInsert);
      res.status(201).json(ticketsToInsert);
    } else {
      console.log('All tickets already exist.');
      res.status(409).json({ message: 'All tickets already exist.' });
    }
  } catch (error) {
    console.error('Error generating tickets:', error);
    res.status(500).json({ message: error.message });
  }
};





// GET tickets for a specific lottery
exports.getTickets = async (req, res) => {
    const lotteryId = req.params.lotteryId;
  
    console.log(`Request to fetch tickets for lotteryId: ${lotteryId}`);
  
    try {
        // Fetch tickets for the given lottery ID
        const tickets = await Ticket.find({ lotteryId: lotteryId });
  
        // Check if tickets were found
        if (!tickets || tickets.length === 0) {
            console.log('No tickets found for this lottery.');
            return res.status(404).json({ message: 'No tickets found for this lottery.' });
        }
  
        // Return the tickets as a JSON response
        console.log(`Tickets found for lotteryId ${lotteryId}:`, tickets);
        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Server error while fetching tickets.' });
    }
};