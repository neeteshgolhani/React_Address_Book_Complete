import './PersonDetailsForm.css';
import { Link } from 'react-router-dom';
import logo from "../component/adbk-logo.png";
import pluslogo from "../plus_symbol.svg"
import editIcon from "../edit.svg"
import deleteIcon from "../delete.svg"
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import addressBookService from '../service/AddressBook';
function PersonDetailsForm() {
  const navigate = useNavigate();
  const [contactArray, setContactArray] = useState([]);
  const [allContactArray, setAllContactArray] = useState([]);

  const update = (id) => {
    console.log('Update method calling', id);
    navigate(`editform/${id}`);
  };

  useEffect(() => {
    console.log('Life cycle method');
    getAllContact();
  }, []);
  const getAllContact = () => {
    addressBookService.getAllContact()
      .then((response) => {
        console.log(response);
        setContactArray(response.data.data);
        setAllContactArray(response.data.data);
        console.log(response);
      })
      .catch((err) => {
        alert('Something went wrong while getting record ', err);
      });
  };

  const remove = (id) => {
    console.log(id);
    var answer = window.confirm(
      'If Data is deleted, you cannot restore. Do you want to continue?'
    );
    if (answer === true) {
      addressBookService.deleteContact(id)
        .then((response) => {
          alert('Contact deleted successfully', response.data.data);
          window.location.reload();
          getAllContact();
        })
        .catch((error) => {
          alert('Something went wrong');
        });
    } else {
      alert('Contact not deleted');
    }
  };


  return(
  
        <div>
          <header className="header-content header">
            <div className="logo-content">
              <img src={logo} alt="" width="44px" height="44px" />
              <div>
                <span className="adbk-text">ADDRESS</span><br />
                <span className="adbk-text adbk-text-2">BOOK</span>
              </div>
            </div>
          </header>
          <div className="main-content">
            <div className="header-content">
              <div className="adbk-text-3">Person Details</div>
              <Link to={"/fillform"} className="add-button">
                <img src={pluslogo} alt="" />Add Person
              </Link>
            </div>
            <div className="table-main">
              <table id="table-display" className="table">
              <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contactArray &&
              contactArray.map((contact, index) => (
                <tr key={`${index}`}>
                  <td>{contact.name}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.email}</td>
                  <td>{contact.address}</td>
                  <td>{contact.city}</td>
                  <td>{contact.state}</td>
                  <td>{contact.pin}</td>
                  <td>
                    <img
                      onClick={() => remove(contact.id)}
                      src={deleteIcon}
                      alt="delete"
                    />
                    <img
                      onClick={() => update(contact.id)}
                      src={editIcon}
                      alt="edit"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
              </table>
            </div>
          </div>
        </div>
      );
      
}
export default PersonDetailsForm;
