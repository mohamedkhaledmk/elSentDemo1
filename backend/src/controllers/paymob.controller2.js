import axios from "axios";
import crypto from "crypto";
const wallet_integration_id = process.env.PAYMOB_INTEGRATION_ID_Mobile_Wallet;
let card_integration_id = process.env.PAYMOB_INTEGRATION_ID_Online_Card;
//convert card id into number
card_integration_id = Number(card_integration_id);
const public_key = process.env.PAYMOB_PUBLIC_KEY;
// Controller function
export const holdAmount = async (req, res) => {
  try {
    const userObject = {
      address: "6 october - fourth district - 1114 building number - 6th flat",
      auctions: [],
      bids: [],
      city: "Giza",
      createdAt: "2024-12-25T18:35:01.066Z",
      description: "description",
      email: "xmidos25256@gmail.com",
      emailVerified: true,
      fullName: "xmidos mk",
      notifications: [],
      paymentVerified: false,
      phone: "01120722572",
      products: [],
      profilePicture:
        "https://res.cloudinary.com/dnsxaor2k/image/upload/v1721403078/r4s3ingo0ysqq5hzsqal.jpg",
      reviews: [],
      transactions: [],
      updatedAt: "2024-12-25T23:53:27.938Z",
      userType: "user",
      verificationCode: 940895,
      __v: 0,
      _id: "676c5055a4611b7db6b27e41",
    };

    const auction = req.body.auction || req.body; // Auction details from the request body
    const user = req.user || userObject; // User details stored in req.user
    const [first_name, ...last_nameParts] = user.fullName.split(" ");
    console.log("auction");
    const last_name = last_nameParts.join(" ");
    console.log("alo", wallet_integration_id, card_integration_id);
    // Ensure necessary fields are provided
    if (
      !auction.startingPrice ||
      // !auction.items ||
      !user ||
      !first_name ||
      !user.phone ||
      !user.email
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate a unique special reference
    const specialReference = crypto.randomBytes(16).toString("hex");

    // Prepare the request payload for Paymob API
    const payload = {
      alo1: "s",
      amount: 100000, //amount in cents
      currency: "EGP",
      payment_methods: [card_integration_id], // Replace with actual Integration ID
      // items: auction.items.map((item) => ({
      //   name: item.name,
      //   amount: item.amount, // Amount per item in cents
      //   description: item.description || "Item description",
      //   quantity: item.quantity || 1,
      // })),
      billing_data: {
        apartment: "dummy",
        first_name: first_name,
        last_name: last_name,
        street: "dummy",
        building: "dummy",
        phone_number: user.phone,
        city: "dummy",
        country: "dummy",
        email: user.email,
        floor: "dummy",
        state: "dummy",
        alo2: "s",
      },
      extras: {
        ee: 22,
        user_id: user._id, // Assuming user ID is available in req.user
        auction_id: auction._id, // Assuming auction ID is in the request body
        alo3: 33,
      },
      special_reference: specialReference,
      notification_url:
        "https://a2d3-41-234-201-253.ngrok-free.app/api/v1/paymob/webhook", // Replace with your actual webhook URL
      redirection_url: `http://localhost:5173/single-auction-detail/${auction._id}`, // Replace with your actual redirection URL
    };

    // Make the API request to Paymob
    const response = await axios.post(
      "https://accept.paymob.com/v1/intention/",
      payload,
      {
        headers: {
          Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
        },
      }
    );

    // Return the API response to the client
    const client_secret = response.data.client_secret;
    const redirection_link = `https://accept.paymob.com/unifiedcheckout/?publicKey=${public_key}&clientSecret=${client_secret}`;
    res.status(200).json({ link: redirection_link });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the payment" });
  }
};
export const finalPayment = async (req, res) => {
  try {
    const userObject = {
      address: "6 october - fourth district - 1114 building number - 6th flat",
      auctions: [],
      bids: [],
      city: "Giza",
      createdAt: "2024-12-25T18:35:01.066Z",
      description: "description",
      email: "xmidos25256@gmail.com",
      emailVerified: true,
      fullName: "xmidos mk",
      notifications: [],
      paymentVerified: false,
      phone: "01120722572",
      products: [],
      profilePicture:
        "https://res.cloudinary.com/dnsxaor2k/image/upload/v1721403078/r4s3ingo0ysqq5hzsqal.jpg",
      reviews: [],
      transactions: [],
      updatedAt: "2024-12-25T23:53:27.938Z",
      userType: "user",
      verificationCode: 940895,
      __v: 0,
      _id: "676c5055a4611b7db6b27e41",
    };

    const auction = req.body.auction || req.body; // Auction details from the request body
    const user = req.user || userObject; // User details stored in req.user
    const [first_name, ...last_nameParts] = user.fullName.split(" ");
    const last_name = last_nameParts.join(" ");

    // Ensure necessary fields are provided
    if (
      !auction.startingPrice ||
      !auction.users ||
      !user ||
      !first_name ||
      !user.phone ||
      !user.email
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the user._id exists in the auction users array
    const userExistsInAuction = auction.users.some(
      (auctionUser) => auctionUser._id.toString() === user._id.toString()
    );

    if (!userExistsInAuction) {
      return res.status(400).json({
        error:
          "You must pay the hold amount first before proceeding with the final payment.",
      });
    }

    // Generate a unique special reference
    const specialReference = crypto.randomBytes(16).toString("hex");

    // Prepare the request payload for Paymob API
    const payload = {
      amount: auction.startingPrice || 5000000, // Amount in cents
      currency: "EGP",
      payment_methods: [card_integration_id], // Replace with actual Integration ID
      billing_data: {
        apartment: "dummy",
        first_name: first_name,
        last_name: last_name,
        street: "dummy",
        building: "dummy",
        phone_number: user.phone,
        city: "dummy",
        country: "dummy",
        email: user.email,
        floor: "dummy",
        state: "dummy",
      },
      extras: {
        user_id: user._id, // Assuming user ID is available in req.user
        auction_id: auction._id, // Assuming auction ID is in the request body
      },
      special_reference: specialReference,
      notification_url:
        "https://a2d3-41-234-201-253.ngrok-free.app/api/v1/paymob/webhook-final", // Replace with your actual webhook URL
      redirection_url: `http://localhost:5173/single-auction-detail/${auction._id}`, // Replace with your actual redirection URL
    };

    // Make the API request to Paymob for the final payment
    const response = await axios.post(
      "https://accept.paymob.com/v1/intention/",
      payload,
      {
        headers: {
          Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
        },
      }
    );

    // Return the API response to the client
    const client_secret = response.data.client_secret;
    const redirection_link = `https://accept.paymob.com/unifiedcheckout/?publicKey=${public_key}&clientSecret=${client_secret}`;
    res.status(200).json({ link: redirection_link });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the payment" });
  }
};
