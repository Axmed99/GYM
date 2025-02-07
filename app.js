// import express from "express";
// import { config } from "dotenv";
// import cors from "cors";
// import { sendEmail } from "./utils/sendEmail.js";

// // Load environment variables from .env file
// config({ path: "./config.env" });  // Or just `config()` if the file is named `.env`


// const app = express();
// const router = express.Router();

// // Cors settings
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["POST"],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Endpoint for sending email
// router.post("/send/mail", async (req, res, next) => {
//   const { name, email, message } = req.body;
//   if (!name || !email || !message) {
//     return next(
//       res.status(400).json({
//         success: false,
//         message: "Please provide all details",
//       })
//     );
//   }
//   try {
//     await sendEmail({
//       email: "merndeveloper4@gmail.com",
//       subject: "GYM WEBSITE CONTACT",
//       message,
//       userEmail: email,
//     });
//     res.status(200).json({
//       success: true,
//       message: "Message Sent Successfully.",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });

// app.use(router);

// // Start the server
// app.listen(process.env.PORT, () => {
//   console.log(`Server listening at port ${process.env.PORT}`);
// });

// import express from "express";
// import { config } from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// // import { sendEmail } from "./utils/sendEmail.js";

// const app = express();
// const router = express.Router();

// config({ path: "./config.env" });

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));


// // Define a schema and model for contacts
// const contactSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   message: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// const Contact = mongoose.model("Contact", contactSchema);

// // Middleware
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["POST"],
//     credentials: true,
//   })
// );

// // Route to send email and save data
// router.post("/send/mail", async (req, res, next) => {
//   const { name, email, message } = req.body;
//   if (!name || !email || !message) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide all details",
//     });
//   }

//   try {
//     // Send email
//     await sendEmail({
//       email: "merndeveloper4@gmail.com",
//       subject: "GYM WEBSITE CONTACT",
//       message,
//       userEmail: email,
//     });

//     // Save contact to MongoDB
//     const contact = new Contact({ name, email, message });
//     await contact.save();

//     res.status(200).json({
//       success: true,
//       message: "Message Sent Successfully and saved to DB.",
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });

// app.use(router);

// // Start the server
// app.listen()




import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
// import { sendEmail } from "./utils/sendEmail.js"; // Uncomment if you have this utility

const app = express();
const router = express.Router();

config({ path: "./config.env" });

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema and model for contacts
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// Middleware
app.use(express.json()); // Parses JSON in the request body
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);

// Route to send email and save data
router.post("/send/mail", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }

  try {
    // If sendEmail is implemented, uncomment this:
    // await sendEmail({
    //   email: "merndeveloper4@gmail.com",
    //   subject: "GYM WEBSITE CONTACT",
    //   message,
    //   userEmail: email,
    // });

    // Save contact to MongoDB
    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(200).json({
      success: true,
      message: "Message Sent Successfully and saved to DB.",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.use(router);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
