const { compareSync } = require("bcrypt");
const { response } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ConnectionStates } = require("mongoose");
const user = require("../models/user");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
var { cloudinary } = require("../common-used/cloudinary");
const { uploadFile } = require("../common-used");
const { LogInActivity } = require("./logs");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.verifyEmail = (req, res) => {
  jwt.verify(req.body.token, process.env.SECRET_TOKEN, (error, decodeToken) => {
    if (error) {
      return res.status(400).json({
        message:
          "The verification token was expired or incorrect.Sign up again",
      });
    }
    const { data } = decodeToken;
    const _user = new User({
      ...data,
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(500).json({
          message: "Something went wrong while saving user data",
        });
      }
      if (data) {
        return res.status(200).json({
          message: "User created successfully",
        });
      }
    });
  });
};

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({
        message:
          "We are having some technical issues. Try again after some time",
      });
    }
    if (user) {
      console.log("returning conflicting user response");
      return res.status(409).json({
        message: "User with the same email already exists",
      });
    }
    const data = req.body;
    const token = jwt.sign({ data }, process.env.SECRET_TOKEN, {
      expiresIn: "20m",
    });
    console.log(req.body.email);
    transporter
      .sendMail({
        from: "FA17-BCS-075@isbstudent.comsats.edu.pk",
        to: req.body.email,
        subject: "Account Verification",
        html: `
      <div style="
      height:200px;
            text-align:center;
      ">
<h3>Your account registeration request has been recieved</h3>
  <p style="margin-bottom:50px">Press the following button to verify your email address.</p>
<a href="${process.env.CLIENT_URL}/authentication/activate/${token}" style="
text-decoration:none;
background-color:rgb(51, 104, 198);
padding:14px 24px;
color:rgb(255,255,255);
font-family:Monsteserat;
border-radius:6px;
               width:fit-content;
"
target="_blank"
>
Verify Email
    </a>
</div>
      `,
      })
      .then(() => console.log("sent"));

    res.status(200).json({
      message: "Account verification email sent successfully",
    });
  });
};

exports.resetPassword = (req, res) => {
  const { token, password } = req.body;
  jwt.verify(token, process.env.SECRET_TOKEN, (error, decodedToken) => {
    if (error) {
      return res.status(405).json({
        message: "The token has expired. Please try again from the start",
      });
    }
    const { email } = decodedToken;
    User.findOneAndUpdate({ email }, { password }, (error, data) => {
      if (error) {
        return res.status(400).json({
          message: "There was an error while updating the password try again",
        });
      }
      if (data) {
        return res.status(200).json({
          message: "Password updated successfully.",
        });
      }
    });
  });
};

exports.forgetPassword = async (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      return res.status(400).json({
        message: `Sorry we are having some technical issues`,
      });
    }
    if (user) {
      const token = jwt.sign({ email: user.email }, process.env.SECRET_TOKEN, {
        expiresIn: "20m",
      });
      return user.updateOne({ resetLink: token }, (error, success) => {
        if (error) {
          return res.status(500).json("Error updating reset link");
        }
        transporter.sendMail({
          from: "FA17-BCS-075@isbstudent.comsats.edu.pk",
          to: req.body.email,
          subject: "Reset Password",
          html: `
          <div style="
          height:200px;
                text-align:center;
          ">
    <h3>Your request for password reset has been recieved</h3>
      <p style="margin-bottom:50px">Press the following button to verify your email address.</p>
    <a href="${process.env.CLIENT_URL}/resetPassword/${token}" style="
    text-decoration:none;
    background-color:rgb(51, 104, 198);
    padding:14px 24px;
    color:rgb(255,255,255);
    font-family:Monsteserat;
    border-radius:6px;
                   width:fit-content;
    "
    target="_blank"
    >
    Reset Password
        </a>
    </div>
          `,
        });

        res.status(200).json({
          message: "Account verification email sent successfully",
        });
      });
    } else {
      return res.status(400).json({
        message: "No matching user found",
      });
    }
  });
  // crypto.randomBytes(32,(err,buffer)=>{
  //   if(err){
  //     return res.status(500).json({
  //       message:"We are having some technical issues. Sorry for the inconveniece,"
  //     });
  //   }
  //   const token = buffer.toString("hex");
  // });

  // const { email } = req.body;
  // await User.findOne({ email }).exec((error, user) => {
  //   if (error || !user) {
  //     return res.status(400).json({
  //       heading: "Request Failed",
  //       message: "User with this email address does not exist in the system",
  //     });
  //   }
  //   if (user) {
  //     const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
  //       expiresIn: "20m",
  //     });

  //     return User.updateOne({ resetLink: token }, async (error, success) => {
  //       if (error) {
  //         return res.status(400).json({ error: "password reset link error" });
  //       } else {
  //         transporter.sendMail({
  //           to: user.email,
  //           from: "FA17-BCS-070@isbstudent.comsats.edu.pk",
  //           subject: "Sign up success",
  //           html: "<h1>Welcome to Agricultural Dashboard</h1>",
  //         });

  //         res.json({ message: "check your email" });
  //       }
  //     });
  //   }
  // });
};

exports.updatePassword = (req, res) => {
  const { password } = req.body;
  User.findById(req.user._id, (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "No such user exists in the system",
      });
    }
    if (data) {
      data.password = password;
      data.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "There was an error while updating the password try again",
          });
        }
        if (data) {
          return res.status(200).json({
            message: "Password updated successfully.",
          });
        }
      });
    }
  });
};

exports.refreshUserData = async (req, res) => {
  const user = req.user;
  User.findById(user._id, (error, user) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    if (user) {
      const {
        _id,
        firstname,
        lastname,
        email,
        fullname,
        permissions,
        contactNumber,
        role,
        profilePicture,
      } = user;
      return res.status(200).json({
        user: {
          _id,
          firstname,
          lastname,
          email,
          fullname,
          permissions,
          contactNumber,
          role,
          profilePicture,
        },
      });
    } else {
      return res.status(400).json({
        message: "There was some error",
      });
    }
  });
};

exports.signin = async (req, res) => {
  await User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user.id }, process.env.SECRET_TOKEN, {
          expiresIn: "1h",
        });
        const {
          _id,
          firstname,
          lastname,
          email,
          fullname,
          permissions,
          role,
          contactNumber,
          profilePicture,
        } = user;
        LogInActivity({
          userid: _id,
          request: "signin",
          output: "success",
          description: "",
          error: null,
        });
        return res.status(200).json({
          token,
          user: {
            _id,
            firstname,
            lastname,
            email,
            fullname,
            permissions,
            role,
            profilePicture,
            contactNumber,
          },
        });
      } else {
        return res.status(400).json({
          message: "Wrong password for this email",
        });
      }
    } else {
      console.log("Something wrong");
      return res
        .status(404)
        .json({ message: "This email address does not exist in the system" });
    }
  });
};

exports.getUsers = async (req, res) => {
  await user.find(
    {},
    //profilePicture
    "firstname lastname email role profilePicture",
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      if (data) {
        data = data.map((item) => {
          const { _id, firstname, lastname, email, role, profilePicture } =
            item;
          return {
            user_id: _id,
            firstname,
            lastname,
            email,
            role,
            profilePicture,
          };
        });
        return res.status(200).json(data);
      } else {
        return res.status(401).json({
          message: "The database has no users",
        });
      }
    }
  );

  // response.users = permissions.view_U_Permission
  //   ? await user.find({}, "firstname lastname email role")
  //   : undefined;

  // res.status(200).json({
  //   data: response,
  // });
};

exports.userData = (req, res) => {
  const { id } = req.body;
  console.log(id);
  User.findById(id, "-__v -hash_password", (error, data) => {
    if (error) {
      res.status(400).json({
        error,
      });
    }
    if (data) {
      console.log("returning response");
      res.status(200).json(data);
    }
  });
};

exports.updateUser = async (req, res) => {
  const { user_id } = req.body;
  const profilePicture = req.files[0];
  const uploadedImage = await uploadFile(profilePicture, "userImages");
  console.log(uploadedImage);
  User.findByIdAndUpdate(
    user_id,
    { profilePicture: uploadedImage.url },
    { new: true },
    (error, data) => {
      if (error) {
        console.log("sending errror", error);
        return res.status(400).json({
          error,
        });
      }
      if (data) {
        console.log("sending ok response");
        return res.status(200).json({
          message: "User Profile picture has been updated sucessfully",
        });
      }
    }
  );
};

exports.updateUserInfo = (req, res) => {
  console.log("firstname: ", req.body.data.firstname);
  User.updateOne(
    { _id: req.body.data._id },
    { $set: req.body.data },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          message: "There was some error",
          error,
        });
      }
      if (data.n > 0) {
        res.status(200).json({
          message: "Data updated",
        });
      } else {
        return res.status(409).json({
          message: "No such record exist",
        });
      }
    }
  );
};

exports.deleteUser = async (req, res) => {
  const { usersToDelete } = req.body;
  const response = await user.deleteMany(
    { _id: usersToDelete },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          message: "There was some error deleteing the users",
          error,
        });
      }
      if (data) {
        return res.status(200).json({
          message: "Users delete successfully",
        });
      }
    }
  );
};

exports.addUser = async (req, res) => {
  let { firstname, lastname, email, password, permissions } = req.body;
  permissions = JSON.parse(permissions);
  console.log(permissions);
  const profilePicture = req.files[0];
  const uploadedImage = await uploadFile(profilePicture, "userImages");
  User.findOne({ email }).exec(async (error, user) => {
    if (error) {
      console.log("error: ", error);
      return res.status(400).json({
        message: "There was something wrong",
      });
    }
    if (user) {
      console.log("found a similar user");
      return res.status(400).json({
        message: "User with the same email already exists",
      });
    }

    //   // const uploadedResponse = await cloudinary.uploader.upload(
    //   //   { profile_picture },
    //   //   {
    //   //     upload_preset: "ml_default",
    //   //   }
    //   // );
    //   // console.log(uploadedResponse);
    //   // var result = cloudinary.uploader.upload(
    //   //   req.file.path,
    //   //   function (error, result) {
    //   //     console.log(result);
    //   //   }
    //   // );
    //   // const profilePicture = (await result).secure_url;
    console.log("hittttttt00");
    const _user = new User({
      firstname,
      lastname,
      email,
      role: "internal",
      password,
      permissions,
      profilePicture: uploadedImage.url,
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(500).json({
          message: `${Object.keys(error.keyPattern).map((e) => {
            return e + " or";
          })} is not unique`,
          error: error,
        });
      }
      if (data) {
        console.log("user created successfully");
        return res.status(200).json({
          message: "User created successfully",
        });
      }
    });
  });
};

exports.requireSignin = (req, res, next) => {
  req.user = jwt.verify(req.headers.authorization, process.env.SECRET_TOKEN);
  next();
};
