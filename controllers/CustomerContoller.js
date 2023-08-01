

const { default: mongoose } = require('mongoose');
const CustomerReg = require('../models/CustomerReg')
const fs = require('fs');
const { doesNotMatch } = require('assert');
const ObjectId = require('mongoose').Types.ObjectId;
function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}


// upload a image









// GET /CustomerReg - Get all CustomerReg entries
exports.getAllCustomerRegEntries = async (req, res) => {
    try {
        const entries = await CustomerReg.find();
        res.status(200).json({
            succes: true, count: entries.length, message: "Succesfull", data: entries
        })

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};









// latest one which we comment

// exports.createCustomerRegEntry = async (req, res) => {

//     try {

//         let item = req.body
//         if (req.files && req.files.file && req.files.file.length > 0) {
//             item = { ...item, ['file']: req.files.file[0].path }
//         }

//         const newCustomer = new CustomerReg(item)
//         const savedCustomer = await newCustomer.save()



//         res.status(200).json({ success: true, message: 'Successfully created', data: savedCustomer })
//     } catch (err) {
//         if (err.code === 11000) {
//             res.status(400).json({ success: false, message: 'URL already exists' })
//         } else {
//             res.status(500).json({ success: false, message: 'Failed to create. Please try again later.' })
//             console.log(err)
//         }
//     }
// }


exports.createCustomerRegEntry = async (req, res) => {

    try {

        let item = req.body
        if (req.files && req.files.file && req.files.file.length > 0) {
            item = { ...item, ['file']: req.files.file[0].path }
        }
        // if (req.files && req.files.aadharCardImage && req.files.aadharCardImage.length > 0) {
        //     item = { ...item, ['aadharCardImage']: req.files.aadharCardImage[0].path};
        // }
    
        // Check if ID Card Images were uploaded
        if (req.files && req.files.idCardImage && req.files.idCardImage.length > 0) {
            item = { ...item, ['idCardImage']: req.files.idCardImage[0].path };
        }

        const newCustomer = new CustomerReg(item)
        const savedCustomer = await newCustomer.save()



        res.status(200).json({ success: true, message: 'Successfully created', data: savedCustomer })
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ success: false, message: 'URL already exists' })
        } else {
            res.status(500).json({ success: false, message: 'Failed to create. Please try again later.' })
            console.log(err)
        }
    }
}


// exports.createCustomerRegEntry = async (req, res) => {
//     try {
//         let item = req.body;

//         // Check if payment details are provided
//         if (item.customerPayment && Array.isArray(item.customerPayment)) {
//             // Validate and clean up the payment details array
//             item.customerPayment = item.customerPayment.map((payment) => {
//                 return {
//                     customerBill: payment.customerBill || '0',
//                     amountReceived: payment.amountReceived || '0'
//                 };
//             });
//         }

//         if (req.files && req.files.file && req.files.file.length > 0) {
//             item = { ...item, file: req.files.file[0].path };
//         }

//         const newCustomer = new CustomerReg(item);
//         const savedCustomer = await newCustomer.save();

//         res.status(200).json({ success: true, message: 'Successfully created', data: savedCustomer });
//     } catch (err) {
//         if (err.code === 11000) {
//             res.status(400).json({ success: false, message: 'URL already exists' });
//         } else {
//             res.status(500).json({ success: false, message: 'Failed to create. Please try again later.' });
//             console.log(err);
//         }
//     }
// };








// GET /CustomerReg/:id - Get an CustomerReg entry by ID
exports.getCustomerRegEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id)
        // let entry
        if (isValidObjectId(id)) {
            entry = await CustomerReg.findOne({ _id: id });

        } else {
            entry = await CustomerReg.findOne({ customerCode: id });
        }

        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        // res.status(200).json(entry);
        res.status(200).json({ succes: true, count: entry.length, message: "Success", data: entry });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};



// exports.getCustomerRegEntry = async (req, res) => {
//     try {
//         const { name, code } = req.params;
//         let query = {};


//         if (name) {
//             query.name = name;
//         }
//         if (code) {
//             query.code = code;
//         }

//         const entry = await CustomerReg.findOne(query);

//         if (!entry) {
//             return res.status(404).json({ error: 'Entry not found' });
//         }

//         res.status(200).json({ success: true, data: entry });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };





// exports.updateCustomerRegEntryBy = async (req, res) => {
//     const id = req.params.id
//     try {
//         const updatedEntry = await CustomerReg.findByIdAndUpdate(id, {
//             $set: req.body
//         }, { new: true })
//         if (!updatedEntry) {
//             return res.status(404).json({ error: 'Entry not found' });
//         }

//         res.status(200).json({ succes: true, message: 'Successfully Update', data: updatedEntry })
//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Failed to update' })
//     }
// }





// exports.updateCustomerRegEntryById = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const updatedEntry = await CustomerReg.findByIdAndUpdate(
//             id,
//             {
//                 $set: req.body,
//                 $push: {
//                     customerpayment: {
//                         customerbill: req.body.customerbill,
//                         amount_received: req.body.amount_received,
//                         month: req.body.month,
//                         paymentstatus: req.body.paymentstatus,
//                         balance: req.body.balance,
//                         currentdate: req.body.currentdate
//                     },
//                 },
//             },
//             { new: true }
//         );

//         if (!updatedEntry) {
//             return res.status(404).json({ error: 'Entry not found' });
//         }

//         res.status(200).json({ success: true, message: 'Successfully updated', data: updatedEntry });
//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Failed to update' });
//     }
// }



exports.updateCustomerRegEntryById = async (req, res) => {
    const id = req.params.id;
    const updateData = { $set: req.body };

    if (req.body.paymentPendingAmount ||  req.body.paymentBalance || req.body.paymentstatus || req.body.paymentLeaveTaken || req.body.paymentWorkingDays || req.body.paymentAmountReceived ||  req.body.paymentAyaPurpose||req.body.paymentAyaAssigned || req.body.paymentBill || req.body.paymentToDate || req.body.paymentFromDate || req.body.paymentRate) {
        updateData.$push = {
            customerPaymentDetails: {
                paymentBill: req.body.paymentBill,
                paymentAmountReceived: req.body.paymentAmountReceived,
                paymentFromDate: req.body.paymentFromDate,
                paymentToDate: req.body.paymentToDate,
                paymentAyaAssigned: req.body.paymentAyaAssigned,
                paymentRate: req.body.paymentRate,
                paymentAyaPurpose: req.body.paymentAyaPurpose,
                paymentLeaveTaken: req.body.paymentLeaveTaken,
                paymentWorkingDays: req.body.paymentWorkingDays,
                paymentstatus: req.body.paymentstatus,
                paymentBalance : req.body.paymentBalance,
                paymentPendingAmount : req.body.paymentPendingAmount,

            },
        };
    }
    
    
    else if (req.body.generatedDate || req.body.generatedPaymentMode || req.body.generatedTransactionId ||req.body.generatedUpi ||req.body.generatedTransactionDate || req.body.generatedLeaveTaken || req.body.generatedWorkingDays || req.body.generatedAmountReceived || req.body.generatedAyaPurpose || req.body.generatedBill || req.body.generatedTime || req.body.generatedToDate || req.body.generatedFromDate || req.body.generatedRate || req.body.generatedCustomerId) {
        updateData.$push = {
            customerGeneratedInvoice: {
                generatedCustomerId : req.body.generatedCustomerId, 
                generatedTime : req.body.generatedTime,
                generatedBill: req.body.generatedBill,
                generatedToDate : req.body.generatedToDate,
                generatedFromDate : req.body.generatedFromDate,
                generatedRate : req.body.generatedRate,
                generatedAyaAssigned : req.body.generatedAyaAssigned,
                generatedAyaPurpose : req.body.generatedAyaPurpose,
                generatedAmountReceived : req.body.generatedAmountReceived,
                generatedWorkingDays : req.body.generatedWorkingDays,
                generatedLeaveTaken : req.body.generatedLeaveTaken,
                generatedDate : req.body.generatedDate,
                generatedPaymentMode : req.body.generatedPaymentMode,
                generatedTransactionId : req.body.generatedTransactionId,
                generatedUpi : req.body.generatedUpi,
                generatedTransactionDate : req.body.generatedTransactionDate,

            },
        };
    }

    else if(req.body.assignedAyaPurpose || req.body.assignedAyaShift || req.body.assignedAyaRate || req.body.assignedAyaReason ||  req.body.assignedAyaToDate || req.body.assignedAyaFromDate || req.body.assignedAyaName || req.body.assignedAyaCode){
        updateData.$push = {
        assignedAyaDetails:{
            assignedAyaCode : req.body.assignedAyaCode,
            assignedAyaName : req.body.assignedAyaName, 
            assignedAyaFromDate : req.body.assignedAyaFromDate, 
            assignedAyaToDate : req.body.assignedAyaToDate, 
            assignedAyaReason : req.body.assignedAyaReason,
            assignedAyaRate  : req.body.assignedAyaRate, 
            assignedAyaShift : req.body.assignedAyaShift, 
            assignedAyaPurpose : req.body.assignedAyaPurpose, 
        },
        }
    }
    else if( req.body.totalPendingAmount ){
        updateData.$push = {
            totalPendingAmount : req.body.totalPendingAmount
        }
    }


    try {
        const updatedEntry = await CustomerReg.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedEntry });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update' });
    }
}



// in thsese if we upadate the field then this is always  push the customerpayment do in thse if we update the field don't push customerpayment otherwise they push the data









// DELETE /CustomerReg/:id - Delete an CustomerReg entry by ID
exports.deleteCustomerRegEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEntry = await CustomerReg.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        // res.status(204).end();
        res.status(200).json({ success: true, message: 'Successfully deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};














// we enter this data using thies api http://localhost:8109/customerreg/6468a9ecc6c5644810f8c860




