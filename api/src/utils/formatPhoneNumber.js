// remove all characters besides numbers, add US/CA area code if needed
// will need to change with app internationalization
export default function formatPhoneNumber(phoneNumber) {
    let formattedPhoneNumber;
    formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (formattedPhoneNumber.length === 10) {
      formattedPhoneNumber = `1${formattedPhoneNumber}`;
    }
    return formattedPhoneNumber.toString();
  }
  