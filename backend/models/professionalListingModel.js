const mongoose = require ('mongoose')

const professionalListSchema = new mongoose.Schema({
  username: { type: String, required: true },
  service: { type: String, required: true },
  description: { type: String, required: false },
  contactInfo: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Regex for email OR phone number
        return (
          /^(?:\+?\d{1,3}[-.●]?)?(?:\(?\d{1,4}?\)?[-.●]?)?\d{1,4}[-.●]?\d{1,9}(?: x\d{1,5})?$/.test(
            v
          ) || /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/.test(v)
        ); // Phone or email regex
      },
      message: (props) => `${props.value} is not a valid contact info!`,
    },
  },
  date: { type: Date, default: Date.now }
});

const ProfessionalList = mongoose.model(
  "ProfessionalList",
  professionalListSchema
);
module.exports = ProfessionalList;
