import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({ line1: '', city: '', country: '', zip: '' });
  const [contactMethods, setContactMethods] = useState([{ contact_method: '', value: '' }]);
  const navigate = useNavigate();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
  };

  const handleContactMethodChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContactMethods = [...contactMethods];
    updatedContactMethods[index][name] = value;
    setContactMethods(updatedContactMethods);
  };

  const addContactMethod = () => {
    setContactMethods([...contactMethods, { contact_method: '', value: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      address: `${address.line1}, ${address.city}, ${address.country}, ${address.zip}`,
      contacts: contactMethods.map(method => `${method.contact_method}: ${method.value}`).join(', ')
    };

    const myHeaders = new Headers();
    myHeaders.append("environmentId", "66aa422c8a5479d9d20fd27d");
    myHeaders.append("projectId", "66aa422c8a5479d9d20fd27c");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestBody),
      redirect: "follow"
    };

    try {
      const response = await fetch("https://free-ap-south-1.cosmocloud.io/development/api/user", requestOptions);
      const result = await response.text();
      console.log(result);
      console.log(requestOptions)
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-employee-container">
      <h1 className="title">Add Employee</h1>
      <form onSubmit={handleSubmit} className="add-employee-form">
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <fieldset>
          <legend>Address</legend>
          <label>
            Line 1:
            <input type="text" name="line1" value={address.line1} onChange={handleAddressChange} required />
          </label>
          <label>
            City:
            <input type="text" name="city" value={address.city} onChange={handleAddressChange} required />
          </label>
          <label>
            Country:
            <input type="text" name="country" value={address.country} onChange={handleAddressChange} required />
          </label>
          <label>
            Zip Code:
            <input type="text" name="zip" value={address.zip} onChange={handleAddressChange} required />
          </label>
        </fieldset>

        <fieldset>
          <legend>Contact Methods</legend>
          {contactMethods.map((contact, index) => (
            <div key={index} className="contact-method">
              <label>
                Contact Method:
                <select name="contact_method" value={contact.contact_method} onChange={(e) => handleContactMethodChange(index, e)}>
                  <option value="">Select</option>
                  <option value="EMAIL">Email</option>
                  <option value="PHONE">Phone</option>
                </select>
              </label>
              <label>
                Value:
                <input type="text" name="value" value={contact.value} onChange={(e) => handleContactMethodChange(index, e)} />
              </label>
              {contactMethods.length > 1 && (
                <button type="button" onClick={() => setContactMethods(contactMethods.filter((_, i) => i !== index))}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addContactMethod}>Add Contact Method</button>
        </fieldset>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddEmployee;
