var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { UserSession } from "../models/userSession.model.js";
import { createToken } from "../utils/CreateToken.js";
import { sendEmail } from "../utils/mailService.js";
import { VerifyOtp } from "../models/otp.model.js";
import { createDocList } from "../utils/CreateDoc.js";
export const registerService = (username, email, password, confirmPassword, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = { username, email, password, confirmPassword };
        const validate = (registerData) => {
            const errData = {};
            const validationConfig = {
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
                const fieldKey = key;
                validationConfig[fieldKey].some((rule) => {
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
            const response = new ApiResponse(404, "User detail is not true", false, err);
            return response;
        }
        if (password !== confirmPassword) {
            const err = {
                password: "password is not matched",
            };
            const response = new ApiResponse(404, "password is not matched with confimPassword", false, err);
            return response;
        }
        const checkUser = yield User.findOne({ email: email });
        console.log(checkUser);
        if (checkUser !== null) {
            const response = new ApiResponse(404, "User has already register on this email", false, null);
            return response;
        }
        if (!role) {
            return new ApiResponse(404, "please defined user role", false, null);
        }
        const user = yield User.create({
            username,
            email,
            password,
            role
        });
        if (user && user._id) {
            const property = yield createDocList(user === null || user === void 0 ? void 0 : user._id.toString());
            const response = new ApiResponse(201, "user is successfully register", false, { user, property });
            return response;
        }
    }
    catch (error) {
        console.log(error);
        const response = new ApiResponse(404, "Error while register user", false, null);
        return response;
    }
});
export const loginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = { email, password };
        const validate = (loginData) => {
            const errData = {};
            const validationConfig = {
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
                const fieldKey = key;
                validationConfig[fieldKey].some((rule) => {
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
            const response = new ApiResponse(404, "User detail is not true", false, err);
            return response;
        }
        const user = yield User.findOne({ email });
        if (!user || user == null) {
            const response = new ApiResponse(404, "Invalide credentials", false, null);
            return response;
        }
        if (!password || password === null) {
            return null;
        }
        const isPasswordValid = yield user.isPasswordCorrect(String(password));
        if (!isPasswordValid) {
            const response = new ApiResponse(404, "Invalide credentials", false, null);
            return response;
        }
        const allSessions = yield UserSession.find({ userSessionId: user.id });
        // console.log("allsession", allSessions);
        if (allSessions.length >= 2) {
            yield allSessions[0].deleteOne();
        }
        const session = yield UserSession.create({ userSessionId: user._id });
        if (session && session._id) {
            const response = new ApiResponse(201, "User is login successfully", true, {
                option: {
                    httpOnly: true,
                    signed: true,
                    maxAge: 60 * 1000 * 60 * 24 * 7,
                },
                session,
            });
            return response;
        }
        const response = new ApiResponse(404, "error on generating session", false, null);
        return response;
    }
    catch (error) {
        const response = new ApiResponse(401, "error while generating session", false, null);
        return response;
    }
});
export const loginJwtService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email || !password) {
            return new ApiResponse(401, "please provide credential", false, null);
        }
        const verifyEmail = yield User.findOne({ email });
        if (!verifyEmail || verifyEmail == null) {
            return new ApiResponse(404, "Invalide Credentilas", false, null);
        }
        const isPasswordValid = yield (verifyEmail === null || verifyEmail === void 0 ? void 0 : verifyEmail.isPasswordCorrect(String(password)));
        if (!isPasswordValid) {
            return new ApiResponse(401, "invalide credentials", false, null);
        }
        const token = createToken(verifyEmail);
        return new ApiResponse(200, "user is login succesfully", true, { verifyEmail, token });
    }
    catch (error) {
        return new ApiResponse(501, "error while login", false, null);
    }
});
export const logoutService = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!sessionId) {
            const response = new ApiResponse(404, "user is not login", false, null);
            return response;
        }
        const session = yield UserSession.findOne({ _id: sessionId });
        if (!session || session == null) {
            const response = new ApiResponse(404, "user is not login", false, null);
            return response;
        }
        if (session._id) {
            const delUserSession = yield UserSession.findByIdAndDelete(session._id);
            if (delUserSession == null) {
                const response = new ApiResponse(404, "session is not found ", false, null);
                return response;
            }
            if (delUserSession === null || delUserSession === void 0 ? void 0 : delUserSession._id) {
                const response = new ApiResponse(200, "user session is deleted ", true, delUserSession);
                return response;
            }
        }
    }
    catch (error) {
        const response = new ApiResponse(404, "error while logout", false, null);
        return response;
    }
});
export const listOfUserService = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = page * limit;
        const data = yield User.find().skip(skip).limit(limit);
        if (!data || data == null) {
            return new ApiResponse(401, "Users are not found", false, null);
        }
        return new ApiResponse(200, "List of users", true, data);
    }
    catch (error) {
        return new ApiResponse(501, "error while fetching list of users", true, null);
    }
});
export const allSessionsLogoutOfUserByIdService = (userSessionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userSessionId) {
            return new ApiResponse(401, "userSession id is not found ", false, null);
        }
        const data = yield UserSession.deleteMany({ userSessionId });
        console.log("deleted", data);
        if (!data) {
            console.log("deleted", data);
        }
        return new ApiResponse(201, "userSession is deleted succesfully", false, null);
    }
    catch (error) {
        return new ApiResponse(201, "Error while deleting sessions", false, null);
    }
});
export const logoutUserBySessionIdService = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!sessionId) {
            return new ApiResponse(401, "sessionId id is not found ", false, null);
        }
        const data = yield UserSession.deleteOne({ _id: sessionId });
        console.log("deleted", data);
        if (!data) {
            console.log("deleted", data);
        }
        return new ApiResponse(201, "sessionId is deleted succesfully", false, null);
    }
    catch (error) {
        return new ApiResponse(201, "Error while deleting sessionId", false, null);
    }
});
export const getAllUserService = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * limit;
        const projectData = yield User.find()
            .skip(skip)
            .limit(limit);
        if (projectData && projectData.length > 3) {
            return new ApiResponse(201, 'user Data is succesfully fetch', true, projectData);
        }
        return new ApiResponse(401, 'Error while fetching user', false, null);
    }
    catch (error) {
        return new ApiResponse(404, "error while getting all user", false, null);
    }
});
export const getUserByIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            return new ApiResponse(404, "user Id is not found", false, null);
        }
        const user = yield User.findById({ _id: userId });
        if (!user) {
            return new ApiResponse(404, "user is not found", false, null);
        }
        return new ApiResponse(200, "user is successfully fetched", true, user);
    }
    catch (error) {
        return new ApiResponse(501, "error while getting user", false, null);
    }
});
export const updateUserStatusByIdService = (userId, isActive) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            return new ApiResponse(404, "user Id is not found", false, null);
        }
        const updatedStatus = yield User.findByIdAndUpdate(userId, { $set: { isActive: isActive } }, { new: true });
        if (!updatedStatus) {
            return new ApiResponse(404, "status is not updating", false, null);
        }
        return new ApiResponse(201, "update successfully", true, updatedStatus);
    }
    catch (error) {
        return new ApiResponse(501, "error while update status", false, null);
    }
});
export const forgetPasswordService = (email, password, confirmPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("object email");
        if (!email || !confirmPassword || !password) {
            return new ApiResponse(404, "require all the  neccessary input credential", false, null);
        }
        if (confirmPassword !== password) {
            return new ApiResponse(401, "password is not matched with confirmpassword", false, null);
        }
        const data = yield User.findOne({ email: email });
        console.log(data);
        if (!data || data == null) {
            return new ApiResponse(404, "credentila in not valid", false, null);
        }
        data.password = password;
        const updateUser = yield data.save();
        if (!updateUser || updateUser == null) {
            return new ApiResponse(401, "password is not udated", false, null);
        }
        const isPasswordValid = yield (data === null || data === void 0 ? void 0 : data.isPasswordCorrect(String(password)));
        if (!isPasswordValid) {
            return new ApiResponse(401, "password is not updated successfully", false, null);
        }
        return new ApiResponse(200, "password update successfully", true, null);
    }
    catch (error) {
        return new ApiResponse(501, "internal error while updateing password", false, null);
    }
});
export const sendOtpService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(email);
        if (!email) {
            return new ApiResponse(401, "enail is not found", false, null);
        }
        const verifyUser = User.findOne({ email });
        if (!verifyUser || verifyUser == null) {
            return new ApiResponse(401, "enmail is not found", false, null);
        }
        const generateOTP = () => {
            return Math.floor(100000 + Math.random() * 900000);
        };
        const sendOtp = generateOTP();
        const savedOtp = yield VerifyOtp.create({
            email,
            sendOtp,
        });
        console.log(" savedotp", savedOtp);
        if (!savedOtp || savedOtp == null) {
            return new ApiResponse(401, "error while creating otp", false, null);
        }
        let subject = "otp for real state password change";
        let h3 = `<h3>your otp is ${sendOtp} <h3>`;
        console.log({ to: email, subject, html: h3 });
        const result = yield sendEmail({ to: email, subject, html: h3 });
        return new ApiResponse(201, "otp send succesfully", true, null);
    }
    catch (error) {
        console.log("object");
        return new ApiResponse(501, "errow while otp sending", false, null);
    }
});
export const verifyUserOtpService = (otp, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!otp || !email) {
            return new ApiResponse(404, "require all fields of data", false, null);
        }
        const savedOtpData = yield VerifyOtp.findOne({ email: email });
        if (!savedOtpData || savedOtpData == null) {
            return new ApiResponse(404, "data is not found or limit will be cross", false, null);
        }
        if (savedOtpData.sendOtp === otp) {
            return new ApiResponse(200, "OTP verify successfully", true, null);
        }
        return new ApiResponse(200, "OTP is not matched", false, null);
    }
    catch (error) {
        return new ApiResponse(200, "error while otp matching", false, null);
    }
});
