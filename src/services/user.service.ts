import { ApiResponse } from "../utils/ApiResponse.js";
import { IUser, User } from "../models/user.model.js";
import { UserSession } from "../models/userSession.model.js";
import { createToken } from "../utils/CreateToken.js";
import { sendEmail } from "../utils/mailService.js";
import { VerifyOtp } from "../models/otp.model.js";
import { createDocList } from "../utils/CreateDoc.js";
interface registerInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
type loginInput = Pick<registerInput, "email" | "password">;

type Rule =
  | { required: true; message: string }
  | { pattern: RegExp; message: string }
  | { minLength: number; message: string };

export const registerService = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string
) => {
  try {
    const fields = { username, email, password, confirmPassword };

    const validate = (registerData: registerInput) => {
      const errData: Record<string, string> = {};
      const validationConfig: Record<keyof registerInput, Rule[]> = {
        username: [{ required: true, message: "username is requires" }],
        email: [
          { required: true, message: "email is requires" },
          {
            pattern: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
            message: "please enter proper email",
          },
        ],
        password: [
          { required: true, message: "password is require" },
          { minLength: 8, message: "password should be 8 char long" },
        ],
        confirmPassword: [
          { required: true, message: "password is require" },
          { minLength: 8, message: "password should be 8 char long" },
        ],
      };
      Object.entries(registerData).forEach(([key, value]) => {
        const fieldKey = key as keyof typeof validationConfig;
        validationConfig[fieldKey].some((rule: any) => {
          if (rule.required && !value) {
            errData[key] = rule.message;
            return true;
          }
          if (rule.pattern && !rule.pattern.test(value)) {
            errData[key] = rule.message;
            return true;
          }
          if (rule.minLength && value.length < 8) {
            errData[key] = rule.message;
            return true;
          }
        });
      });
      return errData;
    };
    const err = validate(fields);
    if (Object.keys(err).length !== 0) {
      const response = new ApiResponse(
        404,
        "User detail is not true",
        false,
        err
      );
      return response;
    }
    if (password !== confirmPassword) {
      const err = {
        password: "password is not matched",
      };
      const response = new ApiResponse(
        404,
        "password is not matched with confimPassword",
        false,
        err
      );
      return response;
    }

    const checkUser = await User.findOne({ email: email });
    console.log(checkUser);
    if (checkUser !== null) {
      const response = new ApiResponse(
        404,
        "User has already register on this email",
        false,
        null
      );
      return response;
    }

    if (!role) {
      return new ApiResponse(404, "please defined user role", false, null)
    }
    const user = await User.create({
      username,
      email,
      password,
      role
    });
    if (user && user._id) {
      const property = await createDocList(user?._id.toString())
      const response = new ApiResponse(
        201,
        "user is successfully register",
        false,
        {user,property}
      );
      return response;
    }
  } catch (error) {
    console.log(error);
    const response = new ApiResponse(
      404,
      "Error while register user",
      false,
      null
    );
    return response;
  }
};

export const loginService = async (email: string, password: string) => {
  try {
    const fields = { email, password };
    const validate = (loginData: loginInput) => {
      const errData: Record<string, string> = {};
      const validationConfig: Record<keyof loginInput, Rule[]> = {
        email: [
          { required: true, message: "email is requires" },
          {
            pattern: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
            message: "please enter proper email",
          },
        ],
        password: [
          { required: true, message: "password is require" },
          { minLength: 8, message: "password should be 8 char long" },
        ],
      };
      Object.entries(loginData).forEach(([key, value]) => {
        const fieldKey = key as keyof typeof validationConfig;
        validationConfig[fieldKey].some((rule: any) => {
          if (rule.required && !value) {
            errData[key] = rule.message;
            return true;
          }
          if (rule.pattern && !rule.pattern.test(value)) {
            errData[key] = rule.message;
            return true;
          }
          if (rule.minLength && value.length < 8) {
            errData[key] = rule.message;
            return true;
          }
        });
      });
      return errData;
    };
    const err = validate(fields);
    console.log(err);
    if (Object.keys(err).length !== 0) {
      const response = new ApiResponse(
        404,
        "User detail is not true",
        false,
        err
      );
      return response;
    }

    const user: IUser | null = await User.findOne<IUser>({ email });
    if (!user || user == null) {
      const response = new ApiResponse(
        404,
        "Invalide credentials",
        false,
        null
      );
      return response;
    }
    if (!password || password === null) {
      return null;
    }
    const isPasswordValid = await user.isPasswordCorrect(String(password));

    if (!isPasswordValid) {
      const response = new ApiResponse(
        404,
        "Invalide credentials",
        false,
        null
      );
      return response;
    }

    const allSessions = await UserSession.find({ userSessionId: user.id });
    // console.log("allsession", allSessions);
    if (allSessions.length >= 2) {
      await allSessions[0].deleteOne();
    }

    const session = await UserSession.create({ userSessionId: user._id });
    if (session && session._id) {
      const response = new ApiResponse(
        201,
        "User is login successfully",
        true,
        {
          option: {
            httpOnly: true,
            signed: true,
            maxAge: 60 * 1000 * 60 * 24 * 7,
          },
          session,
        }
      );
      return response;
    }

    const response = new ApiResponse(
      404,
      "error on generating session",
      false,
      null
    );
    return response;
  } catch (error) {
    const response = new ApiResponse(
      401,
      "error while generating session",
      false,
      null
    );
    return response;
  }
};

export const loginJwtService = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      return new ApiResponse(401, "please provide credential", false, null)
    }
    const verifyEmail = await User.findOne({ email })
    if (!verifyEmail || verifyEmail == null) {
      return new ApiResponse(404, "Invalide Credentilas", false, null)
    }
    const isPasswordValid = await verifyEmail?.isPasswordCorrect(String(password));
    if (!isPasswordValid) {
      return new ApiResponse(401, "invalide credentials", false, null)
    }
    const token = createToken(verifyEmail)
    return new ApiResponse(200, "user is login succesfully", true, { verifyEmail, token })
  } catch (error) {
    return new ApiResponse(501, "error while login", false, null)
  }
}

export const logoutService = async (sessionId: string) => {
  try {
    if (!sessionId) {
      const response = new ApiResponse(404, "user is not login", false, null);
      return response;
    }
    const session = await UserSession.findOne({ _id: sessionId });
    if (!session || session == null) {
      const response = new ApiResponse(404, "user is not login", false, null);
      return response;
    }
    if (session._id) {
      const delUserSession = await UserSession.findByIdAndDelete(session._id);
      if (delUserSession == null) {
        const response = new ApiResponse(
          404,
          "session is not found ",
          false,
          null
        );
        return response;
      }
      if (delUserSession?._id) {
        const response = new ApiResponse(
          200,
          "user session is deleted ",
          true,
          delUserSession
        );
        return response;
      }
    }
  } catch (error) {
    const response = new ApiResponse(404, "error while logout", false, null);
    return response;
  }
};

export const listOfUserService = async (page: number, limit: number) => {
  try {
    const skip = page * limit;
    const data = await User.find();
    // .skip(skip).limit(limit)
    if (!data || data == null) {
      return new ApiResponse(401, "Users are not found", false, null);
    }
    return new ApiResponse(200, "List of users", true, data);
  } catch (error) {
    return new ApiResponse(
      501,
      "error while fetching list of users",
      true,
      null
    );
  }
};

export const allSessionsLogoutOfUserByIdService = async (
  userSessionId: string
) => {
  try {
    if (!userSessionId) {
      return new ApiResponse(401, "userSession id is not found ", false, null);
    }
    const data = await UserSession.deleteMany({ userSessionId });
    console.log("deleted", data);
    if (!data) {
      console.log("deleted", data);
    }
    return new ApiResponse(
      201,
      "userSession is deleted succesfully",
      false,
      null
    );
  } catch (error) {
    return new ApiResponse(201, "Error while deleting sessions", false, null);
  }
};

export const logoutUserBySessionIdService = async (sessionId: string) => {
  try {
    if (!sessionId) {
      return new ApiResponse(401, "sessionId id is not found ", false, null);
    }
    const data = await UserSession.deleteOne({ _id: sessionId });
    console.log("deleted", data);
    if (!data) {
      console.log("deleted", data);
    }
    return new ApiResponse(
      201,
      "sessionId is deleted succesfully",
      false,
      null
    );
  } catch (error) {
    return new ApiResponse(201, "Error while deleting sessionId", false, null);
  }
};

export const getAllUserService = async (page: number, limit: number) => {
  try {
    const skip = (page - 1) * limit;
    const projectData: IUser[] = await User.find<IUser>()
      .skip(skip)
      .limit(limit);
    if (projectData && projectData.length > 3) {
      return new ApiResponse(201, 'user Data is succesfully fetch', true, projectData)
    }
    return new ApiResponse(401, 'Error while fetching user', false, null)
  } catch (error) {
    return new ApiResponse(404, "error while getting all user", false, null)
  }
}

export const getUserByIdService = async (userId: string) => {
  try {
    if (!userId) {
      return new ApiResponse(404, "user Id is not found", false, null)
    }
    const user = await User.findById({ _id: userId })
    if (!user) {
      return new ApiResponse(404, "user is not found", false, null)
    }
    return new ApiResponse(200, "user is successfully fetched", true, user)
  } catch (error) {
    return new ApiResponse(501, "error while getting user", false, null)
  }
}

export const updateUserStatusByIdService = async (userId: string, isActive: boolean) => {
  try {
    if (!userId) {
      return new ApiResponse(404, "user Id is not found", false, null)
    }

    const updatedStatus = await User.findByIdAndUpdate(userId, { $set: { isActive: isActive} },{new:true})
    if (!updatedStatus) {
      return new ApiResponse(404, "status is not updating", false, null)
    }
    return new ApiResponse(201, "update successfully", true, updatedStatus)
  } catch (error) {
    return new ApiResponse(501, "error while update status", false, null)
  }
}
export const forgetPasswordService = async (email: string, password: string, confirmPassword: string) => {
  try {
    console.log("object email")
    if (!email || !confirmPassword || !password) {
      return new ApiResponse(404, "require all the  neccessary input credential", false, null)
    }
    if (confirmPassword !== password) {
      return new ApiResponse(401, "password is not matched with confirmpassword", false, null)
    }
    const data = await User.findOne({ email: email })
    console.log(data)
    if (!data || data == null) {
      return new ApiResponse(404, "credentila in not valid", false, null)
    }

    data.password = password;
    const updateUser = await data.save();

    if (!updateUser || updateUser == null) {
      return new ApiResponse(401, "password is not udated", false, null)
    }
    const isPasswordValid = await data?.isPasswordCorrect(String(password));
    if (!isPasswordValid) {
      return new ApiResponse(401, "password is not updated successfully", false, null)
    }
    return new ApiResponse(200, "password update successfully", true, null)
  } catch (error) {
    return new ApiResponse(501, "internal error while updateing password", false, null)
  }
}

export const sendOtpService = async (email: string) => {
  try {
    console.log(email)
    if (!email) {
      return new ApiResponse(401, "enail is not found", false, null)
    }
    const verifyUser = User.findOne({ email })
    if (!verifyUser || verifyUser == null) {
      return new ApiResponse(401, "enmail is not found", false, null)
    }
    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 900000);
    };
    const sendOtp = generateOTP();
    const savedOtp = await VerifyOtp.create({
      email,
      sendOtp,
    });
    console.log(" savedotp", savedOtp)
    if (!savedOtp || savedOtp == null) {
      return new ApiResponse(401, "error while creating otp", false, null)
    }
    let subject = "otp for real state password change"
    let h3 = `<h3>your otp is ${sendOtp} <h3>`
    console.log({ to: email, subject, html: h3 })
    const result = await sendEmail({ to: email, subject, html: h3 })
    return new ApiResponse(201, "otp send succesfully", true, null)
  } catch (error) {
    console.log("object")
    return new ApiResponse(501, "errow while otp sending", false, null)
  }
}
export const verifyUserOtpService = async(otp:number,email:string)=>{
try {
  if(!otp || !email){
    return new ApiResponse(404,"require all fields of data",false,null)
  }
  const savedOtpData = await VerifyOtp.findOne({email:email})
  if(!savedOtpData || savedOtpData == null){
    return new ApiResponse(404,"data is not found or limit will be cross",false,null)
  }
  if(savedOtpData.sendOtp === otp){
    return new ApiResponse(200,"OTP verify successfully",true,null)
  }
    return new ApiResponse(200,"OTP is not matched",false,null)
} catch (error) {
  return new ApiResponse(200,"error while otp matching",false,null)
}
}