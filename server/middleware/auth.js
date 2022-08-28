import jwt from "jsonwebtoken";
const secret = "test";

const auth = async (req, res, next) => {
  const token = req.cookies.token || "";
  // console.log(token);
  try {
    if(!token){
      return res.status(401).json("You need to login");
    }
    const decodedData = jwt.verify(token, "KEY");

      req.user = {
        username : decodedData.username
      }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.toString()); 
  }
};
export default auth;