const exprees = require('express');
const bcrypt = require('bcryptjs');

const router = exprees.Router();

require('../db/conn');
const User = require('../models/userSchema');
const EvaluationProcess = require('../models/EvaluationProcessSchema'); // Import the model
const KeyPhases = require('../models/keyphases');
const Faqs = require('../models/FaqsSchema');
const BtnVariations = require('../models/btnVariationsSchema');
const Quickcompair = require('../models/Quickcompair');
const AccountType = require('../models/AccountTypeSchema');


const all_array = [];


router.post('/register', async (req, res) => {

    const { firstName, lastName, userName, country, email, password, confirmPassword, privacyPolicy, newsletter, nameVerification } = req.body;

    if (!firstName || !lastName || !userName || !country || !email || !password || !confirmPassword) {
        return res.status(422).json({ message: "Please Fill All Field" });
    }

    const privacyPolicyValue = privacyPolicy ? 1 : 0;
    const newsletterValue = newsletter ? 1 : 0;
    const nameVerificationValue = nameVerification ? 1 : 0;

    try {

        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ message: "Already Exist" });
        } else if (password != confirmPassword) {
            return res.status(400).json({ message: "Password Not Match" });
        } else if (privacyPolicyValue === 0) {
            return res.status(400).json({ message: "Please Check The privacy Policy" });
        } else if (newsletterValue === 0) {
            return res.status(400).json({ message: "Please Check The News Letter" });
        } else if (nameVerificationValue === 0) {
            return res.status(400).json({ message: "Please Check The Verification" });
        } else {
            const user = new User({
                firstName, lastName, userName, country, email, password, confirmPassword, privacyPolicy: privacyPolicyValue,
                newsletter: newsletterValue,
                nameVerification: nameVerificationValue
            });

            const userRegister = await user.save();

            if (userRegister) {
                res.status(201).json({ message: "success" });
            }
        }
    }
    catch (err) {
        console.log(err);
    }

});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "please fill the data" });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(400).json({ message: "something went wrong" });
            } else {
                res.status(201).json({ message: "successfull", user_Data: userLogin });
            }
        } else {
            res.status(400).json({ message: "something went wrong" });
        }



    } catch (err) {
        console.log(err)
    }
});

router.get('/evaluationprocess', async (req, res) => {
    try {
        const evaluationProcesses = await EvaluationProcess.find();
        all_array.length = 0;
        all_array.push({
            status: "success",
            evaluation_data: evaluationProcesses
        });
        res.status(200).json(all_array); // Send the fetched data as JSON
    } catch (err) {
        res.status(500).json({ message: "Server error" }); // Handle errors
    }
});


router.get('/keyhighlights', async (req, res) => {
    try {

        const keyHighlights = await BtnVariations.find();
        const keyPhases = await KeyPhases.find();
        const mergedData = keyHighlights.map(highlight => {

            const phasesForHighlight = keyPhases
                .filter(phase => phase.title === highlight.title)
                .map(phase => ({
                    phase_title: phase.phase_title,
                    phase_data: phase.phase_data,
                    _id: phase._id
                }));


            return {
                ...highlight._doc,
                phases: phasesForHighlight
            };
        });
        all_array.length = 0;
        all_array.push({
            status: "success",
            keyHighlights_data: mergedData
        });
        res.status(200).json(all_array);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});



router.get('/faqs', async (req, res) => {
    try {
        const faqs = await Faqs.find();
        all_array.length = 0;
        all_array.push({
            status: "success",
            faqs_data: faqs
        });
        res.status(200).json(all_array); // Send the fetched data as JSON
    } catch (err) {
        res.status(500).json({ message: "Server error" }); // Handle errors
    }
});


router.post('/quick_compair', async (req, res) => {
    try {
        const { challenge_status } = req.body;

        // Fetch all account types
        const Account_Types = (await AccountType.find()).map(title => ({
            id: title.account_type_id,
            title: title.title,
        }));

        // Fetch quick comparison data based on challenge status
        const quickCompair = await Quickcompair.find({ challenge_status}).select('-challenge_status'); ;

        if (quickCompair.length !== 0) {

            all_array.length = 0;
            all_array.push({
                status: "success",
                title_challenge: challenge_status,
                account_type: Account_Types,
                quickCompair_Data: quickCompair
            });

            res.status(200).json(all_array);
        } else {
            res.status(400).json({ message: "Something went wrong" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});




module.exports = router;