const Lottery = require('../models/Lottery');
const Ticket = require('../models/Ticket'); // Ensure you import your Ticket model
const User = require('../models/User'); 


const generateTickets = (frequency, maxTickets = 100) => {
  let tickets = [];
  for (let j = 0; j < maxTickets; j++) {
    let prefix, number;
    if (frequency.toLowerCase() === "daily") {
      prefix = "D";
      number = 4500 + j;
    } else if (frequency.toLowerCase() === "weekly") {
      prefix = "W";
      number = 48000 + j;
    } else if (frequency.toLowerCase() === "monthly") {
      prefix = "M";
      number = 21500 + j;
    }
    const ticket = `${prefix}-${number}`;
    tickets.push(ticket);
  }
  return tickets;
};







// Get all lotteries
exports.getAllLotteries = async (req, res) => {
  try {
    const lotteries = await Lottery.find();
    res.json(lotteries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new lottery
// exports.createLottery = async (req, res) => {
//   const lottery = new Lottery(req.body);
//   try {
//     const savedLottery = await lottery.save();
//     res.status(201).json(savedLottery);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const Lottery = require('../models/Lottery');
// const Ticket = require('../models/Ticket'); // Ensure you import your Ticket model
// const User = require('../models/User');

// Create a new lottery
// exports.createLottery = async (req, res) => {
//   // Validation: Check if required fields are present
//   const { name, frequency } = req.body;

//   console.log("Received request to create lottery:", { name, frequency });

//   // Check if name and frequency are provided
//   if (!name || !frequency) {
//       console.error("Validation failed: Name or frequency is missing.");
//       return res.status(400).json({ message: 'Name and frequency are required.' });
//   }

//   // Optionally, validate frequency
//   const validFrequencies = ['daily', 'weekly', 'monthly'];
//   if (!validFrequencies.includes(frequency.toLowerCase())) {
//       console.error("Validation failed: Invalid frequency provided:", frequency);
//       return res.status(400).json({ message: 'Frequency must be daily, weekly, or monthly.' });
//   }

//   const lottery = new Lottery(req.body);

//   try {
//       console.log("Saving lottery to the database...");
//       const savedLottery = await lottery.save();
//       console.log("Lottery saved successfully:", savedLottery);

//       // Generate tickets for the newly created lottery
//       console.log("Generating tickets for the lottery with frequency:", savedLottery.frequency);
//       const tickets = generateTickets(savedLottery.frequency); // Use the frequency from the lottery object
//       console.log("Tickets generated:", tickets);

//       // Prepare tickets for insertion, filtering out duplicates
//       const uniqueTickets = await Promise.all(tickets.map(async (ticket) => {
//           const exists = await Ticket.findOne({ number: ticket });
//           return exists ? null : { number: ticket, lotteryId: savedLottery._id };
//       }));

//       // Filter out null values
//       const ticketsToInsert = uniqueTickets.filter(ticket => ticket !== null);

//       // Save tickets to the database, only those that are unique
//       if (ticketsToInsert.length > 0) {
//           await Ticket.insertMany(ticketsToInsert);
//           console.log("Tickets saved successfully for lottery ID:", savedLottery._id);
//       } else {
//           console.log("No unique tickets to insert for lottery ID:", savedLottery._id);
//       }

//       res.status(201).json(savedLottery);
      
//   } catch (error) {
//       console.error("Error occurred while creating lottery or generating tickets:", error);
//       res.status(400).json({ message: error.message });
//   }
// };


// exports.createLottery = async (req, res) => {
//   // Validation: Check if required fields are present
//   const { name, frequency } = req.body;

//   console.log("Received request to create lottery:", { name, frequency });

//   // Check if name and frequency are provided
//   if (!name || !frequency) {
//       console.error("Validation failed: Name or frequency is missing.");
//       return res.status(400).json({ message: 'Name and frequency are required.' });
//   }

//   // Optionally, validate frequency
//   const validFrequencies = ['daily', 'weekly', 'monthly'];
//   if (!validFrequencies.includes(frequency.toLowerCase())) {
//       console.error("Validation failed: Invalid frequency provided:", frequency);
//       return res.status(400).json({ message: 'Frequency must be daily, weekly, or monthly.' });
//   }

//   const lottery = new Lottery(req.body);

//   try {
//       console.log("Saving lottery to the database...");
//       const savedLottery = await lottery.save();
//       console.log("Lottery saved successfully:", savedLottery);

//       // Step 1: Fetch existing tickets for this lottery to determine the next number to generate
//       const existingTickets = await Ticket.find({ lotteryId: savedLottery._id }).select('number');
//       const existingNumbers = existingTickets.map(ticket => parseInt(ticket.number.split('-')[1], 10)); // Assuming ticket numbers are formatted as 'prefix-number'

//       // Step 2: Determine the highest existing number
//       const highestExistingNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;

//       // Step 3: Generate new unique ticket numbers
//       console.log("Generating tickets for the lottery with frequency:", savedLottery.frequency);
//       const newTickets = [];
//       const totalTicketsToGenerate = 200; // Adjust this number as needed
//       const prefix = savedLottery.prefix || 'L'; // Use a default prefix if not specified

//       for (let i = 1; i <= totalTicketsToGenerate; i++) {
//           const newTicketNumber = `${prefix}-${highestExistingNumber + i}`;
//           // Only push if it doesn't exist in existing numbers
//           if (!existingNumbers.includes(highestExistingNumber + i)) {
//               newTickets.push({ number: newTicketNumber, lotteryId: savedLottery._id });
//           }
//       }

//       // Step 4: Save unique tickets to the database
//       if (newTickets.length > 0) {
//           await Ticket.insertMany(newTickets);
//           console.log("Tickets saved successfully for lottery ID:", savedLottery._id);
//       } else {
//           console.log("No unique tickets to insert for lottery ID:", savedLottery._id);
//       }

//       res.status(201).json(savedLottery);
      
//   } catch (error) {
//       console.error("Error occurred while creating lottery or generating tickets:", error);
//       res.status(400).json({ message: error.message });
//   }
// };

// exports.createLottery = async (req, res) => {
//   // Validation: Check if required fields are present
//   const { name, frequency } = req.body;

//   console.log("Received request to create lottery:", { name, frequency });

//   // Check if name and frequency are provided
//   if (!name || !frequency) {
//       console.error("Validation failed: Name or frequency is missing.");
//       return res.status(400).json({ message: 'Name and frequency are required.' });
//   }

//   // Optionally, validate frequency
//   const validFrequencies = ['daily', 'weekly', 'monthly'];
//   if (!validFrequencies.includes(frequency.toLowerCase())) {
//       console.error("Validation failed: Invalid frequency provided:", frequency);
//       return res.status(400).json({ message: 'Frequency must be daily, weekly, or monthly.' });
//   }

//   const lottery = new Lottery(req.body);

//   try {
//       console.log("Saving lottery to the database...");
//       const savedLottery = await lottery.save();
//       console.log("Lottery saved successfully:", savedLottery);

//       // Fetch existing ticket numbers for this lottery
//       const existingTickets = await Ticket.find({ lotteryId: savedLottery._id }).select('number');
//       const existingNumbers = new Set(existingTickets.map(ticket => parseInt(ticket.number.split('-')[1], 10))); // Store numbers in a Set for quick lookup

//       const newTickets = [];
//       const totalTicketsToGenerate = 200; // Adjust this number as needed
//       const prefix = savedLottery.prefix || 'L'; // Use a default prefix if not specified

//       let currentNumber = 1000; // Start generating from 1

//       // Generate new unique ticket numbers
//       while (newTickets.length < totalTicketsToGenerate) {
//           // Generate ticket number
//           const ticketNumber = `${prefix}-${currentNumber}`;

//           // Check if the current number already exists
//           if (!existingNumbers.has(currentNumber)) {
//               newTickets.push({ number: ticketNumber, lotteryId: savedLottery._id });
//           }

//           currentNumber++; // Increment to check the next number

//           // Optional: Prevent infinite loop
//           if (currentNumber > 10000) { // Adjust as necessary to prevent infinite loops
//               console.error("Reached maximum number limit for ticket generation. Stopping.");
//               break;
//           }
//       }

//       // Save unique tickets to the database
//       if (newTickets.length > 0) {
//           // Wrap in a try-catch to catch potential errors during insertion
//           try {
//               await Ticket.insertMany(newTickets);
//               console.log("Tickets saved successfully for lottery ID:", savedLottery._id);
//           } catch (insertError) {
//               console.error("Error saving tickets:", insertError);
//               return res.status(400).json({ message: insertError.message });
//           }
//       } else {
//           console.log("No unique tickets to insert for lottery ID:", savedLottery._id);
//       }

//       res.status(201).json(savedLottery);
      
//   } catch (error) {
//       console.error("Error occurred while creating lottery or generating tickets:", error);
//       res.status(400).json({ message: error.message });
//   }
// };


// exports.createLottery = async (req, res) => {
//     // Validation: Check if required fields are present
//     const { name, frequency } = req.body;

//     console.log("Received request to create lottery:", { name, frequency });

//     // Check if name and frequency are provided
//     if (!name || !frequency) {
//         console.error("Validation failed: Name or frequency is missing.");
//         return res.status(400).json({ message: 'Name and frequency are required.' });
//     }

//     // Optionally, validate frequency
//     const validFrequencies = ['daily', 'weekly', 'monthly'];
//     if (!validFrequencies.includes(frequency.toLowerCase())) {
//         console.error("Validation failed: Invalid frequency provided:", frequency);
//         return res.status(400).json({ message: 'Frequency must be daily, weekly, or monthly.' });
//     }

//     const lottery = new Lottery(req.body);

//     try {
//         console.log("Saving lottery to the database...");
//         const savedLottery = await lottery.save();
//         console.log("Lottery saved successfully:", savedLottery);

//         // Fetch existing ticket numbers for this lottery
//         const existingTickets = await Ticket.find({ lotteryId: savedLottery._id }).select('number');
//         const existingNumbers = new Set(existingTickets.map(ticket => parseInt(ticket.number.split('-')[1], 10)));

//         const newTickets = [];
//         const totalTicketsToGenerate = 200; // Adjust this number as needed
//         const prefix = savedLottery.prefix || 'L'; // Use a default prefix if not specified

//         // Determine the starting number for ticket generation
//         let currentNumber = existingNumbers.size > 0 ? Math.max(...Array.from(existingNumbers)) + 1 : 1; // Start from the next number after the max existing number

//         // Generate new unique ticket numbers
//         while (newTickets.length < totalTicketsToGenerate) {
//             // Generate ticket number
//             const ticketNumber = `${prefix}-${currentNumber}`;

//             // Check if the current number already exists in the database
//             const exists = await Ticket.findOne({ number: ticketNumber });
//             if (!exists) {
//                 newTickets.push({ number: ticketNumber, lotteryId: savedLottery._id });
//             }

//             currentNumber++; // Increment to check the next number

//             // Optional: Prevent infinite loop
//             if (currentNumber > 10000) { // Adjust as necessary to prevent infinite loops
//                 console.error("Reached maximum number limit for ticket generation. Stopping.");
//                 break;
//             }
//         }

//         // Save unique tickets to the database
//         if (newTickets.length > 0) {
//             // Wrap in a try-catch to catch potential errors during insertion
//             try {
//                 await Ticket.insertMany(newTickets);
//                 console.log("Tickets saved successfully for lottery ID:", savedLottery._id);
//             } catch (insertError) {
//                 console.error("Error saving tickets:", insertError);
//                 return res.status(400).json({ message: insertError.message });
//             }
//         } else {
//             console.log("No unique tickets to insert for lottery ID:", savedLottery._id);
//         }

//         res.status(201).json(savedLottery);
        
//     } catch (error) {
//         console.error("Error occurred while creating lottery or generating tickets:", error);
//         res.status(400).json({ message: error.message });
//     }
// };

exports.createLottery = async (req, res) => {
  // Validation: Check if required fields are present
  const { name, frequency } = req.body;

  console.log("Received request to create lottery:", { name, frequency });

  // Check if name and frequency are provided
  if (!name || !frequency) {
      console.error("Validation failed: Name or frequency is missing.");
      return res.status(400).json({ message: 'Name and frequency are required.' });
  }

  // Optionally, validate frequency
  const validFrequencies = ['daily', 'weekly', 'monthly'];
  if (!validFrequencies.includes(frequency.toLowerCase())) {
      console.error("Validation failed: Invalid frequency provided:", frequency);
      return res.status(400).json({ message: 'Frequency must be daily, weekly, or monthly.' });
  }

  const lottery = new Lottery(req.body);

  try {
      console.log("Saving lottery to the database...");
      const savedLottery = await lottery.save();
      console.log("Lottery saved successfully:", savedLottery);

      // Fetch existing ticket numbers for this lottery
      const existingTickets = await Ticket.find({ lotteryId: savedLottery._id }).select('number');
      const existingNumbers = new Set(existingTickets.map(ticket => parseInt(ticket.number.split('-')[1], 10)));

      const newTickets = [];
      const totalTicketsToGenerate = 200; // Adjust this number as needed
      const prefix = savedLottery.prefix || 'L'; // Use a default prefix if not specified

      // Determine the starting number for ticket generation
      let currentNumber = existingNumbers.size > 0 ? Math.max(...Array.from(existingNumbers)) + 1 : 1; // Start from the next number after the max existing number

      // Generate new unique ticket numbers
      while (newTickets.length < totalTicketsToGenerate) {
          // Generate ticket number
          const ticketNumber = `${prefix}-${currentNumber}`;

          // Check if the current number already exists in the database
          const exists = await Ticket.findOne({ number: ticketNumber });
          if (!exists) {
              newTickets.push({ number: ticketNumber, lotteryId: savedLottery._id });
          }

          currentNumber++; // Increment to check the next number

          // Optional: Prevent infinite loop
          if (currentNumber > 10000) { // Adjust as necessary to prevent infinite loops
              console.error("Reached maximum number limit for ticket generation. Stopping.");
              break;
          }
      }

      // Save unique tickets to the database
      if (newTickets.length > 0) {
          // Wrap in a try-catch to catch potential errors during insertion
          try {
              await Ticket.insertMany(newTickets);
              console.log("Tickets saved successfully for lottery ID:", savedLottery._id);
          } catch (insertError) {
              console.error("Error saving tickets:", insertError);
              return res.status(400).json({ message: insertError.message });
          }
      } else {
          console.log("No unique tickets to insert for lottery ID:", savedLottery._id);
      }

      res.status(201).json(savedLottery);
      
  } catch (error) {
      console.error("Error occurred while creating lottery or generating tickets:", error);
      res.status(400).json({ message: error.message });
  }
};




// Update a lottery
exports.updateLottery = async (req, res) => {
  const { id } = req.params; // Extract lottery ID from request parameters
  try {
    const updatedLottery = await Lottery.findByIdAndUpdate(id, req.body, { new: true }); // Update the lottery
    if (!updatedLottery) {
      return res.status(404).json({ message: 'Lottery not found' }); // Handle not found case
    }
    res.json(updatedLottery); // Respond with the updated lottery
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
};

// Delete a lottery
exports.deleteLottery = async (req, res) => {
  const { id } = req.params; // Extract lottery ID from request parameters
  try {
    const deletedLottery = await Lottery.findByIdAndDelete(id); // Delete the lottery
    if (!deletedLottery) {
      return res.status(404).json({ message: 'Lottery not found' }); // Handle not found case
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};


// Checkout API
// exports.checkout = async (req, res) => {
//   const { userId, cartItems } = req.body;

//    // Validate userId
//    if (!userId) {
//     return res.status(400).json({ message: "User ID is required." });
//   }
  

//   try {
//     // Fetch the user from the database
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Process each item in the cart and save as a purchase record
//     const purchases = cartItems.map((item) => ({
//       lotteryName: item.name,
//       ticketNumber: item.ticketNumber,
//       quantity: item.quantity,
//       totalPrice: item.quantity * item.price,
//       purchaseDate: new Date()
//     }));

//     // Add the purchases to user's history
//     user.purchaseHistory = [...(user.purchaseHistory || []), ...purchases];
//     await user.save();

//     res.status(200).json({ message: "Purchase successful", purchases });
//   } catch (error) {
//     console.error("Checkout error:", error);
//     res.status(500).json({ message: "An error occurred during checkout" });
//   }
// };



exports.checkout = async (req, res) => {
  const { userId, cartItems } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Example of processing purchase items and calculating total
    const purchaseDetails = cartItems.map(item => ({
      lotteryId: item.lotteryId, // Assuming you have a lotteryId in cart items
      quantity: item.quantity,
      amount: item.price * item.quantity // Assuming there's a price field
    }));

    user.purchaseHistory.push(...purchaseDetails);
    await user.save();

    return res.status(200).json({ message: "Checkout successful." });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
