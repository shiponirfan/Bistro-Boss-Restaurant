const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-ujyuzy1-shard-00-00.pzomx9u.mongodb.net:27017,ac-ujyuzy1-shard-00-01.pzomx9u.mongodb.net:27017,ac-ujyuzy1-shard-00-02.pzomx9u.mongodb.net:27017/?ssl=true&replicaSet=atlas-lf5h1l-shard-0&authSource=admin&retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Custom Middlewares configuration
const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    await client.connect();

    const userCollection = await client
      .db("bistro-boss-restaurant-db")
      .collection("users");
    const foodMenuCollection = await client
      .db("bistro-boss-restaurant-db")
      .collection("food-menu");
    const reviewCollection = await client
      .db("bistro-boss-restaurant-db")
      .collection("reviews");
    const cartCollection = await client
      .db("bistro-boss-restaurant-db")
      .collection("carts");
    const paymentCollection = await client
      .db("bistro-boss-restaurant-db")
      .collection("payments");

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { userEmail: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // Jwt authorization
    app.post("/api/v1/access_token", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1day",
      });
      res.send({ token });
    });

    // Users Related API
    app.get("/api/v1/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // isAdmin Check
    app.get("/api/v1/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const query = { userEmail: email };
      const user = await userCollection.findOne(query);
      let isAdmin = false;
      if (user) {
        isAdmin = user?.role === "admin";
      }
      res.send({ isAdmin });
    });

    app.post("/api/v1/users", async (req, res) => {
      const user = req.body;
      const query = { userEmail: user.userEmail };
      const userExists = await userCollection.findOne(query);
      if (userExists) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // Users Make Admin
    app.patch(
      "/api/v1/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await userCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    // Users Delete
    app.delete(
      "/api/v1/users/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await userCollection.deleteOne(query);
        res.send(result);
      }
    );

    // Food Menu
    app.get("/api/v1/food-menu", async (req, res) => {
      const result = await foodMenuCollection.find().toArray();
      res.send(result);
    });
    // Single Food Menu
    app.get("/api/v1/food-menu/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await foodMenuCollection.findOne(query);
      res.send(result);
    });

    // Add Food Menu
    app.post(
      "/api/v1/food-menu",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const menu = req.body;
        const result = await foodMenuCollection.insertOne(menu);
        res.send(result);
      }
    );
    // Delete Food Menu
    app.delete(
      "/api/v1/food-menu/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await foodMenuCollection.deleteOne(query);
        res.send(result);
      }
    );
    // Update Food Menu
    app.patch("/api/v1/food-menu/:id", async (req, res) => {
      const id = req.params.id;
      const item = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          name: item.name,
          recipe: item.recipe,
          image: item.image,
          category: item.category,
          price: item.price,
        },
      };
      const result = await foodMenuCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Reviews
    app.get("/api/v1/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    // Get Carts
    app.get("/api/v1/carts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    // Carts
    app.post("/api/v1/carts", verifyToken, async (req, res) => {
      const cart = req.body;
      const result = await cartCollection.insertOne(cart);
      res.send(result);
    });

    // Delete Cart
    app.delete("/api/v1/carts/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    // Stripe Related Api
    app.post("/api/v1/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
    app.post("/api/v1/payments", async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);

      // Remove Cart Items
      const removeQuery = {
        _id: {
          $in: payment.cartsId.map((id) => new ObjectId(id)),
        },
      };

      const deleteResult = await cartCollection.deleteMany(removeQuery);

      res.send({ paymentResult, deleteResult });
    });

    app.get("/api/v1/payments/:email", verifyToken, async (req, res) => {
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const query = { email: req.params.email };
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/api/v1/admin-stats", async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const menuItems = await foodMenuCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();
      const revenueResult = await paymentCollection
        .aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$price" },
            },
          },
        ])
        .toArray();

      const revenue =
        revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

      res.send({
        users,
        menuItems,
        orders,
        revenue,
      });
    });

    // Orders Stats
    app.get("/api/v1/orders-stats", async (req, res) => {
      const result = await paymentCollection
        .aggregate([
          {
            $unwind: "$menuId",
          },
          {
            $lookup: {
              from: "food-menu",
              localField: "menuId",
              foreignField: "_id",
              as: "menuItems",
            },
          },
          {
            $unwind: "$menuItems",
          },
          {
            $group: {
              _id: "$menuItems.category",
              quantity: { $sum: 1 },
              totalRevenue: { $sum: "$menuItems.price" },
            },
          },
        ])
        .toArray();

      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Bistro Boss Restaurant Server");
});
app.listen(port, (req, res) => {
  console.log("Bistro Boss Restaurant Server Running On Port: ", port);
});
