import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from "../component/adbk-logo.png";
import { useState } from 'react';
import cancelLogo from "../component/cancellogo.png"
import "./form.css";
import addressBookService from '../service/AddressBook';
function PersonAddressForm(){
  let initialValue={
    name:"",
    phoneNumber:"",
    email:"",
    address:[],
    city:"",
    state:" ",
    pin:"",
    isUpdate:false,
  }
  const[formData,setFormData]=useState(initialValue);
  const params = useParams();

  useEffect(() => {
    console.log("UseEffect");
      if (params.id) {
        console.log("Inside if ");
          getDataById(params.id);
      }
  }, [params.id]);

  const getDataById =(id) =>{
    addressBookService.getContactById(id)
    .then((response)=>{
      let object = response.data.data;
      setData(object);
    })
    .catch((err)=>{
      alert("err is ",err)
    })
  }
  

  const setData = (obj) =>{
    let array =obj.name;
    console.log(array);
    console.log(obj);

  setFormData({
    ...formData,
    ...obj,
    id: obj.id,
    email:obj.email,
    phoneNumber:obj.phoneNumber,
    name:obj.name,
    address:obj.address,
    isUpdate:true,
    city:obj.city,
    state:obj.state,
    pinCode:obj.pinCode,
  })
  }

  
  const handleChange =(event) => {
    console.log(event.target.name);
    setFormData({...formData,[event.target.name]:event.target.value});

  };
 
  const handleCityChange = (event) => {
    const cityValue = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      city: cityValue,
    }));
    console.log('City changed:', cityValue);

  };
  
  const handleStateChange = (event) => {
    const stateValue = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      state: stateValue,
    }));
    console.log('State changed:', stateValue);

  };
  const handleAddressChange = (event) => {
    const addresses = event.target.value.split(', '); // Split the input by commas
    setFormData({ ...formData, address: addresses });
  };
  const save = async(event) => {
    event.preventDefault();
    console.log(formData)

    let object ={
      name:formData.name,     
      phoneNumber:formData.phoneNumber,
      email:formData.email,     
      address:formData.address,
      city:formData.city,
      state:formData.state,
      pinCode:formData.pin,
      
    };
    if (formData.isUpdate) {
      var answer = window.confirm(
        "Data once modified can not be restored, do you want to continue?"
      );
      if (answer === true) {
        addressBookService.updateContact(params.id, object)
          .then((response) => {
            console.log(response.data.data);
            alert("Data updated successfully");
          })
          .catch((error) => {
            alert("Warning: error while updating the data ", error);
          });
      } else {
        window.location.reload();
      }
    } else {
  addressBookService.addContact(object)
  .then((response) => {
    console.log(response.data.data);
    alert("Contact added successfully");
  })
  .catch((error) => {
    console.log(error);
    alert("Warning");
  });

  }
}

  const handleReset = () => {
    setFormData({
      name: '',
      phoneNumber: '',
      address: [],
      city: '',
      state: '',
      pin: '',
      email:"",
    });
  };

  return (
    <div>
   <header className="header-content header">
      <div className="logo-content">
        <img src={logo} alt="" width="43px" height="43px" />
        <div>
          <span className="adbk-text">Address</span>
          <br />
          <span className="adbk-text adbk-book">Book</span>
        </div>
      </div>
    </header>
    <div className="form-content">
    <form className="form">
      <div className="form-head-content">
        <div className="form-head">Person Address Form</div>
       <Link to={"/formdata"}>
          <img
            src={cancelLogo}
            alt=""
            width="39px"
            height="39px"
          />
          </Link>

      </div>

      <div className="row-content">
        <label htmlFor="name" className="label text" style={{ marginTop: '20px' }}>
          Full Name
        </label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          rows="1"
          cols="25"
        />
        <error-output className="name-error" for="name"></error-output>
      </div>
      <div className="row-content">
  <label className="label text" htmlFor="email">
    Email
  </label>
  <input
    className="input"
    type="email"
    id="email"
    name="email"
    placeholder="your email.."
    required
    onChange={handleChange}
    value={formData.email}
  />
  <error-output className="text-error" htmlFor="email"></error-output>
</div>

<div className="row-content">
    <label className="label text"style={{ marginBottom: '10px' }} htmlFor="address">Address </label>
    <input
      className="input"
      type="text"
      id="address"
      name="address"
      placeholder="Enter addresses separated by commas"
      required
      onChange={handleAddressChange}
      value={formData.address.join(', ')}
    />
    <error-output className="text-error" htmlFor="address"></error-output>
  </div>

      <div className="row-content">
        <div className="row-content-one">
        <div className="row-content-two">
            <label htmlFor="city" className="label text">
              City
            </label>
            <br />
            <select
  id="city"
  name="city"
  value={formData.city}
  onChange={handleCityChange}
>
              <option value="" selected disabled hidden>Select City</option>
                            <option value="Allahabad">Allahabad</option>
                            <option value="Amritsar">Amritsar</option>
                            <option value="Bhubneswar">Bhubneswar</option>
                            <option value="Cuttack">Cuttack</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Bhopal">Bhopal</option>
                            <option value="Patna">Patna</option>
                            <option value="Ranchi">Ranchi</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Vaishali">Vaishali</option>
                            <option value="Ramgarh">Ramgarh</option>
                            <option value="Hajipur">Hajipur</option>
            </select>
          </div>

          <div className="row-content-two">
            <label htmlFor="state" className="label text">
              State
            </label>
            <br />
            <select
  id="state"
  name="state"
  value={formData.state}
  onChange={handleStateChange}
>
              <option value="" selected disabled hidden>Select State</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
          </div>

          <div className="row-content-two">
            <label className="label text" htmlFor="zip" style={{ marginBottom: '7px' }}>
              ZIP
            </label>
            <input className="input" type="text" name="pin" id="pin" 
              value={formData.pin}
          onChange={handleChange}
            required />
            <error-output className="zip-error" for="pin"></error-output>
          </div>
        </div>
      </div>

      <div className="row-content">
        <label htmlFor="phoneNumber" className="label text">
          Phone Number
        </label>
        <br />
        <input className="input" type="tel" id="phoneNumber" name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange} />
        <error-output className="phoneNumber-error" for="phoneNumber"></error-output>
      </div>

      <div className="row-content">
        <div className="add-reset-button">
        <Link to='/formdata'>
        <button type='Add'
            onClick={save} id="add-btn" className="button"value="Add" >{
              formData.isUpdate ? "Update" : "Add"
            }</button></Link>
          <button type="reset" onClick={handleReset} className="button reset-Button">
            Reset
          </button>
        </div>
      </div>
    </form>
  </div>
  </div>
   
  );
}
export default PersonAddressForm;
