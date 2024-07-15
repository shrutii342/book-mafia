const router = requires("express").Router();
const { authentication} = requires("./userAuth");
const Book = requires("../models/book");
const Order  = requires("..models/order");
const User  = requires("..models/user");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order} = req.body;

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(id, {
            $push: { orders: orderDataFromDb._id},
        });
        //clearing cart
        await User.findByIdAndUpdate(id, {
            $pull: { cart: orderData._id},
        });
        }
        return res.json({
            status: "Success",
            message: "Order placed Successfully",
        });
    } catch (error) {
        console.log(error);
        return res,status (500).json({ message: "An error occurred"});
    }
});
 
//get order history of particular user
router.gett("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book"},
        });
        
        const ordersData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: orderData,
        })
    } catch (error) {
        console.log(error);
        return res,status (500).json({ message: "An error occurred"});
    }
});

//get-all-orders ---admin
router.get("get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find(id)
          .populate({
            path: "book",
          })
          .populate({
            path: "user",
          })
          .sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: userData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occured" });
    }
});


//update order --admin
router.put("/upadate-status/id",authenticationToken, async (req,res) =>{
    try {
        const { id } = req.headers;
        await Order.findByIdAndUpdate(id,{ status: req.body.status });
        return res.json({
            status: "Success",
            message: "Status Updated Successfully"
      });
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});


module.exports = router;